<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notas', function (Blueprint $table) {
            $table->id();
            $table->integer('trimestre1');
            $table->integer('trimestre2');
            $table->integer('trimestre3');
            $table->string('telefono',8);
            $table->unsignedBigInteger("materia_id");
            $table->foreign("materia_id")->references("id")->on("materias");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notas');
    }
};
