<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\RaindropService;
use Illuminate\Support\Facades\Cache;

class BookmarkController extends Controller
{
    private RaindropService $bookmarkService;

    public function __construct()
    {
        $this->bookmarkService = new RaindropService();
    }

    public function index()
    {
         /**
         * burada şimdilik geçici basit bir cache yapısı oluşturdum.
         * asıl hedef ise yeni içeriğin girilmesine bağlı yenilenen cache mekaniği
         */
        if(Cache::has('raindrop_bookmarks'))
            $bookmarks = Cache::get('raindrop_bookmarks');
        else{
            $bookmarks = $this->bookmarkService->getBookmarksGroupByDay();
            Cache::put('raindrop_bookmarks', $bookmarks, '1 day');
        }


        return view('landing.bookmarks.index', [
            'bookmarks' => $bookmarks
        ]);
    }
}
