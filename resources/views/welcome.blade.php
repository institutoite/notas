<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ITE CALCULADORA</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" href="{{ asset('image/icono.ico') }}" type="image/x-icon">
    <link rel="stylesheet" href="{{ asset('css/login2.css') }}">
</head>
<body>
    
    <div class="panel-lite">
    
        <h1 class="title" style="text-align: center; background-color: white; z-index: 1000;">¿Aún Puedes Aprobar <a class="" id="loginBtn" onclick="window.location.href='/login';">?</a></h1>

        <marquee><h2 class="title">Descubre Cuántos Puntos Necesitas para Pasar</h2></marquee>

        <div class="thumbur">
            <div class="icon-lock"></div>
        </div>

        <div class="form-group">
            <input class="form-control" type="number" name="trimestre1" max="100" id="trimestre1" value="{{ old('trimestre1', '') }}" min="0" required="required"/>
            <label class="form-label">Nota del primer trimestre</label>
        </div>
        
        <div class="form-group">
            <input class="form-control" type="number" name="trimestre2" id="trimestre2" value="{{ old('trimestre2', '') }}" min="0" required="required"/>
            <label class="form-label">Nota del segundo trimestre</label>
        </div>
        
        <div class="form-group">
            <select class="form-control" name="materia_id" id="materia_id" required>
                <option value="0">Seleccione una materia</option>
                @foreach($materias as $materia)
                    <option value="{{ $materia->id }}" {{ old('materia_id') == $materia->id ? 'selected' : '' }}>{{ $materia->materia }}</option>
                @endforeach
            </select>
            <label class="form-label">Materia</label>
        </div>
        
        <div class="form-group">
            <input class="form-control" type="number" name="telefono" id="telefono" value="{{ old('telefono', '') }}" min="0" required="required"/>
            <label class="form-label">Teléfono</label>
        </div>

        <!-- Botón de Login -->
       

        <!-- Botón de Enviar -->
        <button class="floating-btn" id="submitBtn"><i class="icon-arrow"></i></button>

        <a target="_blank" href="https://www.tiktok.com/@ite_educabol">Siguenos en TikTok</a>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="{{ asset('js/login.js') }}"></script>
</body>
</html>
