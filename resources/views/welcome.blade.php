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
    <link rel="stylesheet" href="{{ asset('css/redes.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    
    <div class="panel-lite">
    
        <h1 class="title" style="text-align: center; background-color: white; z-index: 1000;">¿Primer Trimestre <a class="" id="loginBtn" onclick="window.location.href='/login';">?</a></h1>

        <marquee><h2 class="title">Descubre Cuántos Puntos Necesitas en el segundo y tercer Trimestre</h2></marquee>

        <div class="thumbur">
            <div class="icon-lock"></div>
        </div>

        <div class="form-group">
            <input class="form-control" type="number" name="trimestre1" max="100" id="trimestre1" value="{{ old('trimestre1', '') }}" min="0" required="required"/>
            <label class="form-label">Nota del primer trimestre</label>
        </div>
        
        {{-- <div class="form-group">
            <input class="form-control" type="number" name="trimestre2" id="trimestre2" value="{{ old('trimestre2', '') }}" min="0" required="required"/>
            <label class="form-label">Nota del segundo trimestre</label>
        </div> --}}
        
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
        <a href="https://tiktok.com/@ite_educabol" target="_blank" class="sm-icon-btn sm-tiktok">
            <span class="sm-icon"><i class="fab fa-tiktok"></i></span>
            <span class="sm-tooltip">TikTok Institucional</span>
        </a>
         <!-- Facebook -->
        <a href="https://www.facebook.com/ite.educabol" target="_blank" class="sm-icon-btn sm-facebook">
            <span class="sm-icon"><i class="fab fa-facebook-f"></i></span>
            <span class="sm-tooltip">Facebook</span>
        </a>
        
        <!-- TikTok Personal -->
        <a href="https://www.tiktok.com/@davidflores.ite" target="_blank" class="sm-icon-btn sm-tiktok">
            <span class="sm-icon"><i class="fab fa-tiktok"></i></span>
            <span class="sm-tooltip">TikTok Personal</span>
        </a>
        
        <!-- WhatsApp -->
        <a href="https://wa.me/59171324941?text=Vengo%20de%20Tik%20Tok%20quiero%20información%20de%20sus%20servicios" target="_blank" class="sm-icon-btn sm-whatsapp">
            <span class="sm-icon"><i class="fab fa-whatsapp"></i></span>
            <span class="sm-tooltip">WhatsApp</span>
        </a>
        
        <!-- YouTube -->
        <a href="https://www.youtube.com/@ite_educabol" target="_blank" class="sm-icon-btn sm-youtube">
            <span class="sm-icon"><i class="fab fa-youtube"></i></span>
            <span class="sm-tooltip">YouTube</span>
        </a>

        <!-- Botón de Enviar -->
        <button class="floating-btn" id="submitBtn"><i class="icon-arrow"></i></button>

        
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="{{ asset('js/login.js') }}"></script>
</body>
</html>
