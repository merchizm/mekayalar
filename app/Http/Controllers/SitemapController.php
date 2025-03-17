<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class SitemapController extends Controller
{
    /**
     * Serve the sitemap.xml file
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sitemapPath = public_path('sitemap.xml');
        
        if (!file_exists($sitemapPath)) {
            // Generate the sitemap if it doesn't exist
            Artisan::call('sitemap:generate');
        }
        
        return response()->file($sitemapPath, [
            'Content-Type' => 'application/xml'
        ]);
    }
}
