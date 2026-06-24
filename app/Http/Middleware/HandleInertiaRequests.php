<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error'   => fn () => $request->session()->get('error'),
            ],
            'auth' => [
                'user' => $request->user()
                    ? ['name' => $request->user()->name, 'email' => $request->user()->email]
                    : null,
            ],
            // Public-site content (skipped on admin/auth screens to save queries).
            'content' => fn () => $request->routeIs('admin.*') || $request->routeIs('login')
                ? null
                : \App\Support\SiteContent::all(),
            // New-lead count for the admin sidebar badge.
            'adminNewLeads' => fn () => $request->routeIs('admin.*')
                ? \App\Models\Lead::where('status', 'new')->count()
                : null,
        ]);
    }
}
