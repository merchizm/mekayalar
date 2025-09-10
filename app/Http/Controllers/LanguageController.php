<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class LanguageController extends Controller
{
    public function switch(Request $request): RedirectResponse
    {
        $locale = $request->input('locale');
        $supported = ['en', 'tr'];
        if (!in_array($locale, $supported)) {
            $locale = 'en';
        }

        Session::put('locale', $locale);
        App::setLocale($locale);

        return back()->withCookie(cookie('locale', $locale, 60 * 24 * 365));
    }
}
