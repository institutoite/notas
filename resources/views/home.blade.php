@extends('adminlte::page')

@section('title', 'notas list')


@section('content')
<div class="container mt-5">
    <h1 class="text-center mb-4">Listado de Notas de Estudiantes</h1>
    
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead class="table-dark">
                <tr>
                    <th>NOTAS</th>
                    <th>Teléfono</th>
                    <th>Materia</th>
                    <th>Fecha de Creación</th>
                </tr>
            </thead>
            <tbody>
                @foreach($notas as $estudiante)
                <tr>
                    <td>{{ $estudiante->trimestre1.", ".$estudiante->trimestre2.", ".$estudiante->trimestre3 }}</td>
                    <td><a target="_blank" href="https://api.whatsapp.com/send?phone={{ $estudiante->telefono }}">{{ $estudiante->telefono }}</a></td>
                    <td>{{ $estudiante->materia->materia }}</td>
                    <td>{{ $estudiante->created_at }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
{{ $notas->links() }}
@stop

@section('css')
    
@stop

@section('js')
    
@stop