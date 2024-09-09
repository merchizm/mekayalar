<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\PoemController;
use App\Http\Controllers\ProfileController;
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
    return view('landing.index');
})->name('landing.index');

Route::get('/poems', [PoemController::class, 'index'])->name('poems.index');
Route::get('/poems/{poem}', [PoemController::class, 'show'])->name('poems.show');

Route::get('/bookmarks', [BookmarkController::class, 'index'])->name('bookmarks.index');

Route::get('/posts', [BlogController::class, 'index'])->name('blog.index');
Route::get('/posts/{slug}', [BlogController::class, 'show'])->name('blog.show');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
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
