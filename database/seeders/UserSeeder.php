<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!User::where('email', 'admin@ite.com')->exists()) {
            User::create([
                'name' => 'itenauta',
                'email' => 'itenauta@ite.com.bo',
                'password' => Hash::make('itenauta1326'), // Cambiar por una contraseña segura
            ]);
        }
    }
}
