<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    public function index()
    {
        return view('admin.files');
    }

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file',
            'parent_folder' => 'required|string',
        ]);
        $file = $request->file('file');
        $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();

        $parentFolder = $request->input('parent_folder', '/');

        Storage::disk('uploads')->put($parentFolder . '/' . $fileName, $request->file->get());
        $path = storage_path('app/public/uploads/' .$parentFolder . '/' . $fileName);

        if($file->extension() === 'jpg' || $file->extension() === 'jpeg' || $file->extension() === 'png'):
            list($width, $height) = getimagesize($file);
            $divide = $this->divider($width);

            if($divide !== 1):
                $newWidth = $width / $divide;
                $newHeight = $height / $divide;

                $src = null;
                switch ($file->extension()){
                    case 'jpg':
                    case 'jpeg':
                        $src = imagecreatefromjpeg($path);
                        break;
                    case 'png':
                        $src = imagecreatefrompng($path);
                        break;
                }

                $dst = imagecreatetruecolor($newWidth, $newHeight);

                if($file->extension() === 'png'):
                    imagealphablending($dst, false);
                    imagesavealpha($dst, true);
                endif;

                imagecopyresampled($dst, $src, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

                switch ($file->extension()){
                    case 'jpg':
                    case 'jpeg':
                        imagejpeg($dst, $path);
                        break;
                    case 'png':
                        imagepng($dst, $path);
                        break;
                }
                imagedestroy($src);
                imagedestroy($dst);
            endif;
        endif;

        Media::create([
            'name' => $fileName,
            'path' => $path,
            'type' => 'file',
            'parent_folder' => $parentFolder,
        ]);

        return response()->json(['path' => $path], 201);
    }

    private function divider($width): float|int
    {
        if($width > 4000)
            return 3;
        else if($width > 2000 && $width < 4000)
            return 2;
        else if($width > 1600 && $width < 2000)
            return 0.75;
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
                ];
            } else {
                $isImage = in_array(pathinfo($item->name, PATHINFO_EXTENSION), ['jpg', 'jpeg', 'png', 'gif']);
                $filesList[] = [
                    'name' => $item->name,
                    'type' => $item->type,
                    'creation_time' => $item->created_at->format('Y-m-d H:i:s'),
                    'thumbnail' => $isImage ? $item->url : null, // URL for image thumbnail
                ];
            }
        }

        return response()->json([
            'folders' => $foldersList,
            'files' => $filesList,
            'path' => $folder,
        ]);
    }

    public function delete(Request $request)
    {
        $file = $request->input('file');
        $parent_folder = $request->input('parent_folder');
        Storage::disk('uploads')->delete($parent_folder.'/'.$file);
        return response()->json(['message' => 'File deleted successfully']);
    }

    public function createFolder(Request $request)
    {
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

        return response()->json(['message' => 'Folder created successfully']);
    }

    public function download($file)
    {
        return Storage::disk('uploads')->download($file);
    }
}
