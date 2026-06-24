<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\Lead;
use App\Models\Package;
use App\Models\Project;
use App\Models\Service;
use App\Models\Testimonial;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'leads'    => Lead::count(),
                'newLeads' => Lead::where('status', 'new')->count(),
                'services' => Service::count(),
                'projects' => Project::count(),
                'packages' => Package::count(),
                'faqs'     => Faq::count(),
                'testimonials' => Testimonial::count(),
            ],
            'recentLeads' => Lead::latest()->take(6)->get(),
        ]);
    }
}
