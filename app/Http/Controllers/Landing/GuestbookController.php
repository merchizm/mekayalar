<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\GuestbookEntry;
use App\Models\GuestbookReaction;
use App\Models\GuestbookReply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Spatie\Honeypot\Exceptions\SpamException;
use Spatie\Honeypot\Honeypot;
use Spatie\Honeypot\SpamProtection;

class GuestbookController extends Controller
{
    public function index(Request $request)
    {
        $entries = GuestbookEntry::query()
            ->with(['reactions', 'replies.user'])
            ->latest()
            ->get();

        $user    = $request->user();
        $guestIp = $request->ip();

        $payload = $entries->map(function (GuestbookEntry $entry) use ($user, $guestIp) {
            $reactionSummary = $entry->reactions
                ->groupBy('emoji')
                ->map(fn ($items) => $items->count())
                ->toArray();

            $reacted = $entry->reactions->filter(function (GuestbookReaction $reaction) use ($user, $guestIp) {
                if ($user) {
                    return $reaction->user_id === $user->getKey();
                }

                return $reaction->guest_ip === $guestIp;
            })->pluck('emoji')->values()->all();

            return [
                'id'          => $entry->getKey(),
                'name'        => $entry->name,
                'message'     => $entry->message,
                'avatar_seed' => $entry->avatar_seed,
                'location'    => [
                    'country_code' => $entry->country_code,
                    'country'      => $entry->country,
                    'region'       => $entry->region,
                    'city'         => $entry->city,
                ],
                'created_at' => optional($entry->created_at)->toIso8601String(),
                'reactions'  => $reactionSummary,
                'reacted'    => $reacted,
                'replies'    => $entry->replies
                    ->sortBy('created_at')
                    ->values()
                    ->map(function (GuestbookReply $reply) {
                        return [
                            'id'         => $reply->getKey(),
                            'message'    => $reply->message,
                            'created_at' => optional($reply->created_at)->toIso8601String(),
                            'commenter'  => [
                                'name'     => $reply->user?->name ?? 'admin',
                                'is_admin' => $reply->user !== null,
                            ],
                        ];
                    })
                    ->all(),
            ];
        });

        return Inertia::render('Landing/Guestbook/Index', [
            'entries'  => $payload,
            'honeypot' => app(Honeypot::class)->toArray(),
        ]);
    }

    public function store(Request $request)
    {
        $this->checkHoneypot($request);

        $validated = $request->validate([
            'name'    => ['required', 'string', 'max:120'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        $location = $this->lookupLocation($request->ip());
        $user     = $request->user();
        $seed     = $user ? $user->id.'-'.$user->email : Str::random(12);

        GuestbookEntry::create([
            'user_id'      => $user?->getKey(),
            'name'         => $validated['name'],
            'message'      => $validated['message'],
            'ip_address'   => $request->ip(),
            'avatar_seed'  => $seed,
            'country_code' => $location['country_code'] ?? null,
            'country'      => $location['country'] ?? null,
            'region'       => $location['region'] ?? null,
            'city'         => $location['city'] ?? null,
        ]);

        return redirect()->back();
    }

    public function react(Request $request, GuestbookEntry $entry)
    {
        $validated = $request->validate([
            'emoji' => ['required', 'string', 'max:16'],
        ]);

        $user    = $request->user();
        $guestIp = $request->ip();

        $reaction = GuestbookReaction::query()
            ->where('entry_id', $entry->getKey())
            ->where('emoji', $validated['emoji'])
            ->when($user, fn ($query) => $query->where('user_id', $user->getKey()))
            ->when(!$user, fn ($query) => $query->whereNull('user_id')->where('guest_ip', $guestIp))
            ->first();

        if ($reaction) {
            $reaction->delete();
        } else {
            GuestbookReaction::create([
                'entry_id' => $entry->getKey(),
                'user_id'  => $user?->getKey(),
                'guest_ip' => $user ? null : $guestIp,
                'emoji'    => $validated['emoji'],
            ]);
        }

        return redirect()->back();
    }

    public function reply(Request $request, GuestbookEntry $entry)
    {
        $user = $request->user();
        if (!$user) {
            abort(403);
        }

        $validated = $request->validate([
            'message' => ['required', 'string', 'max:2000'],
        ]);

        GuestbookReply::create([
            'entry_id' => $entry->getKey(),
            'user_id'  => $user->getKey(),
            'message'  => $validated['message'],
        ]);

        return redirect()->back();
    }

    private function lookupLocation(?string $ip): array
    {
        if (!$ip) {
            return [];
        }

        if (in_array($ip, ['127.0.0.1', '::1'], true)) {
            return [
                'country_code' => 'TR',
                'country'      => 'Turkey',
                'region'       => 'Istanbul',
                'city'         => 'Istanbul',
            ];
        }

        try {
            $params = [
                'fields' => 'success,country,country_code,region,city',
            ];

            $response = Http::timeout(3)->get("https://ipwhois.io/{$ip}", $params);

            if (!$response->ok()) {
                return [];
            }

            $data = $response->json();

            if (($data['success'] ?? true) === false) {
                return [];
            }

            return [
                'country_code' => $data['country_code'] ?? null,
                'country'      => $data['country'] ?? null,
                'region'       => $data['region'] ?? null,
                'city'         => $data['city'] ?? null,
            ];
        } catch (\Throwable) {
            return [];
        }
    }

    private function checkHoneypot(Request $request): void
    {
        try {
            app(SpamProtection::class)->check($request->all());
        } catch (SpamException) {
            throw ValidationException::withMessages([
                'message' => 'Mesaj doğrulanamadı. Lütfen tekrar deneyin.',
            ]);
        }
    }
}
