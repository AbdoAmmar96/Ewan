<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LeadController;
use App\Http\Controllers\Admin\ResourceController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/* ---------------- Public site ---------------- */
Route::get('/', fn () => Inertia::render('Home'))->name('home');
Route::get('/services', fn () => Inertia::render('Services'))->name('services');
Route::get('/projects', fn () => Inertia::render('Projects'))->name('projects');
Route::get('/about', fn () => Inertia::render('About'))->name('about');
Route::get('/contact', fn () => Inertia::render('Contact'))->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

/* ---------------- Auth ---------------- */
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'show'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');

/* ---------------- Admin dashboard ---------------- */
$cms = ['services', 'projects', 'packages', 'faqs', 'testimonials', 'why', 'process', 'values', 'team', 'advantages'];

Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () use ($cms) {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Leads (quote requests)
    Route::get('leads', [LeadController::class, 'index'])->name('leads.index');
    Route::get('leads/{lead}', [LeadController::class, 'show'])->name('leads.show');
    Route::put('leads/{lead}', [LeadController::class, 'update'])->name('leads.update');
    Route::delete('leads/{lead}', [LeadController::class, 'destroy'])->name('leads.destroy');

    // Site settings (contact, stats, marquee...)
    Route::get('settings', [SettingController::class, 'edit'])->name('settings.edit');
    Route::put('settings', [SettingController::class, 'update'])->name('settings.update');

    // Generic CMS resources (services, projects, packages, faqs, ...)
    Route::get('{resource}', [ResourceController::class, 'index'])->whereIn('resource', $cms)->name('resource.index');
    Route::post('{resource}', [ResourceController::class, 'store'])->whereIn('resource', $cms)->name('resource.store');
    Route::put('{resource}/{id}', [ResourceController::class, 'update'])->whereIn('resource', $cms)->name('resource.update');
    Route::patch('{resource}/{id}/toggle', [ResourceController::class, 'toggle'])->whereIn('resource', $cms)->name('resource.toggle');
    Route::delete('{resource}/{id}', [ResourceController::class, 'destroy'])->whereIn('resource', $cms)->name('resource.destroy');
});
