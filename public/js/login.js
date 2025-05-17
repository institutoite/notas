$(document).ready(function() {
  // Configura el token CSRF para que se incluya en todas las solicitudes AJAX
  $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
  });

  $('#submitBtn').click(function(e) {
    e.preventDefault();  // Evita el envío automático del formulario

    // Limpiar errores anteriores
    $('.text-danger').remove();  // Elimina mensajes de error previos
    $('.form-control').removeClass('is-invalid');  // Elimina la clase de error anterior

    // Recopilar datos del formulario
    var trimestre1 = $('#trimestre1').val();
    //var trimestre2 = $('#trimestre2').val();
    var materia_id = $('#materia_id').val();
    var telefono = $('#telefono').val();

    // Realizar la solicitud AJAX
    $.ajax({
        url: "guardar-notas",  // Ruta en Laravel
        method: "POST",
        data: {
            trimestre1: trimestre1,
            //trimestre2: trimestre2,
            materia_id: materia_id,
            telefono: telefono,
            _token: $('meta[name="csrf-token"]').attr('content')  // Incluir el token CSRF
        },
        success: function(response) {
            console.log(response);
            enviarWhatsapp(telefono, response.materia.materia, response.nota.trimestre1,response.nota.trimestre2+response.nota.trimestre3);
        },
        error: function(xhr) {
            if (xhr.status == 422) {
                var errors = xhr.responseJSON.errors;
                
                // Limpiamos cualquier mensaje o clase de error previo
                $('#trimestre1, #trimestre2, #materia_id, #telefono').removeClass('is-invalid');
                $('.text-danger').remove(); // Limpiar mensajes de error previos
                
                $.each(errors, function(key, value) {
                    // Añadimos la clase is-invalid al campo con error
                    $('#' + key).addClass('is-invalid');
                    
                    // Mostrar el mensaje de error debajo del campo
                    $('#' + key).before('<span class="text-danger">' + value[0] + '</span>');
                });
            }
        }
    });
});
  // Función para enviar el mensaje de WhatsApp
