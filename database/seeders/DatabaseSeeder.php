<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin account for the dashboard (change the password after first login).
        User::updateOrCreate(
            ['email' => 'admin@aywan-elevators.com'],
            ['name' => 'مدير إيوان', 'password' => Hash::make('aywan@2026')]
        );

        $this->call(ContentSeeder::class);
    }
}
