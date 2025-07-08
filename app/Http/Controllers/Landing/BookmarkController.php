<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Services\RaindropService;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class BookmarkController extends Controller
{
    private RaindropService $bookmarkService;

    public function __construct()
    {
        $this->bookmarkService = new RaindropService();
    }

    public function index()
    {
        /*
        * burada şimdilik geçici basit bir cache yapısı oluşturdum.
        * asıl hedef ise yeni içeriğin girilmesine bağlı yenilenen cache mekaniği
        */
        if (Cache::has('raindrop_bookmarks')) {
            $bookmarks = Cache::get('raindrop_bookmarks');
        } else {
            $bookmarks = $this->bookmarkService->getBookmarksGroupByDay();
            Cache::put('raindrop_bookmarks', $bookmarks, '1 day');
        }

        seo()
            ->title('Mekayalar.com — Yer İmleri')
            ->description('Size ve bana yararı olabileceğini düşündüğüm, bugün ve sonrası için kaydettiğim yararlı bağlantılar.')
            ->twitter()
            ->twitterCreator('merchizm')
            ->locale('tr_TR')
            ->withUrl();

        return Inertia::render('Landing/Bookmarks/Index', [
            'bookmarks' => $bookmarks,
        ]);
    }
}
