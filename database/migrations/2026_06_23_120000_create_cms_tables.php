<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Quote requests coming from the contact form.
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone', 40);
            $table->string('email')->nullable();
            $table->string('service', 120);
            $table->text('message');
            $table->string('status', 20)->default('new'); // new | read | replied | archived
            $table->text('admin_note')->nullable();
            $table->timestamps();
        });

        // Services (الخدمات)
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('icon', 40)->default('passenger');
            $table->string('title');
            $table->text('description');
            $table->text('body')->nullable();
            $table->json('features')->nullable();
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        // Projects (أعمالنا)
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('category', 40)->default('residential');
            $table->string('category_label', 60);
            $table->string('title');
            $table->string('location');
            $table->string('detail');
            $table->text('body')->nullable();
            $table->string('image')->nullable();
            $table->string('motif', 30)->default('towers');
            $table->string('tint', 5)->default('a');
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        // Maintenance packages (الباقات)
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->string('amount');
            $table->boolean('featured')->default(false);
            $table->json('features')->nullable();
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        // FAQs (الأسئلة الشائعة)
        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->string('question');
            $table->text('answer');
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        // Testimonials (آراء العملاء)
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->text('quote');
            $table->string('name');
            $table->string('role');
            $table->string('initials', 8);
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        // "ليه إيوان" advantages (WHY)
        Schema::create('why_features', function (Blueprint $table) {
            $table->id();
            $table->string('icon', 40)->default('shield');
            $table->string('title');
            $table->text('description');
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        // Work process steps (PROCESS)
        Schema::create('process_steps', function (Blueprint $table) {
            $table->id();
            $table->string('icon', 40)->default('search');
            $table->string('title');
            $table->text('description');
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        // Mission / vision / values (VALUES)
        Schema::create('company_values', function (Blueprint $table) {
            $table->id();
            $table->string('icon', 40)->default('target');
            $table->string('title');
            $table->text('description');
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        // Team members (TEAM)
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('initials', 12);
            $table->string('role');
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        // "ليه تشتغل معانا" checklist (CHECKS)
        Schema::create('advantages', function (Blueprint $table) {
            $table->id();
            $table->string('bold');
            $table->text('sub');
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        // Singleton settings: contact info, stats, marquee, service options, filters...
        Schema::create('settings', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->json('value')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        foreach ([
            'settings', 'advantages', 'team_members', 'company_values', 'process_steps',
            'why_features', 'testimonials', 'faqs', 'packages', 'projects', 'services', 'leads',
        ] as $t) {
            Schema::dropIfExists($t);
        }
    }
};
