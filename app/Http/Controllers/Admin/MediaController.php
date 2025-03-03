<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class MediaController extends Controller
{
    public function index()
    {
        return view('admin.files');
    }

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:20480', // 20MB max
            'parent_folder' => 'required|string',
        ]);
        
        try {
            $file = $request->file('file');
            $originalName = $file->getClientOriginalName();
            $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $parentFolder = $request->input('parent_folder', '/');
            $fileSize = $file->getSize();
            
            // Store the original file
            Storage::disk('uploads')->put($parentFolder . '/' . $fileName, $request->file->get());
            $path = storage_path('app/public/uploads/' . $parentFolder . '/' . $fileName);
            
            // Process image if it's an image file
            $isImage = in_array(strtolower($file->getClientOriginalExtension()), ['jpg', 'jpeg', 'png', 'gif', 'webp']);
            
            if ($isImage) {
                try {
                    // Create optimized version using Intervention Image if available
                    if (class_exists('Intervention\Image\Facades\Image')) {
                        $img = Image::make($path);
                        
                        // Resize large images to improve performance
                        if ($img->width() > 2000) {
                            $img->resize(2000, null, function ($constraint) {
                                $constraint->aspectRatio();
                                $constraint->upsize();
                            });
                        }
                        
                        // Save with reasonable quality
                        $img->save($path, 85);
                    } else {
                        // Fallback to GD library if Intervention Image is not available
                        $this->processImageWithGD($file, $path);
                    }
                } catch (\Exception $e) {
                    // Log error but continue - the original file is already saved
                    \Log::error('Image processing failed: ' . $e->getMessage());
                }
            }
            
            // Create media record
            Media::create([
                'name' => $fileName,
                'original_name' => $originalName,
                'path' => $path,
                'size' => $fileSize,
                'mime_type' => $file->getMimeType(),
                'type' => 'file',
                'parent_folder' => $parentFolder,
            ]);
            
            return response()->json([
                'success' => true,
                'path' => $path,
                'url' => asset('storage/uploads/' . $parentFolder . '/' . $fileName),
                'name' => $fileName,
                'original_name' => $originalName,
                'size' => $this->formatFileSize($fileSize),
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Upload failed: ' . $e->getMessage()
            ], 500);
        }
    }

    private function processImageWithGD($file, $path)
    {
        list($width, $height) = getimagesize($path);
        $divide = $this->divider($width);
        
        if ($divide !== 1) {
            $newWidth = $width / $divide;
            $newHeight = $height / $divide;
            
            $src = null;
            $extension = strtolower($file->getClientOriginalExtension());
            
            switch ($extension) {
                case 'jpg':
                case 'jpeg':
                    $src = imagecreatefromjpeg($path);
                    break;
                case 'png':
                    $src = imagecreatefrompng($path);
                    break;
                case 'gif':
                    $src = imagecreatefromgif($path);
                    break;
                case 'webp':
                    if (function_exists('imagecreatefromwebp')) {
                        $src = imagecreatefromwebp($path);
                    }
                    break;
            }
            
            if ($src) {
                $dst = imagecreatetruecolor($newWidth, $newHeight);
                
                if ($extension === 'png' || $extension === 'webp') {
                    imagealphablending($dst, false);
                    imagesavealpha($dst, true);
                }
                
                imagecopyresampled($dst, $src, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
                
                switch ($extension) {
                    case 'jpg':
                    case 'jpeg':
                        imagejpeg($dst, $path, 85); // 85% quality
                        break;
                    case 'png':
                        imagepng($dst, $path, 8); // Compression level 8 (0-9)
                        break;
                    case 'gif':
                        imagegif($dst, $path);
                        break;
                    case 'webp':
                        if (function_exists('imagewebp')) {
                            imagewebp($dst, $path, 85);
                        }
                        break;
                }
                
                imagedestroy($src);
                imagedestroy($dst);
            }
        }
    }

    private function divider($width): float|int
    {
        if ($width > 4000)
            return 3;
        else if ($width > 2000 && $width < 4000)
            return 2;
        else if ($width > 1600 && $width < 2000)
            return 1.5;
        else
            return 1;
    }

    public function listFiles(Request $request)
    {
        $folder = $request->input('folder', '/');
        
        // Get both files and folders from the database where the parent folder matches the current folder
        $items = Media::where('parent_folder', $folder)->get();
        
        $foldersList = [];
        $filesList = [];
        
        foreach ($items as $item) {
            if ($item->type === 'folder') {
                $foldersList[] = [
                    'name' => $item->name,
                    'type' => 'Folder',
                    'creation_time' => $item->created_at->format('Y-m-d H:i:s'),
                    'id' => $item->id,
                ];
            } else {
                $extension = pathinfo($item->name, PATHINFO_EXTENSION);
                $isImage = in_array(strtolower($extension), ['jpg', 'jpeg', 'png', 'gif', 'webp']);
                $isDocument = in_array(strtolower($extension), ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt']);
                $isVideo = in_array(strtolower($extension), ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm']);
                $isAudio = in_array(strtolower($extension), ['mp3', 'wav', 'ogg', 'flac']);
                
                $fileType = 'Other';
                if ($isImage) $fileType = 'Image';
                elseif ($isDocument) $fileType = 'Document';
                elseif ($isVideo) $fileType = 'Video';
                elseif ($isAudio) $fileType = 'Audio';
                
                $filesList[] = [
                    'id' => $item->id,
                    'name' => $item->name,
                    'original_name' => $item->original_name ?? $item->name,
                    'type' => $fileType,
                    'extension' => $extension,
                    'size' => $item->size ? $this->formatFileSize($item->size) : 'Unknown',
                    'creation_time' => $item->created_at->format('Y-m-d H:i:s'),
                    'thumbnail' => $isImage ? $item->url : null,
                    'url' => $item->url,
                    'mime_type' => $item->mime_type ?? 'application/octet-stream',
                ];
            }
        }
        
        // Sort folders and files alphabetically
        usort($foldersList, function($a, $b) {
            return strcasecmp($a['name'], $b['name']);
        });
        
        usort($filesList, function($a, $b) {
            return strcasecmp($a['name'], $b['name']);
        });
        
        return response()->json([
            'folders' => $foldersList,
            'files' => $filesList,
            'path' => $folder,
            'parent_path' => $this->getParentPath($folder),
        ]);
    }
    
    private function getParentPath($path)
    {
        if ($path === '/' || $path === '') {
            return '/';
        }
        
        $parts = explode('/', trim($path, '/'));
        array_pop($parts);
        
        return '/' . implode('/', $parts);
    }
    
    private function formatFileSize($bytes)
    {
        if ($bytes >= 1073741824) {
            return number_format($bytes / 1073741824, 2) . ' GB';
        } elseif ($bytes >= 1048576) {
            return number_format($bytes / 1048576, 2) . ' MB';
        } elseif ($bytes >= 1024) {
            return number_format($bytes / 1024, 2) . ' KB';
        } else {
            return $bytes . ' bytes';
        }
    }

    public function delete(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|string',
                'parent_folder' => 'required|string',
            ]);
            
            $file = $request->input('file');
            $parent_folder = $request->input('parent_folder');
            
            // Delete from storage
            Storage::disk('uploads')->delete($parent_folder . '/' . $file);
            
            // Delete from database
            Media::where('name', $file)
                ->where('parent_folder', $parent_folder)
                ->delete();
                
            return response()->json([
                'success' => true,
                'message' => 'File deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Delete failed: ' . $e->getMessage()
            ], 500);
        }
    }
    
    public function rename(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|string',
                'new_name' => 'required|string',
                'parent_folder' => 'required|string',
            ]);
            
            $file = $request->input('file');
            $newName = $request->input('new_name');
            $parentFolder = $request->input('parent_folder');
            
            // Get the file extension
            $extension = pathinfo($file, PATHINFO_EXTENSION);
            
            // Ensure the new name has the same extension
            if (!Str::endsWith($newName, '.' . $extension)) {
                $newName .= '.' . $extension;
            }
            
            // Get the media item
            $media = Media::where('name', $file)
                ->where('parent_folder', $parentFolder)
                ->first();
                
            if (!$media) {
                return response()->json([
                    'success' => false,
                    'message' => 'File not found'
                ], 404);
            }
            
            // Rename in storage
            Storage::disk('uploads')->move(
                $parentFolder . '/' . $file,
                $parentFolder . '/' . $newName
            );
            
            // Update in database
            $media->name = $newName;
            $media->original_name = $newName;
            $media->save();
            
            return response()->json([
                'success' => true,
                'message' => 'File renamed successfully',
                'new_name' => $newName
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Rename failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function createFolder(Request $request)
    {
        try {
            $request->validate([
                'folderName' => 'required|string',
                'parent_folder' => 'required|string',
            ]);
            
            $folderName = $request->input('folderName');
            $parentFolder = $request->input('parent_folder', '/');
            
            // Ensure folder is stored in both filesystem and database
            Storage::disk('uploads')->makeDirectory($parentFolder . '/' . $folderName);
            
            Media::create([
                'name' => $folderName,
                'path' => $parentFolder . '/' . $folderName,
                'type' => 'folder',
                'parent_folder' => $parentFolder,
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'Folder created successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Create folder failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function download($file)
    {
        try {
            $media = Media::where('name', $file)->first();
            
            if (!$media) {
                abort(404, 'File not found');
            }
            
            $path = $media->parent_folder . '/' . $media->name;
            $originalName = $media->original_name ?? $media->name;
            
            return Storage::disk('uploads')->download($path, $originalName);
        } catch (\Exception $e) {
            abort(500, 'Download failed: ' . $e->getMessage());
        }
    }
}
