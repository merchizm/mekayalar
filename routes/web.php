<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\PoemController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Landing\BlogController;
use App\Http\Controllers\Landing\BookmarkController;
use App\Http\Controllers\Landing\BookshelfController;
use App\Http\Controllers\Landing\PoemController as LandingPoemController;
use App\Http\Controllers\Landing\ProjectController as LandingProjectController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

    return Inertia::render('Landing/Index');
})->name('landing.index');

Route::get('/incognito', function () {
    return view('landing.incognito');
})->name('incognito');

Route::get('/poems', [LandingPoemController::class, 'index'])->name('poems.index');
Route::get('/poems/{poem}', [LandingPoemController::class, 'show'])->name('poems.show');

Route::get('/bookmarks', [BookmarkController::class, 'index'])->name('bookmarks.index');

Route::get('/posts', [BlogController::class, 'index'])->name('blog.index');
Route::get('/posts/{slug}', [BlogController::class, 'show'])->name('blog.show');
Route::get('/category/{slug}', [BlogController::class, 'category'])->name('blog.category');
Route::get('/type/{type}', [BlogController::class, 'type'])->name('blog.type');
Route::get('/search', [BlogController::class, 'search'])->name('blog.search');

Route::get('/bookshelf', [BookshelfController::class, 'index'])->name('bookshelf.index');

Route::get('/projects', [LandingProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{project}', [LandingProjectController::class, 'show'])->name('projects.show');
Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('admin')->name('admin.')->group(function (): void {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::get('/posts/check_slug', [PostController::class, 'check_slug'])->name('posts.check_slug');
        Route::resource('posts', PostController::class)->except(['show']);
        Route::post('/posts/draft', [PostController::class, 'saveDraft'])->name('posts.draft');

        Route::get('/profile', [AdminProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [AdminProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [AdminProfileController::class, 'destroy'])->name('profile.destroy');

        Route::resource('poems', PoemController::class)->names('poems');

        Route::resource('projects', AdminProjectController::class)->names('projects');

        Route::post('/upload', [MediaController::class, 'upload'])->name('media.upload');
        Route::get('/files', [MediaController::class, 'listFiles'])->name('media.files');
        Route::post('/delete', [MediaController::class, 'delete'])->name('media.delete');
        Route::post('/rename', [MediaController::class, 'rename'])->name('media.rename');
        Route::post('/create-folder', [MediaController::class, 'createFolder'])->name('media.createFolder');
        Route::get('/download/{file}', [MediaController::class, 'download'])->name('media.download');
        Route::get('/media', [MediaController::class, 'index'])->name('media.index');
    });
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
