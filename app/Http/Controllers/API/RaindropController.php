<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\RaindropService;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;

class RaindropController extends Controller
{
    private RaindropService $service;

    public function __construct()
    {
        $this->service = new RaindropService();
    }

    public function authToRain(): \Illuminate\Foundation\Application|Redirector|Application|RedirectResponse
    {
        return redirect($this->service->authorize());
    }

    public function callback(Request $request)
    {
        return $this->service->callback($request);
    }
}
