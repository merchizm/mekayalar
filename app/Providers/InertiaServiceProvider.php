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
            if (session()->has('locale')) {
                session()->get('locale');
                App::setLocale(session()->get('locale'));
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
