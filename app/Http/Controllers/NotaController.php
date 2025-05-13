<?php

namespace App\Http\Controllers;

use App\Models\Nota;
use App\Http\Requests\GuardarNotaRequest;
use App\Http\Requests\UpdateNotaRequest;
use App\Models\Materia;

class NotaController extends Controller
{
    
    public function guardarNotas(GuardarNotaRequest $request)
    {

        // $validatedData = $request->validate([
        //     'trimestre1' => 'required|numeric|min:0|max:100', // Requiere que sea un número entre 0 y 100
        //     'trimestre2' => 'required|numeric|min:0|max:100', // Requiere que sea un número entre 0 y 100
        //     'materia_id' => 'required|exists:materias,id',    // Verifica que exista en la tabla 'materias'
        //     'telefono' => 'required|numeric|digits_between:7,15', // Requiere que sea un número con entre 7 y 15 dígitos
        // ]);
        
        $nota=Nota::create([
            'trimestre1' => $request->trimestre1,
            'trimestre2' => $request->trimestre2,
            'trimestre3' => 153-$request->trimestre1-$request->trimestre2,
            'materia_id' => $request->materia_id,
            'telefono' => $request->telefono
        ]);

        $materia=Materia::findOrFail($request->materia_id);
        return response()->json(["materia"=>$materia,'nota'=>$nota]);
    }


    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNotaRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Nota $nota)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Nota $nota)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNotaRequest $request, Nota $nota)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Nota $nota)
    {
        //
    }
}
