<?php

namespace App\Http\Controllers;

use App\Models\Nota;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        // Obtener las notas, ordenarlas descendentemente por 'id' y paginar de 50 en 50
        $notas = Nota::orderBy('id', 'desc')->paginate(50);
    
        // Retornar la vista 'home' pasando las notas paginadas
        return view('home', compact("notas"));
    }
}
