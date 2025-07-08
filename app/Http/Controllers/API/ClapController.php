<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClapRequest;
use App\Models\Clap;
use App\Models\ClapLog;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class ClapController extends Controller
{
    const MAX_CLAPS_PER_USER = 10;

    public function getClaps(ClapRequest $request): JsonResponse
    {
        $data = $request->validated();

        $data['clappable_id'] = (int) $data['id'];
        unset($data['id']);

        $clap = Clap::firstOrCreate($data, $data + ['count' => 0]);

        return response()->json($clap->count);
    }

    public function updateClaps(ClapRequest $request): Application|Response|JsonResponse|\Illuminate\Contracts\Foundation\Application|ResponseFactory
    {
        $data       = $request->validated();
        $ip_address = $request->ip();

        $data['clappable_id'] = $data['id'];
        unset($data['id']);
        $json = json_decode($request->getContent(), true);

        if (config('app.clap_version') !== $json['version']) {
            return response()->json(['message' => 'version incompatibility'], 401);
        }

        if ($json === null || $json === false) {
            return response()->json(['message' => 'invalid json'], 500);
        }

        $clap = Clap::where($data)->firstOrFail();

        // Check how many times this IP has clapped
        $log = ClapLog::firstOrCreate(['clap_id' => $clap->id, 'ip_address' => $ip_address], ['clap_id' => $clap->id, 'ip_address' => $ip_address, 'count' => 0]);

        if ($log->count >= self::MAX_CLAPS_PER_USER) {
            return response($clap->count);
        }

        $log->increment('count', $json['clapsCount']);

        $clap->increment('count', $json['clapsCount']);

        return response()->json($clap->count);
    }
}
