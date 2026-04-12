<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GuestbookEntry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GuestbookEntryController extends Controller
{
    public function index(Request $request): Response
    {
        $query = GuestbookEntry::query()
            ->withCount(['reactions', 'replies'])
            ->latest();

        if ($request->filled('status')) {
            $query->where('approved', $request->string('status')->value() === 'approved');
        }

        if ($request->filled('search')) {
            $term = trim((string) $request->input('search'));
            $query->where(function ($builder) use ($term): void {
                $builder->where('name', 'like', "%{$term}%")->orWhere('message', 'like', "%{$term}%");
            });
        }

        $entries = $query
            ->paginate(15)
            ->withQueryString()
            ->through(function (GuestbookEntry $entry): array {
                return [
                    'id'              => $entry->id,
                    'name'            => $entry->name,
                    'message'         => $entry->message,
                    'approved'        => (bool) $entry->approved,
                    'created_at'      => optional($entry->created_at)->toIso8601String(),
                    'location'        => trim(implode(', ', array_filter([$entry->city, $entry->country]))),
                    'reactions_count' => $entry->reactions_count,
                    'replies_count'   => $entry->replies_count,
                ];
            });

        return Inertia::render('Admin/Guestbook/Index', [
            'entries' => $entries,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function update(Request $request, GuestbookEntry $guestbook): RedirectResponse
    {
        $validated = $request->validate([
            'approved' => ['required', 'boolean'],
        ]);

        $guestbook->approved = $validated['approved'];
        $guestbook->save();

        return back()->with('success', 'Ziyaretçi defteri kaydı güncellendi.');
    }

    public function destroy(GuestbookEntry $guestbook): RedirectResponse
    {
        $guestbook->delete();

        return back()->with('success', 'Ziyaretçi defteri kaydı silindi.');
    }
}
