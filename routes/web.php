<?php

use App\Http\Controllers\Admin\BookController as AdminBookController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CommentController as AdminCommentController;
use App\Http\Controllers\Admin\CommentSettingsController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\GuestbookEntryController as AdminGuestbookEntryController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\PoemController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Landing\BlogController;
use App\Http\Controllers\Landing\BookController;
use App\Http\Controllers\Landing\BookmarkController;
use App\Http\Controllers\Landing\BookshelfController;
use App\Http\Controllers\Landing\CommentController;
use App\Http\Controllers\Landing\GuestbookController;
use App\Http\Controllers\Landing\PoemController as LandingPoemController;
use App\Http\Controllers\Landing\ProjectController as LandingProjectController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SitemapController;
use App\Models\Project;
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
    $locale = app()->getLocale();

    seo()
        ->title('Mekayalar.com')
        ->description('Meriç\'in ilham dolu ve sürdürülebilir websitesi')
        ->twitter()
        ->twitterCreator('merchizm')
        ->locale('tr_TR')
        ->withUrl();

    $featuredProjects = Project::where('is_published', true)
        ->where('is_featured', true)
        ->orderBy('completed_at', 'desc')
        ->take(2)
        ->get()
        ->filter(fn (Project $project) => $project->hasLocale($locale))
        ->map(
            fn (Project $project) => [
                'id'           => $project->id,
                'slug'         => $project->slug,
                'title'        => $project->getLocalized('title', $locale),
                'description'  => $project->getLocalized('description', $locale),
                'content'      => $project->getLocalized('content', $locale),
                'image'        => $project->image,
                'url'          => $project->url,
                'github_url'   => $project->github_url,
                'is_featured'  => $project->is_featured,
                'is_published' => $project->is_published,
                'completed_at' => $project->completed_at,
                'tags'         => $project->getLocalizedTags($locale),
                'created_at'   => $project->created_at,
                'updated_at'   => $project->updated_at,
            ],
        )
        ->values();

    return Inertia::render('Landing/Index', [
        'featuredProjects' => $featuredProjects,
    ]);
})->name('landing.index');

Route::get('/incognito', function () {
    return view('incognito');
})->name('incognito');

Route::get('/poems', [LandingPoemController::class, 'index'])->name('poems.index');
Route::get('/poems/{poem}', [LandingPoemController::class, 'show'])->name('poems.show');

Route::get('/bookmarks', [BookmarkController::class, 'index'])->name('bookmarks.index');

Route::get('/posts', [BlogController::class, 'index'])->name('blog.index');
Route::get('/posts/{slug}', [BlogController::class, 'show'])->name('blog.show');
Route::post('/posts/{post:post_slug}/comments', [CommentController::class, 'store'])->name('blog.comments.store');
Route::get('/category/{slug}', [BlogController::class, 'category'])->name('blog.category');
Route::get('/type/{type}', [BlogController::class, 'type'])->name('blog.type');
Route::get('/search', [BlogController::class, 'search'])->name('blog.search');
Route::get('/guestbook', [GuestbookController::class, 'index'])->name('guestbook.index');
Route::post('/guestbook', [GuestbookController::class, 'store'])->name('guestbook.store');
Route::post('/guestbook/{guestbookEntry}/react', [GuestbookController::class, 'react'])->name('guestbook.react');
Route::post('/guestbook/{guestbookEntry}/reply', [GuestbookController::class, 'reply'])
    ->middleware(['auth', 'verified'])
    ->name('guestbook.reply');

Route::get('/bookshelf', [BookshelfController::class, 'index'])->name('bookshelf.index');
Route::get('/books/{book}', [BookController::class, 'show'])->name('books.show');

Route::get('/projects', [LandingProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{project}', [LandingProjectController::class, 'show'])->name('projects.show');
Route::post('/language', [LanguageController::class, 'switch'])->name('language.switch');

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('admin')
        ->name('admin.')
        ->group(function (): void {
            Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

            Route::get('/posts/check_slug', [PostController::class, 'check_slug'])->name('posts.check_slug');
            Route::resource('posts', PostController::class)->except(['show']);
            Route::resource('books', AdminBookController::class)->except(['show']);
            Route::post('/posts/draft', [PostController::class, 'saveDraft'])->name('posts.draft');
            Route::get('/posts/{post}/preview', [BlogController::class, 'preview'])->name('posts.preview');
            Route::resource('categories', CategoryController::class)->only(['index', 'store', 'update', 'destroy']);

            Route::get('/profile', [AdminProfileController::class, 'edit'])->name('profile.edit');
            Route::patch('/profile', [AdminProfileController::class, 'update'])->name('profile.update');
            Route::delete('/profile', [AdminProfileController::class, 'destroy'])->name('profile.destroy');

            Route::resource('poems', PoemController::class)->names('poems');

            Route::resource('projects', AdminProjectController::class)->names('projects');
            Route::resource('comments', AdminCommentController::class)->only(['index', 'update', 'destroy']);
            Route::resource('guestbook', AdminGuestbookEntryController::class)->only(['index', 'update', 'destroy']);
            Route::get('/comments/settings', [CommentSettingsController::class, 'index'])->name('comments.settings');
            Route::post('/comments/settings', [CommentSettingsController::class, 'update'])->name(
                'comments.settings.update',
            );

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

    return response($stub, 200)->header('Content-Type', 'text/javascript');
})->name('applause-button');

Route::get('sitemap.xml', [SitemapController::class, 'index'])->name('sitemap.index');