function enviarWhatsapp(telefono, materia,notaPrimerTrimestre ,puntosFaltantes) {
    let mensaje;
    
        //console.log(puntosFaltantes);
        // Validación de notas inválidas
        if (notaPrimerTrimestre < 0) {
            mensaje = "⚠️ ¡Error! La nota no puede ser negativa.%0AIngresa un valor entre *0* y *100* pts.%0A(Ejemplo válido: 75)";
        } 
        // Mensajes para 1-20 puntos faltantes
        else if (puntosFaltantes == 1) {
            mensaje = "📊 *Resumen de puntos:*%0A- Total faltante: *1* punto%0A- 2do Trimestre: *0.5* pts%0A- 3er Trimestre: *0.5* pts%0A%0A¡Estás a solo *1* punto de aprobar *" + materia + "*! ¡Tú puedes lograrlo sin problemas! 💪";
        } else if (puntosFaltantes == 2) {
            mensaje = "📊 *Resumen de puntos:*%0A- Total faltante: *2* puntos%0A- 2do Trimestre: *1* pt%0A- 3er Trimestre: *1* pt%0A%0A¡Solo necesitas *1* punto por trimestre en *" + materia + "*! ¡Es tu victoria más fácil! 😊";
        } else if (puntosFaltantes == 3) {
            mensaje = "📊 *Resumen de puntos:*%0A- Total faltante: *3* puntos%0A- 2do Trimestre: *1.5* pts%0A- 3er Trimestre: *1.5* pts%0A%0A¡En *" + materia + "* solo necesitas *1.5* pts por trimestre! ¡Hasta los trabajos más simples te darán esto! ✨";
        } else if (puntosFaltantes == 4) {
            mensaje = "📊 *Resumen de puntos:*%0A- Total faltante: *4* puntos%0A- 2do Trimestre: *2* pts%0A- 3er Trimestre: *2* pts%0A%0A¡En *" + materia + "* solo *2* pts por trimestre! ¡Estás a un paso de lograrlo! 🚶‍♂️";
        } else if (puntosFaltantes == 5) {
            mensaje = "📊 *Resumen de puntos:*%0A- Total faltante: *5* puntos%0A- 2do Trimestre: *2.5* pts%0A- 3er Trimestre: *2.5* pts%0A%0A¡En *" + materia + "* necesitas solo *2.5* pts por trimestre! ¡Un pequeño esfuerzo extra y lo lograrás! 💯";
        } else if (puntosFaltantes == 6) {
            mensaje = "📊 *Resumen de puntos:*%0A- Total faltante: *6* puntos%0A- 2do Trimestre: *3* pts%0A- 3er Trimestre: *3* pts%0A%0A¡En *" + materia + "* solo *3* pts por trimestre! ¡Menos que una nota de participación! 😎";
        } else if (puntosFaltantes == 7) {
            mensaje = "📊 *Resumen de puntos:*%0A- Total faltante: *7* puntos%0A- 2do Trimestre: *3.5* pts%0A- 3er Trimestre: *3.5* pts%0A%0A¡En *" + materia + "* necesitas *3.5* pts por trimestre! ¡Hasta puedes permitirte algún error! 🔄";
        } else if (puntosFaltantes == 8) {
            mensaje = "📊 *Resumen de puntos:*%0A- Total faltante: *8* puntos%0A- 2do Trimestre: *4* pts%0A- 3er Trimestre: *4* pts%0A%0A¡En *" + materia + "* solo *4* pts por trimestre! ¡Es menos del 5% del total! 📈";
        } else if (puntosFaltantes == 9) {
            mensaje = "📊 *Resumen de puntos:*%0A- Total faltante: *9* puntos%0A- 2do Trimestre: *4.5* pts%0A- 3er Trimestre: *4.5* pts%0A%0A¡En *" + materia + "* necesitas *4.5* pts por trimestre! ¡Los trabajos opcionales pueden darte esto! ✏️";
        } else if (puntosFaltantes == 10) {
            mensaje = "📊 *Resumen de puntos:*%0A- Total faltante: *10* puntos%0A- 2do Trimestre: *5* pts%0A- 3er Trimestre: *5* pts%0A%0A¡En *" + materia + "* solo *5* pts por trimestre! ¡Lo ganas por asistir regularmente! 🏫";
        } else if (puntosFaltantes == 11) {
            mensaje = "📊 *Resumen de puntos:*%0A- Total faltante: *11* puntos%0A- 2do Trimestre: *5.5* pts%0A- 3er Trimestre: *5.5* pts%0A%0A¡En *" + materia + "* necesitas *5.5* pts por trimestre! ¡Menos que una tarea bien hecha! 📚";
        } else if (puntosFaltantes == 12) {
            mensaje = "📊 *Resumen de puntos:*%0A- Total faltante: *12* puntos%0A- 2do Trimestre: *6* pts%0A- 3er Trimestre: *6* pts%0A%0A¡En *" + materia + "* solo *6* pts por trimestre! ¡Tu aprobado está casi garantizado! ✅";
        } else if (puntosFaltantes == 13) {
            mensaje = "📊 *Resumen de puntos:*%0A- Total faltante: *13* puntos%0A- 2do Trimestre: *6.5* pts%0A- 3er Trimestre: *6.5* pts%0A%0A¡En *" + materia + "* necesitas *6.5* pts por trimestre! ¡Hasta el proyecto más simple te da esto! 🛠️";
        } else if (puntosFaltantes == 14) {
            mensaje = "📊 *Resumen de puntos:*%0A- Total faltante: *14* puntos%0A- 2do Trimestre: *7* pts%0A- 3er Trimestre: *7* pts%0A%0A¡En *" + materia + "* solo *7* pts por trimestre! ¡Menos que una buena evaluación! ✨";
        } else if (puntosFaltantes == 15) {
            mensaje = "📊 *Resumen de puntos:*%0A- Total faltante: *15* puntos%0A- 2do Trimestre: *7.5* pts%0A- 3er Trimestre: *7.5* pts%0A%0A¡En *" + materia + "* necesitas *7.5* pts por trimestre! ¡Lo consigues participando activamente! 🗣️";
        } else if (puntosFaltantes == 16) {
            mensaje = "📊 *Resumen de puntos:*%0A- Total faltante: *16* puntos%0A- 2do Trimestre: *8* pts%0A- 3er Trimestre: *8* pts%0A%0A¡En *" + materia + "* solo *8* pts por trimestre! ¡Una actividad especial te da esto! 🎯";
        } else if (puntosFaltantes == 17) {
            mensaje = "📊 *Resumen de puntos:*%0A- Total faltante: *17* puntos%0A- 2do Trimestre: *8.5* pts%0A- 3er Trimestre: *8.5* pts%0A%0A¡En *" + materia + "* necesitas *8.5* pts por trimestre! ¡Cualquier esfuerzo extra te sobrará! 🚀";
        } else if (puntosFaltantes == 18) {
            mensaje = "📊 *Resumen de puntos:*%0A- Total faltante: *18* puntos%0A- 2do Trimestre: *9* pts%0A- 3er Trimestre: *9* pts%0A%0A¡En *" + materia + "* solo *9* pts por trimestre! ¡Es menos del 10% del total! 🔢";
        } else if (puntosFaltantes == 19) {
            mensaje = "📊 *Resumen de puntos:*%0A- Total faltante: *19* puntos%0A- 2do Trimestre: *9.5* pts%0A- 3er Trimestre: *9.5* pts%0A%0A¡En *" + materia + "* necesitas *9.5* pts por trimestre! ¡Mantén tu ritmo y lo lograrás! ⏱️";
        } else if (puntosFaltantes == 20) {
            mensaje = "📊 *Resumen de puntos:*%0A- Total faltante: *20* puntos%0A- 2do Trimestre: *10* pts%0A- 3er Trimestre: *10* pts%0A%0A¡En *" + materia + "* solo *10* pts por trimestre! ¡Lo consigues entregando todo a tiempo! ⏰";
        }
        
        else if (puntosFaltantes == 21) {
            mensaje = "¡Tú puedes cerrar esta brecha! En: %0A*" + materia + "*%0A solo te faltan %0A*21* puntos.%0ADistribución ideal:%0A- 2do Trimestre: *10.5* pts%0A- 3er Trimestre: *10.5* pts%0A¡Son metas perfectamente alcanzables! 💪";
        } else if (puntosFaltantes == 22) {
            mensaje = "¡Estás más cerca de lo que crees! En: %0A*" + materia + "*%0A faltan solo %0A*22* puntos.%0APara aprobar:%0A- 11 pts en cada trimestre%0A¡Un pequeño esfuerzo sostenido te llevará allí! ✨";
        } else if (puntosFaltantes == 23) {
            mensaje = "¡El éxito está al alcance! En: %0A*" + materia + "*%0A necesitas %0A*23* puntos más.%0AMeta por periodo:%0A- 2do Trim: *11.5* pts%0A- 3ro Trim: *11.5* pts%0A¡Son retos pequeños que suman grandes logros!";
        } else if (puntosFaltantes == 24) {
            mensaje = "¡24 puntos son solo 2 por semana! En: %0A*" + materia + "*%0A faltan %0A*24* puntos.%0ADebes obtener:%0A- 12 pts por trimestre%0A¡Divide el objetivo y verás lo sencillo que es! 📅";
        } else if (puntosFaltantes == 25) {
            mensaje = "¡Un cuarto de camino por recorrer! En: %0A*" + materia + "*%0A te faltan %0A*25* puntos.%0APuntos necesarios:%0A- 2do Trim: *12.5* pts%0A- 3ro Trim: *12.5* pts%0A¡Ya tienes el 75% del camino avanzado! 🚀";
        } else if (puntosFaltantes == 26) {
            mensaje = "¡Menos de 1 punto por día! En: %0A*" + materia + "*%0A faltan %0A*26* puntos.%0AMeta mínima:%0A- 13 pts cada trimestre%0A¡Son micro-esfuerzos con macro-resultados! 💯";
        } else if (puntosFaltantes == 27) {
            mensaje = "¡El último empujón! En: %0A*" + materia + "*%0A solo %0A*27* puntos separan tu éxito.%0ADistribución:%0A- 2do Trim: *13.5* pts%0A- 3ro Trim: *13.5* pts%0A¡Estás a un paso de lograrlo! 👣";
        } else if (puntosFaltantes == 28) {
            mensaje = "¡Solo 14 puntos por periodo! En: %0A*" + materia + "*%0A necesitas %0A*28* puntos más.%0A¡Es menos de lo que crees!%0A- 14 pts en cada trimestre%0A¡Tienes todo para conseguirlo! 🌟";
        } else if (puntosFaltantes == 29) {
            mensaje = "¡Menos de 30 puntos es fácil! En: %0A*" + materia + "*%0A faltan %0A*29* puntos.%0APara aprobar:%0A- 2do Trim: *14.5* pts%0A- 3ro Trim: *14.5* pts%0A¡Son notas perfectamente alcanzables! ✅";
        } else if (puntosFaltantes == 30) {
            mensaje = "¡Redondea tus esfuerzos! En: %0A*" + materia + "*%0A te faltan %0A*30* puntos.%0AMetas exactas:%0A- 15 pts por trimestre%0A¡Números redondos para un éxito completo! 🔵";
        } else if (puntosFaltantes == 31) {
            mensaje = "¡31 puntos son solo detalles! En: %0A*" + materia + "*%0A necesitas %0A*31* puntos.%0ADistribución:%0A- 2do Trim: *15.5* pts%0A- 3ro Trim: *15.5* pts%0A¡Enfócate en los detalles finales! 🔍";
        } else if (puntosFaltantes == 32) {
            mensaje = "¡32 puntos = 16 por periodo! En: %0A*" + materia + "*%0A faltan %0A*32* puntos.%0A¡Es muy manejable!%0A- 16 pts en cada trimestre%0A¡Consistencia es la clave! 🔑";
        } else if (puntosFaltantes == 33) {
            mensaje = "¡El 33 es tu número de la suerte! En: %0A*" + materia + "*%0A faltan %0A*33* puntos.%0AMeta por trimestre:%0A- 2do Trim: *16.5* pts%0A- 3ro Trim: *16.5* pts%0A¡Aprovecha esta oportunidad! 🍀";
        } else if (puntosFaltantes == 34) {
            mensaje = "¡34 puntos son solo 17 por etapa! En: %0A*" + materia + "*%0A necesitas %0A*34* puntos.%0A¡Puedes superarlo!%0A- 17 pts cada trimestre%0A¡Tu progreso será imparable! ⚡";
        } else if (puntosFaltantes == 35) {
            mensaje = "¡35 puntos = ¡Solo 17.5 por periodo! En: %0A*" + materia + "*%0A faltan %0A*35* puntos.%0ADebes obtener:%0A- 2do Trim: *17.5* pts%0A- 3ro Trim: *17.5* pts%0A¡Mitad y mitad, equilibrio perfecto! ⚖️";
        } else if (puntosFaltantes == 36) {
            mensaje = "¡36 puntos = 1 punto cada 2 días! En: %0A*" + materia + "*%0A necesitas %0A*36* puntos.%0AMeta:%0A- 18 pts por trimestre%0A¡Es un ritmo muy cómodo! 🏃♂️";
        } else if (puntosFaltantes == 37) {
            mensaje = "¡37 puntos son tu próximo logro! En: %0A*" + materia + "*%0A faltan %0A*37* puntos.%0ADistribución:%0A- 2do Trim: *18.5* pts%0A- 3ro Trim: *18.5* pts%0A¡Estás a punto de conseguirlo! 🎯";
        } else if (puntosFaltantes == 38) {
            mensaje = "¡38 puntos = ¡Solo 19 por etapa! En: %0A*" + materia + "*%0A te faltan %0A*38* puntos.%0A¡Es menos de 20 por trimestre!%0A- 19 pts cada uno%0A¡El éxito está en tu alcance! ✋";
        } else if (puntosFaltantes == 39) {
            mensaje = "¡39 puntos son tu última parada! En: %0A*" + materia + "*%0A necesitas %0A*39* puntos.%0AMeta final:%0A- 2do Trim: *19.5* pts%0A- 3ro Trim: *19.5* pts%0A¡El último esfuerzo para cruzar la meta! 🏁";
        } else if (puntosFaltantes == 40) {
            mensaje = "¡40 puntos = ¡Solo 20 por periodo! En: %0A*" + materia + "*%0A faltan %0A*40* puntos.%0A¡Números redondos para tu éxito!%0A- 20 pts en cada trimestre%0A¡Tú tienes el control total! 🎮";
        }

        else if (puntosFaltantes == 41) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *41* pts%0A- 2do Trimestre: *20.5* pts%0A- 3er Trimestre: *20.5* pts%0A%0A¡No es tarde para *" + materia + "*! Con esfuerzo constante puedes lograr esos *20.5* pts por trimestre. ¡Tú puedes! 💪";
        } else if (puntosFaltantes == 42) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *42* pts%0A- 2do Trimestre: *21* pts%0A- 3er Trimestre: *21* pts%0A%0A¡Da el primer paso en *" + materia + "*! *21* pts por trimestre son alcanzables con dedicación. ¡Cada esfuerzo cuenta! ✨";
        } else if (puntosFaltantes == 43) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *43* pts%0A- 2do Trimestre: *21.5* pts%0A- 3er Trimestre: *21.5* pts%0A%0A¡Sigue tu camino en *" + materia + "*! Esos *21.5* pts por trimestre están a tu alcance si persistes. ¡No desistas! 🌟";
        } else if (puntosFaltantes == 44) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *44* pts%0A- 2do Trimestre: *22* pts%0A- 3er Trimestre: *22* pts%0A%0A¡Con esfuerzo todo se puede en *" + materia + "*! *22* pts por trimestre son tu meta. ¡Supera tus límites! 🚀";
        } else if (puntosFaltantes == 45) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *45* pts%0A- 2do Trimestre: *22.5* pts%0A- 3er Trimestre: *22.5* pts%0A%0A¡Es momento de actuar en *" + materia + "*! Con *22.5* pts por trimestre lo lograrás. ¡Demuestra tu potencial! 💯";
        } else if (puntosFaltantes == 46) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *46* pts%0A- 2do Trimestre: *23* pts%0A- 3er Trimestre: *23* pts%0A%0A¡Nunca te rindas en *" + materia + "*! *23* pts por trimestre valen tu futuro. ¡Tú lo vales! 🌈";
        } else if (puntosFaltantes == 47) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *47* pts%0A- 2do Trimestre: *23.5* pts%0A- 3er Trimestre: *23.5* pts%0A%0A¡Avanza sin miedo en *" + materia + "*! Esos *23.5* pts por trimestre son posibles. ¡Eres más fuerte que los obstáculos! 💪";
        } else if (puntosFaltantes == 48) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *48* pts%0A- 2do Trimestre: *24* pts%0A- 3er Trimestre: *24* pts%0A%0A¡Sigue adelante con *" + materia + "*! *24* pts por trimestre se logran con constancia. ¡El éxito está en no detenerte! 🏃‍♂️";
        } else if (puntosFaltantes == 49) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *49* pts%0A- 2do Trimestre: *24.5* pts%0A- 3er Trimestre: *24.5* pts%0A%0A¡No estás solo en *" + materia + "*! Busca ayuda para esos *24.5* pts por trimestre. ¡Juntos es más fácil! 👥";
        } else if (puntosFaltantes == 50) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *50* pts%0A- 2do Trimestre: *25* pts%0A- 3er Trimestre: *25* pts%0A%0A¡Es posible mejorar en *" + materia + "*! *25* pts por trimestre son tu objetivo. ¡Este es tu momento para brillar! ✨";
        } else if (puntosFaltantes == 51) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *51* pts%0A- 2do Trimestre: *25.5* pts%0A- 3er Trimestre: *25.5* pts%0A%0A¡No pierdas tiempo con *" + materia + "*! Organízate para lograr *25.5* pts por trimestre. ¡Los resultados llegarán! 📅";
        } else if (puntosFaltantes == 52) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *52* pts%0A- 2do Trimestre: *26* pts%0A- 3er Trimestre: *26* pts%0A%0A¡Haz que valga el esfuerzo en *" + materia + "*! *26* pts por trimestre son alcanzables. ¡Cada punto cuenta! 🔢";
        } else if (puntosFaltantes == 53) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *53* pts%0A- 2do Trimestre: *26.5* pts%0A- 3er Trimestre: *26.5* pts%0A%0A¡Todo gran logro requiere esfuerzo en *" + materia + "*! Esos *26.5* pts por trimestre valdrán la pena. ¡Persiste! 💎";
        } else if (puntosFaltantes == 54) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *54* pts%0A- 2do Trimestre: *27* pts%0A- 3er Trimestre: *27* pts%0A%0A¡Paso a paso se llega lejos en *" + materia + "*! *27* pts por trimestre son posibles. ¡No subestimes tu potencial! 🚶‍♂️";
        } else if (puntosFaltantes == 55) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *55* pts%0A- 2do Trimestre: *27.5* pts%0A- 3er Trimestre: *27.5* pts%0A%0A¡Tú tienes el poder en *" + materia + "*! *27.5* pts por trimestre están a tu alcance. ¡Confía en ti! 💪";
        } else if (puntosFaltantes == 56) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *56* pts%0A- 2do Trimestre: *28* pts%0A- 3er Trimestre: *28* pts%0A%0A¡Enfócate y avanza en *" + materia + "*! *28* pts por trimestre son tu meta. ¡Aún puedes cambiar tu historia! 📖";
        } else if (puntosFaltantes == 57) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *57* pts%0A- 2do Trimestre: *28.5* pts%0A- 3er Trimestre: *28.5* pts%0A%0A¡Hazlo por tu futuro en *" + materia + "*! Esos *28.5* pts por trimestre son inversión en ti. ¡El conocimiento es poder! 🧠";
        } else if (puntosFaltantes == 58) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *58* pts%0A- 2do Trimestre: *29* pts%0A- 3er Trimestre: *29* pts%0A%0A¡Cada día cuenta en *" + materia + "*! *29* pts por trimestre se logran con pequeños esfuerzos. ¡Sigue adelante! ⏳";
        } else if (puntosFaltantes == 59) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *59* pts%0A- 2do Trimestre: *29.5* pts%0A- 3er Trimestre: *29.5* pts%0A%0A¡La meta está cerca en *" + materia + "*! Solo *29.5* pts por trimestre. ¡Un último empujón y lo lograrás! 🏁";
        } else if (puntosFaltantes == 60) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *60* pts%0A- 2do Trimestre: *30* pts%0A- 3er Trimestre: *30* pts%0A%0A¡Todo comienza con una decisión en *" + materia + "*! *30* pts por trimestre son tu objetivo. ¡El cambio empieza hoy! 🌟";
        }


        else if (puntosFaltantes == 61) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *61* pts%0A- 2do Trimestre: *30.5* pts%0A- 3er Trimestre: *30.5* pts%0A%0A¡Reto aceptado en *" + materia + "*! Con organización, esos *30.5* pts por trimestre son posibles. ¡Divide y vencerás! 💪";
        } else if (puntosFaltantes == 62) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *62* pts%0A- 2do Trimestre: *31* pts%0A- 3er Trimestre: *31* pts%0A%0A¡No te des por vencido en *" + materia + "*! *31* pts por trimestre requieren esfuerzo, pero valdrá la pena. ¡Tú puedes! ✨";
        } else if (puntosFaltantes == 63) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *63* pts%0A- 2do Trimestre: *31.5* pts%0A- 3er Trimestre: *31.5* pts%0A%0A¡Siempre hay una salida en *" + materia + "*! Esos *31.5* pts por trimestre son tu meta. ¡Vamos con todo! 🚀";
        } else if (puntosFaltantes == 64) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *64* pts%0A- 2do Trimestre: *32* pts%0A- 3er Trimestre: *32* pts%0A%0A¡Una meta difícil no es imposible en *" + materia + "*! *32* pts por trimestre con dedicación. ¡El esfuerzo supera al talento! 💎";
        } else if (puntosFaltantes == 65) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *65* pts%0A- 2do Trimestre: *32.5* pts%0A- 3er Trimestre: *32.5* pts%0A%0A¡Transforma tus dudas en acción en *" + materia + "*! Esos *32.5* pts por trimestre son tu objetivo. ¡Cada punto cuenta! 🔢";
        } else if (puntosFaltantes == 66) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *66* pts%0A- 2do Trimestre: *33* pts%0A- 3er Trimestre: *33* pts%0A%0A¡Nunca es tarde para intentarlo en *" + materia + "*! *33* pts por trimestre son alcanzables. ¡Hoy es el día para empezar! 📅";
        } else if (puntosFaltantes == 67) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *67* pts%0A- 2do Trimestre: *33.5* pts%0A- 3er Trimestre: *33.5* pts%0A%0A¡Levántate y comienza hoy con *" + materia + "*! Esos *33.5* pts por trimestre se logran paso a paso. ¡Pequeños esfuerzos, grandes resultados! 🌱";
        } else if (puntosFaltantes == 68) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *68* pts%0A- 2do Trimestre: *34* pts%0A- 3er Trimestre: *34* pts%0A%0A¡El esfuerzo de hoy será tu orgullo mañana en *" + materia + "*! *34* pts por trimestre son tu meta. ¡Tu futuro yo te lo agradecerá! ⏳";
        } else if (puntosFaltantes == 69) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *69* pts%0A- 2do Trimestre: *34.5* pts%0A- 3er Trimestre: *34.5* pts%0A%0A¡Actitud + trabajo = progreso en *" + materia + "*! Esos *34.5* pts por trimestre son posibles. ¡La fórmula del éxito está en tus manos! ✍️";
        } else if (puntosFaltantes == 70) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *70* pts%0A- 2do Trimestre: *35* pts%0A- 3er Trimestre: *35* pts%0A%0A¡Empieza con lo que tienes en *" + materia + "*! *35* pts por trimestre son tu objetivo. ¡No esperes condiciones perfectas, hazlo ahora! ⚡";
        } else if (puntosFaltantes == 71) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *71* pts%0A- 2do Trimestre: *35.5* pts%0A- 3er Trimestre: *35.5* pts%0A%0A¡Hazlo por ti en *" + materia + "*! Esos *35.5* pts por trimestre son inversión en tu futuro. ¡Eres más capaz de lo que crees! 💪";
        } else if (puntosFaltantes == 72) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *72* pts%0A- 2do Trimestre: *36* pts%0A- 3er Trimestre: *36* pts%0A%0A¡La motivación te hará comenzar en *" + materia + "*! *36* pts por trimestre requieren hábito. ¡La constancia es la clave! 🔑";
        } else if (puntosFaltantes == 73) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *73* pts%0A- 2do Trimestre: *36.5* pts%0A- 3er Trimestre: *36.5* pts%0A%0A¡Los límites solo están en tu mente con *" + materia + "*! Esos *36.5* pts por trimestre son posibles. ¡Rompe tus barreras! 🚧";
        } else if (puntosFaltantes == 74) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *74* pts%0A- 2do Trimestre: *37* pts%0A- 3er Trimestre: *37* pts%0A%0A¡Haz lo que puedas en *" + materia + "*! *37* pts por trimestre son tu meta. ¡No subestimes tu potencial! 🌟";
        } else if (puntosFaltantes == 75) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *75* pts%0A- 2do Trimestre: *37.5* pts%0A- 3er Trimestre: *37.5* pts%0A%0A¡Rinde al máximo en *" + materia + "*! Esos *37.5* pts por trimestre requieren tu mejor versión. ¡Aspira a superarte! 🏆";
        } else if (puntosFaltantes == 76) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *76* pts%0A- 2do Trimestre: *38* pts%0A- 3er Trimestre: *38* pts%0A%0A¡Un paso a la vez en *" + materia + "*! *38* pts por trimestre se logran con perseverancia. ¡Todo cuenta cuando no te rindes! 👣";
        } else if (puntosFaltantes == 77) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *77* pts%0A- 2do Trimestre: *38.5* pts%0A- 3er Trimestre: *38.5* pts%0A%0A¡Hoy puedes cambiar tu historia en *" + materia + "*! Esos *38.5* pts por trimestre son posibles. ¡El cambio comienza con una decisión! ✨";
        } else if (puntosFaltantes == 78) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *78* pts%0A- 2do Trimestre: *39* pts%0A- 3er Trimestre: *39* pts%0A%0A¡No estás solo en *" + materia + "*! *39* pts por trimestre son desafiantes, pero con apoyo lo lograrás. ¡Pide ayuda! 👥";
        } else if (puntosFaltantes == 79) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *79* pts%0A- 2do Trimestre: *39.5* pts%0A- 3er Trimestre: *39.5* pts%0A%0A¡Los grandes logros toman tiempo en *" + materia + "*! Esos *39.5* pts por trimestre requieren paciencia. ¡La recompensa valdrá la pena! ⏳";
        } else if (puntosFaltantes == 80) {
            mensaje = "📊 *Puntos necesarios:*%0A- Total faltante: *80* pts%0A- 2do Trimestre: *40* pts%0A- 3er Trimestre: *40* pts%0A%0A¡No dejes que el miedo te detenga en *" + materia + "*! *40* pts por trimestre son tu meta. ¡Enfrenta el reto con valentía! 🛡️";
        }

        else if (puntosFaltantes == 81) {
            mensaje = "📊 *Plan de recuperación:*%0A- Total faltante: *81* pts%0A- 2do Trimestre: *40.5* pts%0A- 3er Trimestre: *40.5* pts%0A%0A¡Reto máximo en *" + materia + "*! Necesitas *40.5* pts por trimestre. Reúnete con tu profesor para un plan personalizado. ¡Sí se puede con estrategia! 💡";
        } else if (puntosFaltantes == 82) {
            mensaje = "📊 *Plan de recuperación:*%0A- Total faltante: *82* pts%0A- 2do Trimestre: *41* pts%0A- 3er Trimestre: *41* pts%0A%0A¡Enfócate en *" + materia + "*! *41* pts por trimestre requieren:%0A• Asistencia perfecta%0A• Trabajos extras%0A• Refuerzo semanal%0A¡Tu esfuerzo vale oro! ✨";
        } else if (puntosFaltantes == 83) {
            mensaje = "📊 *Plan de recuperación:*%0A- Total faltante: *83* pts%0A- 2do Trimestre: *41.5* pts%0A- 3er Trimestre: *41.5* pts%0A%0A¡Organización es clave en *" + materia + "*! Para esos *41.5* pts por trimestre:%0A1. Prioriza temas con más peso%0A2. Busca tutorías%0A3. Revisa errores pasados%0A¡Tú puedes! 📚";
        } else if (puntosFaltantes == 84) {
            mensaje = "📊 *Plan de recuperación:*%0A- Total faltante: *84* pts%0A- 2do Trimestre: *42* pts%0A- 3er Trimestre: *42* pts%0A%0A¡Divide y vencerás en *" + materia + "*! Con *42* pts por trimestre:%0A• 10 pts/mes en evaluaciones%0A• 8 pts/mes en trabajos%0A• 3 pts/mes en participación%0A¡Meta alcanzable! 🎯";
        } else if (puntosFaltantes == 85) {
            mensaje = "📊 *Plan de recuperación:*%0A- Total faltante: *85* pts%0A- 2do Trimestre: *42.5* pts%0A- 3er Trimestre: *42.5* pts%0A%0A¡Transforma el desafío en *" + materia + "*! Esos *42.5* pts por trimestre requieren:%0A- Clases de refuerzo%0A- Exámenes de práctica%0A- Autoevaluación constante%0A¡El crecimiento duele, pero vale la pena! 🌱";
        } else if (puntosFaltantes == 86) {
            mensaje = "📊 *Plan de recuperación:*%0A- Total faltante: *86* pts%0A- 2do Trimestre: *43* pts%0A- 3er Trimestre: *43* pts%0A%0A¡Tú defines tus límites en *" + materia + "*! Para *43* pts por trimestre:%0A✓ 20 pts: Exámenes%0A✓ 15 pts: Proyectos%0A✓ 8 pts: Extras%0A¡Enfócate y verás resultados! 🔍";
        } else if (puntosFaltantes == 87) {
            mensaje = "📊 *Plan de recuperación:*%0A- Total faltante: *87* pts%0A- 2do Trimestre: *43.5* pts%0A- 3er Trimestre: *43.5* pts%0A%0A¡El esfuerzo transforma *" + materia + "*! Esos *43.5* pts por trimestre son posibles con:%0A• 2h diarias de estudio%0A• Grupo de apoyo%0A• Corrección de errores%0A¡Persiste! ⏳";
        } else if (puntosFaltantes == 88) {
            mensaje = "📊 *Plan de recuperación:*%0A- Total faltante: *88* pts%0A- 2do Trimestre: *44* pts%0A- 3er Trimestre: *44* pts%0A%0A¡No es fácil pero vale la pena en *" + materia + "*! *44* pts por trimestre requieren:%0A- Sacrificar distracciones%0A- Pedir ayuda a tiempo%0A- Celebrar pequeños logros%0A¡Tú puedes! 💪";
        } else if (puntosFaltantes == 89) {
            mensaje = "📊 *Plan de recuperación:*%0A- Total faltante: *89* pts%0A- 2do Trimestre: *44.5* pts%0A- 3er Trimestre: *44.5* pts%0A%0A¡Constancia rompe barreras en *" + materia + "*! Para *44.5* pts por trimestre:%0A1. Diagnóstico de fallas%0A2. Plan semanal%0A3. Revisiones mensuales%0A¡No abandones! 🏋️";
        } else if (puntosFaltantes == 90) {
            mensaje = "📊 *Plan de recuperación:*%0A- Total faltante: *90* pts%0A- 2do Trimestre: *45* pts%0A- 3er Trimestre: *45* pts%0A%0A¡90 puntos = ¡30 por mes en *" + materia + "*! Desglose:%0A• 15 pts: Evaluaciones%0A• 10 pts: Tareas%0A• 5 pts: Participación%0A¡Organización es poder! ✨";
        } else if (puntosFaltantes == 91) {
            mensaje = "📊 *Plan de recuperación:*%0A- Total faltante: *91* pts%0A- 2do Trimestre: *45.5* pts%0A- 3er Trimestre: *45.5* pts%0A%0A¡Actitud > Números en *" + materia + "*! Esos *45.5* pts por trimestre requieren:%0A- Enfoque en progreso%0A- Aprendizaje activo%0A- Mentalidad de crecimiento%0A¡Tú mandas! 🧠";
        } else if (puntosFaltantes == 92) {
            mensaje = "📊 *Plan de recuperación:*%0A- Total faltante: *92* pts%0A- 2do Trimestre: *46* pts%0A- 3er Trimestre: *46* pts%0A%0A¡Haz que cada día cuente en *" + materia + "*! *46* pts por trimestre son:%0A• 1.5 pts/día de clase%0A• +3 pts/semana extras%0A• +5 pts/proyecto%0A¡Súmale! 🎯";
        } else if (puntosFaltantes == 93) {
            mensaje = "📊 *Plan de recuperación:*%0A- Total faltante: *93* pts%0A- 2do Trimestre: *46.5* pts%0A- 3er Trimestre: *46.5* pts%0A%0A¡Invierte en tu futuro con *" + materia + "*! Esos *46.5* pts por trimestre son posibles con:%0A✓ Tutorías 2x/semana%0A✓ Exámenes simulacro%0A✓ Portafolio de avances%0A¡Construye tu éxito! 🏗️";
        } else if (puntosFaltantes == 94) {
            mensaje = "📊 *Plan de recuperación:*%0A- Total faltante: *94* pts%0A- 2do Trimestre: *47* pts%0A- 3er Trimestre: *47* pts%0A%0A¡Momento de reinvención en *" + materia + "*! *47* pts por trimestre requieren:%0A- Nuevos métodos de estudio%0A- Horario estricto%0A- Autoevaluación%0A¡Los límites los pones tú! 💥";
        } else if (puntosFaltantes == 95) {
            mensaje = "📊 *Plan de recuperación:*%0A- Total faltante: *95* pts%0A- 2do Trimestre: *47.5* pts%0A- 3er Trimestre: *47.5* pts%0A%0A¡Excelencia es hábito en *" + materia + "*! Para *47.5* pts por trimestre:%0A1. Calidad > Cantidad%0A2. Feedback constante%0A3. Mejora continua%0A¡Hazlo bien desde el inicio! ✨";
        } else if (puntosFaltantes == 96) {
            mensaje = "📊 *Plan de recuperación:*%0A- Total faltante: *96* pts%0A- 2do Trimestre: *48* pts%0A- 3er Trimestre: *48* pts%0A%0A¡No esperes a mañana con *" + materia + "*! *48* pts por trimestre son:%0A• 24 pts: Exámenes%0A• 16 pts: Proyectos%0A• 8 pts: Extras%0A¡Actúa hoy! ⚡";
        } else if (puntosFaltantes == 97) {
            mensaje = "📊 *Plan de recuperación:*%0A- Total faltante: *97* pts%0A- 2do Trimestre: *48.5* pts%0A- 3er Trimestre: *48.5* pts%0A%0A¡Supera tus propios límites en *" + materia + "*! Esos *48.5* pts por trimestre requieren:%0A- Autodisciplina%0A- Resiliencia%0A- Mentalidad estratégica%0A¡Eres tu mayor competencia! 🏆";
        } else if (puntosFaltantes == 98) {
            mensaje = "📊 *Plan de recuperación:*%0A- Total faltante: *98* pts%0A- 2do Trimestre: *49* pts%0A- 3er Trimestre: *49* pts%0A%0A¡98 puntos = Tu oportunidad en *" + materia + "*! Desglose:%0A1. 60% exámenes%0A2. 30% trabajos%0A3. 10% participación%0A¡Acepta el desafío! 💪";
        } else if (puntosFaltantes == 99) {
            mensaje = "📊 *Plan de recuperación:*%0A- Total faltante: *99* pts%0A- 2do Trimestre: *49.5* pts%0A- 3er Trimestre: *49.5* pts%0A%0A¡El último esfuerzo cuenta en *" + materia + "*! *49.5* pts por trimestre requieren:%0A• Máxima dedicación%0A• Apoyo académico%0A• Autocuidado%0A¡No pierdas de vista la meta! 🏁";
        } else if (puntosFaltantes == 100) {
            mensaje = "📊 *Plan de recuperación:*%0A- Total faltante: *100* pts%0A- 2do Trimestre: *50* pts%0A- 3er Trimestre: *50* pts%0A%0A¡100 puntos = Tu prueba de fuego en *" + materia + "*! Estrategia:%0A- 60 pts: Evaluaciones clave%0A- 30 pts: Proyectos%0A- 10 pts: Extras%0A¡Demuestra tu capacidad! 🌟";
        }

        else if (puntosFaltantes == 101) {
            mensaje = "📉 *Situación crítica - Plan especial*%0A- Total faltante: *101* pts%0A- 2do Trimestre: *50.5* pts%0A- 3er Trimestre: *50.5* pts%0A%0A¡Acción inmediata requerida!%0A1️⃣ Reunión URGENTE con el profesor%0A2️⃣ Solicitar proyectos de recuperación%0A3️⃣ Considerar tutorías diarias%0A%0A⚠️ Importante: Esto no define tu capacidad, solo requiere un plan distinto";
        } else if (puntosFaltantes == 102) {
            mensaje = "🔄 *Reinicio estratégico*%0A- Total faltante: *102* pts%0A- Por trimestre: *51* pts%0A%0A¡Opciones realistas:%0A• Validar conocimientos por experiencia%0A• Examen global diferenciado%0A• Programa de nivelación acelerada%0A%0A💡 El éxito tiene muchos caminos";
        } else if (puntosFaltantes == 103) {
            mensaje = "🧭 *Ruta alternativa*%0A- Total faltante: *103* pts%0A- 2do Trim: *51.5* pts%0A- 3er Trim: *51.5* pts%0A%0A¡Enfócate en:%0A✅ Competencias básicas%0A✅ Proyectos prácticos%0A✅ Autoevaluación semanal%0A%0A✨ Pequeños logros llevan a grandes resultados";
        } else if (puntosFaltantes == 104) {
            mensaje = "⚡ *Plan de choque*%0A- Total faltante: *104* pts%0A- Por trimestre: *52* pts%0A%0A¡Requiere:%0A▸ 2 horas diarias de estudio%0A▸ Asesorías 3x/semana%0A▸ Entregar TODO a tiempo%0A%0A🔥 15 minutos extra al día marcan la diferencia";
        } else if (puntosFaltantes == 105) {
            mensaje = "📌 *Puntos de rescate*%0A- Total faltante: *105* pts%0A- 2do Trim: *52.5* pts%0A- 3er Trim: *52.5* pts%0A%0A¡Cómo sumar puntos:%0A• +20 pts: Examen remedial%0A• +15 pts: Trabajo investigativo%0A• +10 pts: Asistencia perfecta%0A%0A🎯 Enfócate en lo recuperable";
        } else if (puntosFaltantes == 106) {
            mensaje = "🛠️ *Reconstrucción académica*%0A- Total faltante: *106* pts%0A- Por trimestre: *53* pts%0A%0A¡Pasos clave:%0A1. Diagnosticar fallas específicas%0A2. Crear cronograma semanal%0A3. Buscar mentor%0A%0A💎 Las crisis son oportunidades disfrazadas";
        } else if (puntosFaltantes == 107) {
            mensaje = "🚨 *Alerta máxima - Plan B*%0A- Total faltante: *107* pts%0A- 2do Trim: *53.5* pts%0A- 3er Trim: *53.5* pts%0A%0A¡Opciones:%0A▶ Curso intensivo vacacional%0A▶ Validar conocimientos previos%0A▶ Educación por proyectos%0A%0A🌱 A veces hay que dar un paso atrás para avanzar";
        } else if (puntosFaltantes == 108) {
            mensaje = "🧩 *Aprendizaje modular*%0A- Total faltante: *108* pts%0A- Por trimestre: *54* pts%0A%0A¡Estrategia:%0A• Dominar unidades clave primero%0A• Acumular créditos parciales%0A• Priorizar calidad sobre cantidad%0A%0A⚖️ Equilibra esfuerzo con resultados";
        } else if (puntosFaltantes == 109) {
            mensaje = "🎢 *Recorrido adaptado*%0A- Total faltante: *109* pts%0A- 2do Trim: *54.5* pts%0A- 3er Trim: *54.5* pts%0A%0A¡Enfoque innovador:%0A✓ Aprendizaje basado en problemas%0A✓ Evaluación por portafolio%0A✓ Mentorías personalizadas%0A%0A🚀 La creatividad abre nuevos caminos";
        } else if (puntosFaltantes == 110) {
            mensaje = "⚖️ *Balance realista*%0A- Total faltante: *110* pts%0A- Por trimestre: *55* pts%0A%0A¡Desglose posible:%0A• 60% exámenes principales%0A• 30% trabajos prácticos%0A• 10% participación%0A%0A💡 Enfócate en lo esencial";
        } else if (puntosFaltantes == 111) {
            mensaje = "🏗️ *Cimientos nuevos*%0A- Total faltante: *111* pts%0A- 2do Trim: *55.5* pts%0A- 3er Trim: *55.5* pts%0A%0A¡Recomendaciones:%0A• Clases particulares 2x/semana%0A• Grupos de estudio%0A• Refuerzo en vacaciones%0A%0A🌻 Planta semillas para el futuro";
        } else if (puntosFaltantes == 112) {
            mensaje = "📈 *Progreso escalonado*%0A- Total faltante: *112* pts%0A- Por trimestre: *56* pts%0A%0A¡Metas mensuales:%0A- Mes 1: Bases sólidas (15pts)%0A- Mes 2: Aplicación (20pts)%0A- Mes 3: Consolidación (21pts)%0A%0A🐢 Despacio pero sin pausa";
        } else if (puntosFaltantes == 113) {
            mensaje = "🧠 *Cambio de mentalidad*%0A- Total faltante: *113* pts%0A- 2do Trim: *56.5* pts%0A- 3er Trim: *56.5* pts%0A%0A¡Nuevo enfoque:%0A• Aprender vs Aprobar%0A• Proceso vs Resultado%0A• Resiliencia académica%0A%0A🌟 El crecimiento personal vale más que cualquier nota";
        } else if (puntosFaltantes == 114) {
            mensaje = "🛡️ *Modo resistencia*%0A- Total faltante: *114* pts%0A- Por trimestre: *57* pts%0A%0A¡Kit de supervivencia:%0A✚ Banco de recursos%0A✚ Grupo de apoyo%0A✚ Registro de micro-logros%0A%0A⚡ Pequeñas victorias llevan al éxito";
        } else if (puntosFaltantes == 115) {
            mensaje = "🎯 *Disparando a metas*%0A- Total faltante: *115* pts%0A- 2do Trim: *57.5* pts%0A- 3er Trim: *57.5* pts%0A%0A¡Estrategia de precisión:%0A• 40pts evaluaciones clave%0A• 12pts trabajos destacados%0A• 5.5pts extras%0A%0A🏹 Enfócate y dispara";
        } else if (puntosFaltantes == 116) {
            mensaje = "🚂 *Tren del progreso*%0A- Total faltante: *116* pts%0A- Por trimestre: *58* pts%0A%0A¡Estaciones de recuperación:%0A1. Diagnóstico (semana 1)%0A2. Ataque a debilidades (4 semanas)%0A3. Consolidación (2 semanas)%0A%0A📍 Sigue el recorrido";
        } else if (puntosFaltantes == 117) {
            mensaje = "🧗 *Escalando el reto*%0A- Total faltante: *117* pts%0A- 2do Trim: *58.5* pts%0A- 3er Trim: *58.5* pts%0A%0A¡Equipo necesario:%0A• Guía (profesor/tutor)%0A• Material (apuntes/resources)%0A• Fuerza mental (actitud)%0A%0A⛰️ La vista desde la cima valdrá la pena";
        } else if (puntosFaltantes == 118) {
            mensaje = "🧮 *Matemática de recuperación*%0A- Total faltante: *118* pts%0A- Por trimestre: *59* pts%0A%0A¡Sumando puntos:%0A+30pts Examen extraordinario%0A+15pts Proyecto comunitario%0A+10pts Presentación especial%0A%0A➕ Todo suma cuando te esfuerzas";
        } else if (puntosFaltantes == 119) {
            mensaje = "⚙️ *Ajuste de última hora*%0A- Total faltante: *119* pts%0A- 2do Trim: *59.5* pts%0A- 3er Trim: *59.5* pts%0A%0A¡Plan emergente:%0A• Priorizar 3 temas clave%0A• Maximizar trabajos prácticos%0A• Buscar puntos por actitud%0A%0A🛠️ Convierte lo imposible en reto";
        } else if (puntosFaltantes == 120) {
            mensaje = "📚 *Aprendizaje acelerado*%0A- Total faltante: *120* pts%0A- Por trimestre: *60* pts%0A%0A¡Método recomendado:%0A1. Técnica Pomodoro (25min estudio)%0A2. Mapas mentales%0A3. Enseñar lo aprendido%0A%0A🧠 Convierte la presión en tu aliada";
        } else if (puntosFaltantes == 121) {
            mensaje = "🔄 *Reinicio total*%0A- Total faltante: *121* pts%0A- 2do Trim: *60.5* pts%0A- 3er Trim: *60.5* pts%0A%0A¡Oportunidad para:%0A• Construir bases sólidas%0A• Adquirir nuevos hábitos%0A• Demostrar resiliencia%0A%0A🌱 Los grandes árboles empezaron pequeños";
        } else if (puntosFaltantes == 122) {
            mensaje = "🏗️ *Reestructuración académica*%0A- Total faltante: *122* pts%0A- Por trimestre: *61* pts%0A%0A¡Nuevos cimientos:%0A▸ Diagnóstico de estilos de aprendizaje%0A▸ Horario de estudio realista%0A▸ Sistema de recompensas%0A%0A⚡ Transforma el fracaso en combustible";
        } else if (puntosFaltantes == 123) {
            mensaje = "🧭 *Navegando aguas difíciles*%0A- Total faltante: *123* pts%0A- 2do Trim: *61.5* pts%0A- 3er Trim: *61.5* pts%0A%0A¡Bitácora de viaje:%0A• Semana 1-4: Bases teóricas%0A• Semana 5-8: Práctica guiada%0A• Semana 9-12: Consolidación%0A%0A⛵ Aprendizaje para la vida";
        } else if (puntosFaltantes == 124) {
            mensaje = "⚔️ *Batalla académica*%0A- Total faltante: *124* pts%0A- Por trimestre: *62* pts%0A%0A¡Armamento necesario:%0A✏️ Técnicas de estudio probadas%0A🛡️ Grupo de apoyo%0A💊 Dosis diaria de motivación%0A%0A🏆 La victoria será más dulce";
        } else if (puntosFaltantes == 125) {
            mensaje = "🌅 *Nuevo amanecer*%0A- Total faltante: *125* pts%0A- 2do Trim: *62.5* pts%0A- 3er Trim: *62.5* pts%0A%0A¡Enfoque renovado:%0A• Aprendizaje significativo%0A• Progreso sobre perfección%0A• Mentalidad de crecimiento%0A%0A✨ Cada día es una nueva oportunidad";
        }

        else if (puntosFaltantes == 126) {
            mensaje = "📌 *Plan de rescate académico*%0A- Total faltante: *126* pts%0A- 2do Trimestre: *63* pts%0A- 3er Trimestre: *63* pts%0A%0A¡Acciones clave:%0A1. Reunión urgente con coordinador%0A2. Priorizar unidades recuperables%0A3. Solicitar evaluación por proyectos%0A%0A⚠️ Requerirá esfuerzo extraordinario pero hay caminos";
        } else if (puntosFaltantes == 127) {
            mensaje = "🛠️ *Reingeniería educativa*%0A- Total faltante: *127* pts%0A- Por trimestre: *63.5* pts%0A%0A¡Nuevo enfoque:%0A• Aprendizaje basado en competencias%0A• Validación de conocimientos prácticos%0A• Portafolio de evidencias%0A%0A🔧 Reconstruye tu método desde cero";
        } else if (puntosFaltantes == 128) {
            mensaje = "⚡ *Choque de realidad - Plan alternativo*%0A- Total faltante: *128* pts%0A- 2do Trim: *64* pts%0A- 3er Trim: *64* pts%0A%0A¡Opciones viables:%0A▸ Curso remedial completo%0A▸ Educación dual (teoría + práctica)%0A▸ Examen global extraordinario%0A%0A🌱 A veces hay que retroceder para avanzar mejor";
        } else if (puntosFaltantes == 129) {
            mensaje = "🧩 *Rompecabezas de recuperación*%0A- Total faltante: *129* pts%0A- Por trimestre: *64.5* pts%0A%0A¡Armando la solución:%0A• 40pts: Evaluaciones clave%0A• 20pts: Trabajos acumulativos%0A• 4.5pts: Participación%0A%0A🔍 Enfócate en las piezas recuperables";
        } else if (puntosFaltantes == 130) {
            mensaje = "🚂 *Tren de rescate académico*%0A- Total faltante: *130* pts%0A- 2do Trim: *65* pts%0A- 3er Trim: *65* pts%0A%0A¡Estaciones obligatorias:%0A1. Diagnóstico profundo (1 semana)%0A2. Nivelación intensiva (4 semanas)%0A3. Evaluación diferenciada%0A%0A🎫 Tu pasaje al éxito requiere este viaje";
        } else if (puntosFaltantes == 131) {
            mensaje = "🏗️ *Cimientos emergentes*%0A- Total faltante: *131* pts%0A- Por trimestre: *65.5* pts%0A%0A¡Reconstruyendo bases:%0A✓ Clases personalizadas 3x/semana%0A✓ Banco de ejercicios resueltos%0A✓ Autoevaluación diaria%0A%0A🧱 Un ladrillo cada día construye tu futuro";
        } else if (puntosFaltantes == 132) {
            mensaje = "⚖️ *Balance crítico*%0A- Total faltante: *132* pts%0A- 2do Trim: *66* pts%0A- 3er Trim: *66* pts%0A%0A¡Distribución estratégica:%0A• 70% evaluaciones principales%0A• 20% proyectos especiales%0A• 10% actividades complementarias%0A%0A📊 Enfócate donde haya mayor retorno";
        } else if (puntosFaltantes == 133) {
            mensaje = "🌪️ *Tormenta perfecta - Guía de supervivencia*%0A- Total faltante: *133* pts%0A- Por trimestre: *66.5* pts%0A%0A¡Kit de emergencia:%0A1. Tutorías diarias%0A2. Grupo de apoyo%0A3. Micro-metas semanales%0A%0A⚡ Esta tempestad forjará tu carácter";
        } else if (puntosFaltantes == 134) {
            mensaje = "🔄 *Reinicio completo*%0A- Total faltante: *134* pts%0A- 2do Trim: *67* pts%0A- 3er Trim: *67* pts%0A%0A¡Oportunidad para:%0A• Adquirir hábitos de estudio reales%0A• Descubrir tu estilo de aprendizaje%0A• Construir resiliencia académica%0A%0A🌱 Las raíces fuertes producen frutos duraderos";
        } else if (puntosFaltantes == 135) {
            mensaje = "📉 *Punto de inflexión*%0A- Total faltante: *135* pts%0A- Por trimestre: *67.5* pts%0A%0A¡Decisiones importantes:%0A▶ Programa intensivo de verano%0A▶ Cambio de estrategia académica%0A▶ Enfoque por competencias%0A%0A🛣️ El camino menos transitado puede ser tu solución";
        } else if (puntosFaltantes == 136) {
            mensaje = "🧭 *Navegando en aguas desconocidas*%0A- Total faltante: *136* pts%0A- 2do Trim: *68* pts%0A- 3er Trim: *68* pts%0A%0A¡Brújula necesaria:%0A• Mapa de contenidos esenciales%0A• Bitácora de progreso%0A• Mentor experimentado%0A%0A⛵ Aprendizaje para la vida > Notas inmediatas";
        } else if (puntosFaltantes == 137) {
            mensaje = "⚒️ *Taller de emergencia académica*%0A- Total faltante: *137* pts%0A- Por trimestre: *68.5* pts%0A%0A¡Herramientas críticas:%0A1. Diagnóstico de fallas específicas%0A2. Plan de 90 días%0A3. Sistema de accountability%0A%0A🛠️ La reparación requiere tiempo y dedicación";
        } else if (puntosFaltantes == 138) {
            mensaje = "🎯 *Disparando a metas realistas*%0A- Total faltante: *138* pts%0A- 2do Trim: *69* pts%0A- 3er Trim: *69* pts%0A%0A¡Objetivos alcanzables:%0A• Dominar 3 temas fundamentales%0A• Mejorar notas existentes%0A• Maximizar trabajos prácticos%0A%0A🏹 Enfócate en blancos estratégicos";
        } else if (puntosFaltantes == 139) {
            mensaje = "🧗 *Escalando la montaña académica*%0A- Total faltante: *139* pts%0A- Por trimestre: *69.5* pts%0A%0A¡Equipo necesario:%0A• Guía especializado%0A• Kit de recursos%0A• Oxígeno motivacional%0A%0A⛰️ La cumbre parece lejana pero cada paso cuenta";
        } else if (puntosFaltantes == 140) {
            mensaje = "⚙️ *Mecanismo de recuperación*%0A- Total faltante: *140* pts%0A- 2do Trim: *70* pts%0A- 3er Trim: *70* pts%0A%0A¡Engranajes esenciales:%0A1. Motor: Horario estricto%0A2. Combustible: Técnicas de estudio%0A3. Lubricante: Descansos programados%0A%0A🔧 Máquina académica en marcha";
        } else if (puntosFaltantes == 141) {
            mensaje = "🌪️ *Tormenta perfecta - Plan de contingencia*%0A- Total faltante: *141* pts%0A- Por trimestre: *70.5* pts%0A%0A¡Refugios académicos:%0A• Proyectos interdisciplinarios%0A• Evaluaciones por demostración%0A• Aprendizaje servicio%0A%0A⚡ Transforma el caos en oportunidad";
        } else if (puntosFaltantes == 142) {
            mensaje = "🛑 *Pare, observe y actúe*%0A- Total faltante: *142* pts%0A- 2do Trim: *71* pts%0A- 3er Trim: *71* pts%0A%0A¡Análisis requerido:%0A1. Compatibilidad con estilo de aprendizaje%0A2. Necesidades educativas especiales%0A3. Estrategias alternativas%0A%0A🚦 El semáforo está en amarillo - precaución";
        } else if (puntosFaltantes == 143) {
            mensaje = "🧰 *Kit de último recurso*%0A- Total faltante: *143* pts%0A- Por trimestre: *71.5* pts%0A%0A¡Contenido esencial:%0A• Banco de exámenes pasados%0A• Guías de estudio condensadas%0A• Técnicas de memoria acelerada%0A%0A⚠️ Para emergencias académicas extremas";
        } else if (puntosFaltantes == 144) {
            mensaje = "📚 *Aprendizaje acelerado 2.0*%0A- Total faltante: *144* pts%0A- 2do Trim: *72* pts%0A- 3er Trim: *72* pts%0A%0A¡Técnicas comprobadas:%0A1. Estudio activo (enseñar a otros)%0A2. Mapas conceptuales%0A3. Repaso espaciado%0A%0A⏱️ Carrera contra el tiempo con estrategia";
        } else if (puntosFaltantes == 145) {
            mensaje = "⚓ *Ancla académica*%0A- Total faltante: *145* pts%0A- Por trimestre: *72.5* pts%0A%0A¡Puntos de anclaje:%0A• 1 tema fundamental/semana%0A• 3 ejercicios clave/día%0A• 1 autoevaluación/semana%0A%0A⛵ Estabilidad en aguas turbulentas";
        } else if (puntosFaltantes == 146) {
            mensaje = "🧮 *Matemática de emergencia*%0A- Total faltante: *146* pts%0A- 2do Trim: *73* pts%0A- 3er Trim: *73* pts%0A%0A¡Ecuación de rescate:%0A(40pts exámenes) + (30pts proyectos) + (20pts extras) + (56pts actitud)%0A%0A➕ En situaciones difíciles, todo suma";
        } else if (puntosFaltantes == 147) {
            mensaje = "🏗️ *Andamios académicos*%0A- Total faltante: *147* pts%0A- Por trimestre: *73.5* pts%0A%0A¡Estructura temporal:%0A• Tutorías 4x/semana%0A• Grupos de estudio%0A• Simulacros de evaluación%0A%0A🛠️ Soporte temporal para construcción permanente";
        } else if (puntosFaltantes == 148) {
            mensaje = "🚧 *Zona de reconstrucción*%0A- Total faltante: *148* pts%0A- 2do Trim: *74* pts%0A- 3er Trim: *74* pts%0A%0A¡Proceso en marcha:%0A1. Demolición (malos hábitos)%0A2. Cimientos (bases sólidas)%0A3. Nueva estructura (métodos efectivos)%0A%0A🏗️ Edifica sobre experiencia, no sobre errores";
        } else if (puntosFaltantes == 149) {
            mensaje = "⚗️ *Fórmula química académica*%0A- Total faltante: *149* pts%0A- Por trimestre: *74.5* pts%0A%0A¡Componentes esenciales:%0A• 30% conocimiento teórico%0A• 40% aplicación práctica%0A• 30% actitud resiliente%0A%0A🧪 La mezcla perfecta para superar retos";
        } else if (puntosFaltantes == 150) {
            mensaje = "🎢 *Montaña rusa académica*%0A- Total faltante: *150* pts%0A- 2do Trim: *75* pts%0A- 3er Trim: *75* pts%0A%0A¡Instrucciones de seguridad:%0A1. Abróchate el cinturón (disciplina)%0A2. Mantén las manos dentro (enfoque)%0A3. Grita si es necesario (pide ayuda)%0A%0A🎢 El viaje vale la pena, ¡aguanta!";
        } else if (puntosFaltantes == 151) {
            mensaje = "🌋 *Erupción académica - Plan de evacuación*%0A- Total faltante: *151* pts%0A- Por trimestre: *75.5* pts%0A%0A¡Rutas de escape:%0A→ Evaluación por competencias%0A→ Proyecto integrador anual%0A→ Examen global extraordinario%0A%0A⚠️ A veces reiniciar es la mejor solución";
        } else if (puntosFaltantes == 152) {
            mensaje = "🧭 *Última brújula académica*%0A- Total faltante: *152* pts%0A- 2do Trim: *76* pts%0A- 3er Trim: *76* pts%0A%0A¡Coordenadas clave:%0A• Norte: Enfoque en lo esencial%0A• Sur: Apoyo emocional%0A• Este: Recursos alternativos%0A• Oeste: Autoconocimiento%0A%0A📍 Encuentra tu verdadero norte";
        } else if (puntosFaltantes == 153) {
            mensaje = "🛑 *Límite máximo - Reevaluación necesaria*%0A- Total faltante: *153* pts%0A- Por trimestre: *76.5* pts%0A%0A¡Opciones realistas:%0A1. Año remedial con ventajas%0A2. Educación por proyectos%0A3. Cambio de enfoque académico%0A%0A💡 Recuerda: Hay muchos caminos hacia el éxito";
        }

        
        else if (puntosFaltantes > 153) {
            mensaje = "⚠️ *Reevaluación académica necesaria*%0AEn *" + materia + "*%0A*" + puntosFaltantes + "* pts faltantes%0A%0A🔍 *Análisis requerido:*%0A1. Compatibilidad con tu estilo de aprendizaje%0A2. Necesidades educativas especiales%0A3. Estrategias alternativas de acreditación%0A%0A💡 *Recordatorio importante:*%0AEl éxito educativo tiene múltiples caminos%0A¡Este es solo un punto en tu trayectoria!";
        }

        texto = "%0A%0A🚀 *¿Necesita ayuda escolar?*%0AOfrecemos clases de a medida según tu necesidad para estudiantes de primaria, secundaria y nivel universitario.%0A📚 Según tu necesidad, prácticos, exámenes, Exposiciones, o simplemente nivelación.%0A📲 Contáctenos: wa.me/59171324941";

    
    var url = "https://api.whatsapp.com/send?phone=591" + telefono + "&text=" + mensaje+ texto;

    // Abrir la URL en una nueva pestaña
    window.open(url, '_blank');
}

});


