<?php

use App\Http\Controllers\Admin\MediaController;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Landing\BlogController;
use App\Http\Controllers\Landing\BookmarkController;
use App\Http\Controllers\Landing\BookshelfController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('/', function () {
    seo()
        ->title('Mekayalar.com')
        ->description('Meriç\'in ilham dolu ve sürdürülebilir blogu')
        ->twitter()
        ->twitterCreator('merchizm')
        ->locale('tr_TR')
        ->withUrl();

    return view('landing.index');
})->name('landing.index');

Route::get('/poems', [App\Http\Controllers\Landing\PoemController::class, 'index'])->name('poems.index');
Route::get('/poems/{poem}', [App\Http\Controllers\Landing\PoemController::class, 'show'])->name('poems.show');

Route::get('/bookmarks', [BookmarkController::class, 'index'])->name('bookmarks.index');

Route::get('/posts', [BlogController::class, 'index'])->name('blog.index');
Route::get('/posts/{slug}', [BlogController::class, 'show'])->name('blog.show');

Route::get('/bookshelf', [BookshelfController::class, 'index'])->name('bookshelf.index');

Route::group(['prefix' => 'admin','middleware' => ['auth', 'verified']], function () {

    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('posts', PostController::class)->names('posts');
    Route::post('/posts/draft', [PostController::class, 'saveDraft'])->name('posts.draft');

    Route::resource('poems', \App\Http\Controllers\Admin\PoemController::class)->names('admin.poems');

    Route::post('/upload', [MediaController::class , 'upload'])->name('admin.media.upload');
    Route::get('/files', [MediaController::class, 'listFiles'])->name('admin.media.files');
    Route::post('/delete', [MediaController::class ,'delete']);
    Route::post('/rename', [MediaController::class, 'rename']);
    Route::post('/create-folder', [MediaController::class ,'createFolder'])->name('admin.media.createFolder');
    Route::get('/download/{file}', [MediaController::class , 'download']);
    Route::get('/media', [MediaController::class , 'index'])->name('admin.media');
});

require __DIR__.'/auth.php';

/*
    Dynamic Routes
*/

Route::get('/applause-button.js', function () {
    // Load the stub content
    $stub = File::get(resource_path('stubs/applause-button.stub'));

    // Replace the placeholder with the dynamic value
    $content = str_replace('__DYNAMIC_VALUE__', url(''), $stub);

    // Return the content as a JavaScript file
    return response($content)
        ->header('Content-Type', 'application/javascript');
})->name('applause-button');
