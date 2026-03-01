<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommentSettingsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Comments/Settings', [
            'blacklist' => kvoption('commenter_blacklist', []),
            'bannedIps' => kvoption('commenter_banned_ips', []),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'blacklist'  => ['nullable', 'string'],
            'banned_ips' => ['nullable', 'string'],
        ]);

        $blacklist = $this->normalizeLines($validated['blacklist'] ?? '');
        $bannedIps = $this->normalizeLines($validated['banned_ips'] ?? '');

        kvoption([
            'commenter_blacklist'  => $blacklist,
            'commenter_banned_ips' => $bannedIps,
        ]);

        return redirect()->back()->with('success', 'Yorum ayarları kaydedildi.');
    }

    private function normalizeLines(string $value): array
    {
        $lines      = preg_split('/\R/', $value) ?: [];
        $normalized = array_values(array_filter(array_map('trim', $lines)));

        return array_values(array_unique($normalized));
    }
}
