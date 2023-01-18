<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\V1\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            "name" => "Fulano da Silva",
            "role_id" => 1,
            "email" => "admin@gmail.com",
            "password" => Hash::make("12345")
        ]);
    }
}
