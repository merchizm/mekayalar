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
        $data = [];

        $data['locale'] = function () {
            $supported = ['en', 'tr'];

            if (session()->has('locale')) {
                App::setLocale(session()->get('locale'));
            } elseif (request()->hasCookie('locale')) {
                $locale = request()->cookie('locale');
                if (in_array($locale, $supported)) {
                    session()->put('locale', $locale);
                    App::setLocale($locale);
                }
            } else {
                $preferred = request()->getPreferredLanguage($supported) ?: 'en';
                $locale = in_array($preferred, $supported) ? $preferred : 'en';
                session()->put('locale', $locale);
                App::setLocale($locale);
                cookie()->queue('locale', $locale, 60 * 24 * 365);
            }

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
