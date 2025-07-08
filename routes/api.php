<?php

use App\Http\Controllers\API\ClapController;
use App\Http\Controllers\API\RaindropController;
use App\Http\Controllers\API\SpotifyController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/get-claps', [ClapController::class, 'getClaps'])->middleware('throttle:100,1');
Route::post('/update-claps', [ClapController::class, 'updateClaps']);

/*
 * Spotify End-points
 * Let's leave the security pillars aside for now.
 */

Route::group(['as' => 'spotify.', 'prefix' => 'spotify'], function (): void {
    // authentication
    Route::get('authorize', [SpotifyController::class, 'authToSpotify']);
    Route::get('callback', [SpotifyController::class, 'callback']);

    // others
    Route::get('playing', [SpotifyController::class, 'playing']);
    Route::get('playlists', [SpotifyController::class, 'playlists']);
});

/*
 * Raindrop End-points
 */

Route::group(['as' => 'raindrop.', 'prefix' => 'raindrop'], function (): void {
    Route::get('authorize', [RaindropController::class, 'authToRain']);
    Route::get('callback', [RaindropController::class, 'callback']);
});

Route::group(['as' => 'github.', 'prefix' => 'github'], function (): void {

});
