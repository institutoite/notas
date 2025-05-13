<?php

namespace Database\Seeders;

use App\Models\Materia;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MateriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Materia::create(["materia"=>"MATEMATICA"]);
        Materia::create(["materia"=>"LENGUAJE"]);
        Materia::create(["materia"=>"CIENCIAS SOCIALES"]);
        Materia::create(["materia"=>"Educación Física"]);
        Materia::create(["materia"=>"Educación Musical"]);
        Materia::create(["materia"=>"Artes Plásticas"]);
        Materia::create(["materia"=>"Técnica Tecnológica"]);
        Materia::create(["materia"=>"Ciencias Naturales"]);
        Materia::create(["materia"=>"QUIMICA"]);
        Materia::create(["materia"=>"FISICA"]);
        Materia::create(["materia"=>"FILOSOFIA Y SICOLOGIA"]);
        Materia::create(["materia"=>"Valores Religión"]);
        Materia::create(["materia"=>"Lengua Extranjera"]);
    }
}
