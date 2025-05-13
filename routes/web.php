<?php

use Illuminate\Support\Facades\Route;
use App\Models\Materia;
use App\Http\Controllers\NotaController;


Route::get('/', function () {
    $materias=Materia::all();
    return view('welcome',compact("materias"));
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
});

Route::post('guardar-notas', [NotaController::class, 'guardarNotas'])->name('guardar.notas');
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
