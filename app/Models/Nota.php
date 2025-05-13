<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nota extends Model
{
    use HasFactory;

    protected $fillable = [
        'trimestre1',
        'trimestre2',
        'trimestre3',
        'materia_id',
        'telefono'
    ];

    public function materia() {
        return $this->belongsTo(Materia::class);  // Relación de uno a muchos con la tabla 'materias'
    }
}
