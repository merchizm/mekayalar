<?php

namespace App\Providers;

use Illuminate\Support\Facades\App;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class InertiaServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $supported = ['en', 'tr'];

        if (session()->has('locale')) {
            $locale = session()->get('locale');
            if (in_array($locale, $supported)) {
                App::setLocale($locale);
            }
        } elseif (request()->hasCookie('locale')) {
            $locale = request()->cookie('locale');
            if (in_array($locale, $supported)) {
                session()->put('locale', $locale);
                App::setLocale($locale);
            }
        } else {
            $preferred = request()->getPreferredLanguage($supported) ?: 'en';
            $locale    = in_array($preferred, $supported) ? $preferred : 'en';
            session()->put('locale', $locale);
            App::setLocale($locale);
        }

        $data = [];

        $data['locale'] = function () {
            return app()->getLocale();
        };

        $data['localeLanguage'] = function () {
            $file = resource_path('lang/'.app()->getLocale().'.json');
            if (!file_exists($file)) {
                return [];
            }

            return json_decode(file_get_contents($file), true);
        };

        Inertia::share($data);
    }
}
