<?php

use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Landing\BlogController;
use App\Http\Controllers\Landing\BookmarkController;
use App\Http\Controllers\Landing\BookshelfController;
use App\Http\Controllers\Landing\ProjectController as LandingProjectController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

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
        ->description('Meriç\'in ilham dolu ve sürdürülebilir websitesi')
        ->twitter()
        ->twitterCreator('merchizm')
        ->locale('tr_TR')
        ->withUrl();

    return view('landing.index');
})->name('landing.index');

Route::get('/incognito', function () {
    return view('landing.incognito');
})->name('incognito');

Route::get('/poems', [App\Http\Controllers\Landing\PoemController::class, 'index'])->name('poems.index');
Route::get('/poems/{poem}', [App\Http\Controllers\Landing\PoemController::class, 'show'])->name('poems.show');

Route::get('/bookmarks', [BookmarkController::class, 'index'])->name('bookmarks.index');

Route::get('/posts', [BlogController::class, 'index'])->name('blog.index');
Route::get('/posts/{slug}', [BlogController::class, 'show'])->name('blog.show');
Route::get('/category/{slug}', [BlogController::class, 'category'])->name('blog.category');
Route::get('/type/{type}', [BlogController::class, 'type'])->name('blog.type');
Route::get('/search', [BlogController::class, 'search'])->name('blog.search');

Route::get('/bookshelf', [BookshelfController::class, 'index'])->name('bookshelf.index');

// Projects Routes
Route::get('/projects', [LandingProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{project}', [LandingProjectController::class, 'show'])->name('projects.show');

Route::group(['prefix' => 'admin', 'middleware' => ['auth', 'verified']], function (): void {

    Route::get('/dashboard', function () {
        return view('admin.dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('posts', PostController::class)->names('posts');
    Route::post('/posts/draft', [PostController::class, 'saveDraft'])->name('posts.draft');

    Route::resource('poems', App\Http\Controllers\Admin\PoemController::class)->names('admin.poems');

    // Admin Projects Routes
    Route::resource('projects', AdminProjectController::class)->names('admin.projects');

    Route::post('/upload', [MediaController::class, 'upload'])->name('admin.media.upload');
    Route::get('/files', [MediaController::class, 'listFiles'])->name('admin.media.files');
    Route::post('/delete', [MediaController::class, 'delete']);
    Route::post('/rename', [MediaController::class, 'rename']);
    Route::post('/create-folder', [MediaController::class, 'createFolder'])->name('admin.media.createFolder');
    Route::get('/download/{file}', [MediaController::class, 'download']);
    Route::get('/media', [MediaController::class, 'index'])->name('admin.media');
});

require __DIR__.'/auth.php';

/*
    Dynamic Routes
*/

Route::get('/applause-button.js', function () {
    $stub = File::get(resource_path('stubs/applause-button.stub'));

    return response($stub, 200)
        ->header('Content-Type', 'text/javascript');
})->name('applause-button');

Route::get('sitemap.xml', [SitemapController::class, 'index'])->name('sitemap.index');
