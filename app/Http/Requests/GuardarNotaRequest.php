<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GuardarNotaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'trimestre1' => 'required|numeric|min:0|max:100',  // Requiere ser un número entre 0 y 100
            'trimestre2' => 'required|numeric|min:0|max:100',  // Requiere ser un número entre 0 y 100
            'materia_id' => 'required|exists:materias,id',     // Requiere que sea una materia válida
            'telefono' => 'required|numeric|digits_between:7,15', 
        ];
    }
}
