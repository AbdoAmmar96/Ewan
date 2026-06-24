<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Support\SiteContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function edit()
    {
        return Inertia::render('Admin/Settings', [
            'settings' => [
                'contact'      => Setting::get('contact', []),
                'hero_stats'   => Setting::get('hero_stats', []),
                'stats'        => Setting::get('stats', []),
                'marquee'      => Setting::get('marquee', []),
                'service_opts' => Setting::get('service_opts', []),
                'filters'      => Setting::get('filters', []),
            ],
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'contact'      => ['required', 'array'],
            'hero_stats'   => ['nullable', 'array'],
            'stats'        => ['nullable', 'array'],
            'marquee'      => ['nullable', 'array'],
            'service_opts' => ['nullable', 'array'],
            'filters'      => ['nullable', 'array'],
        ]);

        foreach ($data as $key => $value) {
            Setting::put($key, $value);
        }

        SiteContent::flush();

        return back()->with('success', 'تم حفظ الإعدادات.');
    }
}
