<?php

namespace App\Support;

use App\Models\Advantage;
use App\Models\CompanyValue;
use App\Models\Faq;
use App\Models\Package;
use App\Models\ProcessStep;
use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\WhyFeature;
use Illuminate\Support\Facades\Cache;

/**
 * Assembles the public-site content from the database in the exact shape the
 * React components expect (mirrors the old resources/js/site.js exports).
 * Cached forever and flushed whenever the admin edits content.
 */
class SiteContent
{
    public const CACHE_KEY = 'site.content';

    public static function all(): array
    {
        return Cache::rememberForever(self::CACHE_KEY, function () {
            return [
                'CONTACT' => Setting::get('contact', []),
                'MARQUEE' => Setting::get('marquee', []),
                'HERO_STATS' => Setting::get('hero_stats', []),
                'STATS' => Setting::get('stats', []),
                'SERVICE_OPTS' => Setting::get('service_opts', []),
                'FILTERS' => Setting::get('filters', []),

                'SERVICES' => Service::where('active', true)->orderBy('sort')->get()
                    ->map(fn ($s) => ['icon' => $s->icon, 'title' => $s->title, 'desc' => $s->description, 'body' => $s->body, 'feats' => $s->features ?? []])->all(),

                'WHY' => WhyFeature::where('active', true)->orderBy('sort')->get()
                    ->map(fn ($w) => ['icon' => $w->icon, 'title' => $w->title, 'desc' => $w->description])->all(),

                'PROCESS' => ProcessStep::where('active', true)->orderBy('sort')->get()
                    ->map(fn ($p) => ['icon' => $p->icon, 'title' => $p->title, 'desc' => $p->description])->all(),

                'PROJECTS' => Project::where('active', true)->orderBy('sort')->get()
                    ->map(fn ($p) => ['cat' => $p->category, 'catL' => $p->category_label, 'title' => $p->title, 'loc' => $p->location, 'detail' => $p->detail, 'body' => $p->body, 'image' => $p->image, 'motif' => $p->motif, 'tint' => $p->tint])->all(),

                'TESTIMONIALS' => Testimonial::where('active', true)->orderBy('sort')->get()
                    ->map(fn ($t) => ['quote' => $t->quote, 'name' => $t->name, 'role' => $t->role, 'ini' => $t->initials])->all(),

                'FAQS' => Faq::where('active', true)->orderBy('sort')->get()
                    ->map(fn ($f) => ['q' => $f->question, 'a' => $f->answer])->all(),

                'PACKAGES' => Package::where('active', true)->orderBy('sort')->get()
                    ->map(fn ($p) => ['name' => $p->name, 'desc' => $p->description, 'amount' => $p->amount, 'featured' => $p->featured, 'feats' => $p->features ?? []])->all(),

                'VALUES' => CompanyValue::where('active', true)->orderBy('sort')->get()
                    ->map(fn ($v) => ['icon' => $v->icon, 'title' => $v->title, 'desc' => $v->description])->all(),

                'TEAM' => TeamMember::where('active', true)->orderBy('sort')->get()
                    ->map(fn ($m) => ['ini' => $m->initials, 'role' => $m->role])->all(),

                'CHECKS' => Advantage::where('active', true)->orderBy('sort')->get()
                    ->map(fn ($a) => ['b' => $a->bold, 's' => $a->sub])->all(),
            ];
        });
    }

    public static function flush(): void
    {
        Cache::forget(self::CACHE_KEY);
    }
}
