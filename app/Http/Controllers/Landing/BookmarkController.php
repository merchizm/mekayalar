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
        $bookmarks = Cache::remember('raindrop_bookmarks', now()->addDay(), function () {
            return $this->bookmarkService->getBookmarksGroupByDay();
        });

        seo()
            ->title('Mekayalar.com — Yer İmleri')
            ->description(
                'Size ve bana yararı olabileceğini düşündüğüm, bugün ve sonrası için kaydettiğim yararlı bağlantılar.',
            )
            ->twitter()
            ->twitterCreator('merchizm')
            ->locale('tr_TR')
            ->withUrl();

        return Inertia::render('Landing/Bookmarks/Index', [
            'bookmarks' => $bookmarks,
        ]);
    }
}
