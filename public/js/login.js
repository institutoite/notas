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
            mensaje = "¡Estás a solo *1* punto de aprobar %0A*" + materia + "*!%0ACon solo *0.5* pts en cada trimestre restante%0A¡Tienes esto en el bolsillo! 🎯";
        } else if (puntosFaltantes == 2) {
            mensaje = "¡Respira tranquilo! En %0A*" + materia + "*%0A solo faltan *2* puntos.%0A¡Solo necesitas *1* pt por trimestre!%0A¡Es tu victoria más fácil! ✌️";
        } else if (puntosFaltantes == 3) {
            mensaje = "¡3 puntos son solo detalles! En %0A*" + materia + "*%0A necesitas *1.5* pts por trimestre.%0A¡Hasta un trabajo mínimo te llevará al éxito! 💫";
        } else if (puntosFaltantes == 4) {
            mensaje = "¡4 puntos = ¡Solo 2 por periodo!%0AEn *" + materia + "*%0Aestás a un paso.%0A¡Hasta la tarea básica suma lo que necesitas! 📚";
        } else if (puntosFaltantes == 5) {
            mensaje = "¡Redondea tu esfuerzo! En %0A*" + materia + "*%0A faltan *5* pts.%0A(*2.5* por trimestre)%0A¡Un pequeño extra y listo! ✅";
        } else if (puntosFaltantes == 6) {
            mensaje = "¡6 puntos = ¡3 por etapa!%0AEn *" + materia + "*%0Aes menos que una nota de participación.%0A¡Esto ya está resuelto! 😎";
        } else if (puntosFaltantes == 7) {
            mensaje = "¡7 puntos son tu colchón de seguridad!%0AEn *" + materia + "*%0A(*3.5* pts/trimestre)%0A¡Hasta puedes permitirte algún error! 🔄";
        } else if (puntosFaltantes == 8) {
            mensaje = "¡8 puntos = ¡Solo 4 por periodo!%0AEn *" + materia + "*%0A¡Es menos del 5% del total!%0A¡Un esfuerzo mínimo te llevará allí! 📊";
        } else if (puntosFaltantes == 9) {
            mensaje = "¡9 puntos son tu margen de victoria!%0AEn *" + materia + "*%0A(*4.5* pts/trimestre)%0A¡Hasta los trabajos opcionales suman esto! ✨";
        } else if (puntosFaltantes == 10) {
            mensaje = "¡10 puntos = ¡5 por etapa!%0AEn *" + materia + "*%0A¡Es lo que ganas por asistir regularmente!%0A¡Ya tienes esto garantizado! 🏆";
        } else if (puntosFaltantes == 11) {
            mensaje = "¡11 puntos son tu seguro académico!%0AEn *" + materia + "*%0A(*5.5* pts/trimestre)%0A¡Menos que una sola tarea bien hecha! 📝";
        } else if (puntosFaltantes == 12) {
            mensaje = "¡12 puntos = ¡Solo 6 por periodo!%0AEn *" + materia + "*%0A¡Es tu boleto garantizado al aprobado!%0A¡Relájate y sigue así! 😌";
        } else if (puntosFaltantes == 13) {
            mensaje = "¡13 puntos de tranquilidad!%0AEn *" + materia + "*%0A(*6.5* pts/trimestre)%0A¡Hasta el proyecto más simple cubre esto! 🛠️";
        } else if (puntosFaltantes == 14) {
            mensaje = "¡14 puntos = ¡7 por etapa!%0AEn *" + materia + "*%0A¡Menos que una sola evaluación decente!%0A¡Ya estás del otro lado! 🌈";
        } else if (puntosFaltantes == 15) {
            mensaje = "¡15 puntos son tu zona segura!%0AEn *" + materia + "*%0A(*7.5* pts/trimestre)%0A¡Es lo que ganas por participar activamente! 🗣️";
        } else if (puntosFaltantes == 16) {
            mensaje = "¡16 puntos = ¡Solo 8 por periodo!%0AEn *" + materia + "*%0A¡Una sola actividad especial te da esto!%0A¡Camino seguro al éxito! 🛣️";
        } else if (puntosFaltantes == 17) {
            mensaje = "¡17 puntos de ventaja!%0AEn *" + materia + "*%0A(*8.5* pts/trimestre)%0A¡Cualquier esfuerzo adicional te sobrará! 🚀";
        } else if (puntosFaltantes == 18) {
            mensaje = "¡18 puntos = ¡9 por etapa!%0AEn *" + materia + "*%0A¡Es menos del 10% del total!%0A¡Tu aprobado está casi asegurado! 🔒";
        } else if (puntosFaltantes == 19) {
            mensaje = "¡19 puntos son tu colchón!%0AEn *" + materia + "*%0A(*9.5* pts/trimestre)%0A¡Solo necesitas mantener el ritmo actual! 🎵";
        } else if (puntosFaltantes == 20) {
            mensaje = "¡20 puntos = ¡Solo 10 por periodo!%0AEn *" + materia + "*%0A¡Es lo que sacas por entregar todo a tiempo!%0A¡Felicidades por tu organización! ⏰";
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
            mensaje = "¡No es tarde! En: %0A*" + materia + "*%0A te faltan %0A*41* puntos para aprobar.%0APara lograrlo necesitas:%0A- 2do Trimestre: *20.5* pts%0A- 3er Trimestre: *20.5* pts%0A¡Tú puedes superar este reto!";
        } else if (puntosFaltantes == 42) {
            mensaje = "¡Da el primer paso! En: %0A*" + materia + "*%0A te faltan %0A*42* puntos.%0AMeta por trimestre:%0A- 2do: *21* pts%0A- 3ro: *21* pts%0A¡Cada esfuerzo cuenta!";
        } else if (puntosFaltantes == 43) {
            mensaje = "¡Sigue tu camino! En: %0A*" + materia + "*%0A te faltan %0A*43* puntos.%0ADistribución ideal:%0A- 2do Trim: *21.5* pts%0A- 3er Trim: *21.5* pts%0A¡Persiste y lo lograrás!";
        } else if (puntosFaltantes == 44) {
            mensaje = "¡Con esfuerzo todo se puede! En: %0A*" + materia + "*%0A te faltan %0A*44* puntos.%0APara aprobar necesitas:%0A- 22 pts en cada trimestre%0A¡Supera tus límites!";
        } else if (puntosFaltantes == 45) {
            console.log("Entre al if del  45");
            mensaje = "¡Es momento de actuar! En: %0A*" + materia + "*%0A te faltan %0A*45* puntos.%0AMeta mínima:%0A- 2do Trim: *22.5* pts%0A- 3ro Trim: *22.5* pts%0A¡Demuestra de qué estás hecho!";
        } else if (puntosFaltantes == 46) {
            mensaje = "¡Nunca te rindas! En: %0A*" + materia + "*%0A te faltan %0A*46* puntos.%0APuntos necesarios:%0A- 23 en cada trimestre%0A¡Tu futuro lo vale!";
        } else if (puntosFaltantes == 47) {
            mensaje = "¡Avanza sin miedo! En: %0A*" + materia + "*%0A te faltan %0A*47* puntos.%0ADebes obtener:%0A- 2do Trim: *23.5* pts%0A- 3ro Trim: *23.5* pts%0A¡Eres más fuerte que cualquier obstáculo!";
        } else if (puntosFaltantes == 48) {
            mensaje = "¡Sigue adelante! En: %0A*" + materia + "*%0A te faltan %0A*48* puntos.%0AMeta por periodo:%0A- 24 pts en cada trimestre%0A¡El éxito está en tu constancia!";
        } else if (puntosFaltantes == 49) {
            mensaje = "¡No estás solo! En: %0A*" + materia + "*%0A te faltan %0A*49* puntos.%0ANecesitas:%0A- 2do Trim: *24.5* pts%0A- 3ro Trim: *24.5* pts%0A¡Pide ayuda si lo necesitas!";
        } else if (puntosFaltantes == 50) {
            mensaje = "¡Es posible mejorar! En: %0A*" + materia + "*%0A te faltan %0A*50* puntos.%0ADistribución:%0A- 25 pts por trimestre%0A¡Este es tu momento para brillar!";
        } else if (puntosFaltantes == 51) {
            mensaje = "¡No pierdas tiempo! En: %0A*" + materia + "*%0A te faltan %0A*51* puntos.%0APara lograrlo:%0A- 2do Trim: *25.5* pts%0A- 3ro Trim: *25.5* pts%0A¡Organízate y verás los resultados!";
        } else if (puntosFaltantes == 52) {
            mensaje = "¡Haz que valga! En: %0A*" + materia + "*%0A te faltan %0A*52* puntos.%0AMeta mínima:%0A- 26 pts cada trimestre%0A¡Cada punto cuenta, esfuerzate un poco más!";
        } else if (puntosFaltantes == 53) {
            mensaje = "¡Todo gran logro requiere esfuerzo! En: %0A*" + materia + "*%0A te faltan %0A*53* puntos.%0ADebes obtener:%0A- 2do Trim: *26.5* pts%0A- 3ro Trim: *26.5* pts%0A¡Vale la pena el sacrificio!";
        } else if (puntosFaltantes == 54) {
            mensaje = "¡Paso a paso se llega! En: %0A*" + materia + "*%0A te faltan %0A*54* puntos.%0ANecesitas:%0A- 27 pts por trimestre%0A¡No subestimes tu potencial!";
        } else if (puntosFaltantes == 55) {
            mensaje = "¡Tú tienes el poder! En: %0A*" + materia + "*%0A te faltan %0A*55* puntos.%0APara aprobar:%0A- 2do Trim: *27.5* pts%0A- 3ro Trim: *27.5* pts%0A¡Confía en tu capacidad!";
        } else if (puntosFaltantes == 56) {
            mensaje = "¡Enfócate y avanza! En: %0A*" + materia + "*%0A te faltan %0A*56* puntos.%0AMeta por periodo:%0A- 28 pts cada trimestre%0A¡Aún estás a tiempo de cambiar tu historia!";
        } else if (puntosFaltantes == 57) {
            mensaje = "¡Hazlo por tu futuro! En: %0A*" + materia + "*%0A te faltan %0A*57* puntos.%0ADebes lograr:%0A- 2do Trim: *28.5* pts%0A- 3ro Trim: *28.5* pts%0A¡El conocimiento es tu mejor herramienta!";
        } else if (puntosFaltantes == 58) {
            mensaje = "¡Cada día cuenta! En: %0A*" + materia + "*%0A te faltan %0A*58* puntos.%0ANecesitas:%0A- 29 pts por trimestre%0A¡Pequeños esfuerzos llevan a grandes logros!";
        } else if (puntosFaltantes == 59) {
            mensaje = "¡La meta está cerca! En: %0A*" + materia + "*%0A te faltan %0A*59* puntos.%0APara lograrlo:%0A- 2do Trim: *29.5* pts%0A- 3ro Trim: *29.5* pts%0A¡Un último empujón!";
        } else if (puntosFaltantes == 60) {
            mensaje = "¡Todo comienza con una decisión! En: %0A*" + materia + "*%0A te faltan %0A*60* puntos.%0AMeta mínima:%0A- 30 pts cada trimestre%0A¡El cambio comienza hoy!";
        }


        else if (puntosFaltantes == 61) {
            mensaje = "¡No dejes que los números te desanimen! En: %0A*" + materia + "*%0A te faltan %0A*61* puntos.%0ADebes obtener:%0A- 2do Trimestre: *30.5* pts%0A- 3er Trimestre: *30.5* pts%0A¡Divide y vencerás!";
        } else if (puntosFaltantes == 62) {
            mensaje = "¡No te des por vencido! En: %0A*" + materia + "*%0A te faltan %0A*62* puntos.%0AMeta por periodo:%0A- 31 pts en cada trimestre%0A¡Sigue luchando, vale la pena!";
        } else if (puntosFaltantes == 63) {
            mensaje = "¡Siempre hay una salida! En: %0A*" + materia + "*%0A te faltan %0A*63* puntos.%0APara aprobar necesitas:%0A- 2do Trim: *31.5* pts%0A- 3ro Trim: *31.5* pts%0A¡Vamos con todo!";
        } else if (puntosFaltantes == 64) {
            mensaje = "¡Una meta difícil no es imposible! En: %0A*" + materia + "*%0A te faltan %0A*64* puntos.%0ADistribución ideal:%0A- 32 pts por trimestre%0A¡El esfuerzo supera al talento!";
        } else if (puntosFaltantes == 65) {
            mensaje = "¡Transforma tus dudas en acción! En: %0A*" + materia + "*%0A te faltan %0A*65* puntos.%0AMeta mínima:%0A- 2do Trim: *32.5* pts%0A- 3ro Trim: *32.5* pts%0A¡Cada punto cuenta!";
        } else if (puntosFaltantes == 66) {
            mensaje = "¡Nunca es tarde para intentarlo! En: %0A*" + materia + "*%0A te faltan %0A*66* puntos.%0ANecesitas:%0A- 33 pts cada trimestre%0A¡Hoy es el mejor día para comenzar!";
        } else if (puntosFaltantes == 67) {
            mensaje = "¡Levántate y comienza hoy! En: %0A*" + materia + "*%0A te faltan %0A*67* puntos.%0APara lograrlo:%0A- 2do Trim: *33.5* pts%0A- 3ro Trim: *33.5* pts%0A¡Pequeños pasos llevan a grandes logros!";
        } else if (puntosFaltantes == 68) {
            mensaje = "¡El esfuerzo de hoy será el orgullo de mañana! En: %0A*" + materia + "*%0A te faltan %0A*68* puntos.%0ADebes obtener:%0A- 34 pts por trimestre%0A¡Tu futuro yo te lo agradecerá!";
        } else if (puntosFaltantes == 69) {
            mensaje = "¡Actitud + trabajo = progreso! En: %0A*" + materia + "*%0A te faltan %0A*69* puntos.%0AMeta por periodo:%0A- 2do Trim: *34.5* pts%0A- 3ro Trim: *34.5* pts%0A¡La fórmula del éxito está en tus manos!";
        } else if (puntosFaltantes == 70) {
            mensaje = "¡Empieza con lo que tienes! En: %0A*" + materia + "*%0A te faltan %0A*70* puntos.%0APuntos necesarios:%0A- 35 en cada trimestre%0A¡No esperes condiciones perfectas!";
        } else if (puntosFaltantes == 71) {
            mensaje = "¡Hazlo por ti! En: %0A*" + materia + "*%0A te faltan %0A*71* puntos.%0ADistribución:%0A- 2do Trim: *35.5* pts%0A- 3ro Trim: *35.5* pts%0A¡Cree en tu capacidad, eres más fuerte de lo que piensas!";
        } else if (puntosFaltantes == 72) {
            mensaje = "¡La motivación te hará comenzar, el hábito te hará llegar! En: %0A*" + materia + "*%0A te faltan %0A*72* puntos.%0AMeta mínima:%0A- 36 pts por trimestre%0A¡La constancia es la clave!";
        } else if (puntosFaltantes == 73) {
            mensaje = "¡Los límites solo existen en tu mente! En: %0A*" + materia + "*%0A te faltan %0A*73* puntos.%0APara aprobar necesitas:%0A- 2do Trim: *36.5* pts%0A- 3ro Trim: *36.5* pts%0A¡Rompe tus barreras!";
        } else if (puntosFaltantes == 74) {
            mensaje = "¡Haz lo que puedas, con lo que tienes, donde estés! En: %0A*" + materia + "*%0A te faltan %0A*74* puntos.%0ADebes lograr:%0A- 37 pts cada trimestre%0A¡No subestimes tu potencial!";
        } else if (puntosFaltantes == 75) {
            mensaje = "¡Rinde al máximo, no al mínimo! En: %0A*" + materia + "*%0A te faltan %0A*75* puntos.%0AMeta por periodo:%0A- 2do Trim: *37.5* pts%0A- 3ro Trim: *37.5* pts%0A¡Aspira a superarte cada día!";
        } else if (puntosFaltantes == 76) {
            mensaje = "¡Un paso a la vez! En: %0A*" + materia + "*%0A te faltan %0A*76* puntos.%0ANecesitas:%0A- 38 pts por trimestre%0A¡Todo cuenta cuando perseveras!";
        } else if (puntosFaltantes == 77) {
            mensaje = "¡Hoy es un buen día para cambiar tu historia! En: %0A*" + materia + "*%0A te faltan %0A*77* puntos.%0APara lograrlo:%0A- 2do Trim: *38.5* pts%0A- 3ro Trim: *38.5* pts%0A¡El cambio comienza con una decisión!";
        } else if (puntosFaltantes == 78) {
            mensaje = "¡No estás solo en este camino! En: %0A*" + materia + "*%0A te faltan %0A*78* puntos.%0ADistribución ideal:%0A- 39 pts cada trimestre%0A¡Pide ayuda y sigue adelante!";
        } else if (puntosFaltantes == 79) {
            mensaje = "¡Los grandes logros toman tiempo! En: %0A*" + materia + "*%0A te faltan %0A*79* puntos.%0AMeta mínima:%0A- 2do Trim: *39.5* pts%0A- 3ro Trim: *39.5* pts%0A¡La paciencia es tu aliada!";
        } else if (puntosFaltantes == 80) {
            mensaje = "¡No dejes que el miedo te detenga! En: %0A*" + materia + "*%0A te faltan %0A*80* puntos.%0APuntos necesarios:%0A- 40 en cada trimestre%0A¡Enfrenta el reto con valentía!";
        }


        else if (puntosFaltantes == 81) {
            mensaje = "¡El camino es largo, pero no imposible! En: %0A*" + materia + "*%0A te faltan %0A*81* puntos.%0ADebes obtener:%0A- 2do Trimestre: *40.5* pts%0A- 3er Trimestre: *40.5* pts%0A¡Organízate y verás resultados!";
        } else if (puntosFaltantes == 82) {
            mensaje = "¡No te rindas antes de intentarlo! En: %0A*" + materia + "*%0A te faltan %0A*82* puntos.%0AMeta por periodo:%0A- 41 pts en cada trimestre%0A¡La disciplina vence al talento!";
        } else if (puntosFaltantes == 83) {
            mensaje = "¡Cada esfuerzo suma! En: %0A*" + materia + "*%0A te faltan %0A*83* puntos.%0APara aprobar necesitas:%0A- 2do Trim: *41.5* pts%0A- 3ro Trim: *41.5* pts%0A¡Hoy es el día para empezar!";
        } else if (puntosFaltantes == 84) {
            mensaje = "¡El éxito es la suma de pequeños esfuerzos! En: %0A*" + materia + "*%0A te faltan %0A*84* puntos.%0ADistribución ideal:%0A- 42 pts por trimestre%0A¡Persiste y lo lograrás!";
        } else if (puntosFaltantes == 85) {
            mensaje = "¡No mires el monte, mira el siguiente paso! En: %0A*" + materia + "*%0A te faltan %0A*85* puntos.%0AMeta mínima:%0A- 2do Trim: *42.5* pts%0A- 3ro Trim: *42.5* pts%0A¡Paso a paso llegarás lejos!";
        } else if (puntosFaltantes == 86) {
            mensaje = "¡Tú decides tu límite! En: %0A*" + materia + "*%0A te faltan %0A*86* puntos.%0ANecesitas:%0A- 43 pts cada trimestre%0A¡No dejes que los números te definan!";
        } else if (puntosFaltantes == 87) {
            mensaje = "¡El esfuerzo transforma lo difícil en posible! En: %0A*" + materia + "*%0A te faltan %0A*87* puntos.%0APara lograrlo:%0A- 2do Trim: *43.5* pts%0A- 3ro Trim: *43.5* pts%0A¡Tu actitud marca la diferencia!";
        } else if (puntosFaltantes == 88) {
            mensaje = "¡No es fácil, pero vale la pena! En: %0A*" + materia + "*%0A te faltan %0A*88* puntos.%0ADebes obtener:%0A- 44 pts por trimestre%0A¡El sacrificio hoy traerá recompensas mañana!";
        } else if (puntosFaltantes == 89) {
            mensaje = "¡La constancia rompe cualquier barrera! En: %0A*" + materia + "*%0A te faltan %0A*89* puntos.%0AMeta por periodo:%0A- 2do Trim: *44.5* pts%0A- 3ro Trim: *44.5* pts%0A¡No abandones ahora!";
        } else if (puntosFaltantes == 90) {
            mensaje = "¡90 puntos son solo 30 por mes! En: %0A*" + materia + "*%0A te faltan %0A*90* puntos.%0APuntos necesarios:%0A- 45 en cada trimestre%0A¡Divide el reto en metas pequeñas!";
        } else if (puntosFaltantes == 91) {
            mensaje = "¡Más que números, es tu actitud! En: %0A*" + materia + "*%0A te faltan %0A*91* puntos.%0ADistribución:%0A- 2do Trim: *45.5* pts%0A- 3ro Trim: *45.5* pts%0A¡Enfócate en progresar, no en la perfección!";
        } else if (puntosFaltantes == 92) {
            mensaje = "¡No cuentes los días, haz que los días cuenten! En: %0A*" + materia + "*%0A te faltan %0A*92* puntos.%0AMeta mínima:%0A- 46 pts por trimestre%0A¡Cada día de estudio suma!";
        } else if (puntosFaltantes == 93) {
            mensaje = "¡El conocimiento es tu mejor inversión! En: %0A*" + materia + "*%0A te faltan %0A*93* puntos.%0APara aprobar necesitas:%0A- 2do Trim: *46.5* pts%0A- 3ro Trim: *46.5* pts%0A¡Estás construyendo tu futuro!";
        } else if (puntosFaltantes == 94) {
            mensaje = "¡No es el momento de rendirse! En: %0A*" + materia + "*%0A te faltan %0A*94* puntos.%0ADebes lograr:%0A- 47 pts cada trimestre%0A¡Los momentos difíciles forjan carácter!";
        } else if (puntosFaltantes == 95) {
            mensaje = "¡La excelencia es un hábito! En: %0A*" + materia + "*%0A te faltan %0A*95* puntos.%0AMeta por periodo:%0A- 2do Trim: *47.5* pts%0A- 3ro Trim: *47.5* pts%0A¡Hazlo bien desde el principio!";
        } else if (puntosFaltantes == 96) {
            mensaje = "¡No esperes a mañana! En: %0A*" + materia + "*%0A te faltan %0A*96* puntos.%0ANecesitas:%0A- 48 pts por trimestre%0A¡El tiempo pasa, actúa hoy!";
        } else if (puntosFaltantes == 97) {
            mensaje = "¡Tu mayor competencia eres tú mismo! En: %0A*" + materia + "*%0A te faltan %0A*97* puntos.%0APara lograrlo:%0A- 2do Trim: *48.5* pts%0A- 3ro Trim: *48.5* pts%0A¡Supera tus propios límites!";
        } else if (puntosFaltantes == 98) {
            mensaje = "¡98 puntos son tu próximo reto! En: %0A*" + materia + "*%0A te faltan %0A*98* puntos.%0ADistribución ideal:%0A- 49 pts cada trimestre%0A¡Acepta el desafío con valentía!";
        } else if (puntosFaltantes == 99) {
            mensaje = "¡El último esfuerzo es el que cuenta! En: %0A*" + materia + "*%0A te faltan %0A*99* puntos.%0AMeta mínima:%0A- 2do Trim: *49.5* pts%0A- 3ro Trim: *49.5* pts%0A¡No pierdas de vista la meta!";
        } else if (puntosFaltantes == 100) {
            mensaje = "¡100 puntos son tu oportunidad para brillar! En: %0A*" + materia + "*%0A te faltan %0A*100* puntos.%0APuntos necesarios:%0A- 50 en cada trimestre%0A¡Demuestra de qué estás hecho!";
        }

        else if (puntosFaltantes == 101) {
            mensaje = "¡Reto máximo activado! En %0A*" + materia + "*%0A necesitas *101* pts extras.%0A• 2do Trim: *50.5* pts%0A• 3er Trim: *50.5* pts%0A¡Requiere planificación, pero hay caminos! 🗺️%0A%0AConsejo: Enfócate en trabajos prácticos y participación activa para sumar puntos extras.";
        } else if (puntosFaltantes == 102) {
            mensaje = "¡Modo recuperación! En %0A*" + materia + "*%0A faltan *102* puntos.%0A• Meta/trimestre: *51* pts%0A%0A¡Habla con tu profesor sobre:%0A- Proyectos extras%0A- Revisión de evaluaciones%0A- Puntos por mejora continua%0A%0A¡Todo es negociable! ✍️";
        } else if (puntosFaltantes == 103) {
            mensaje = "¡Plan de acción necesario! En %0A*" + materia + "*%0A%0A*103* pts por recuperar.%0A• 2do Trim: *51.5* pts%0A• 3ro Trim: *51.5* pts%0A%0AEstrategias:%0A1. Prioriza esta materia%0A2. Asiste a clases de refuerzo%0A3. Entrega TODO a tiempo%0A%0A¡Reinventa tu método! 🔄";
        } else if (puntosFaltantes == 104) {
            mensaje = "¡Foco en soluciones! En %0A*" + materia + "*%0A%0A*104* puntos faltantes.%0A• 52 pts/trimestre%0A%0A¿Sabías que?:%0A- Un proyecto especial puede valer 20-30 pts%0A- Mejorar exámenes antiguos suma%0A- La actitud cuenta%0A%0A¡Explora todas las opciones! 💡";
        } else if (puntosFaltantes == 105) {
            mensaje = "¡105 puntos = ¡52.5 por etapa!%0AEn *" + materia + "*%0A%0ARequerimiento:%0A• 2do Trim: *52.5* pts%0A• 3ro Trim: *52.5* pts%0A%0A¡No es imposible! Ejemplo:%0A- Exámenes (30pts)%0A- Proyectos (15pts)%0A- Participación (7.5pts)%0A%0A¡Todo suma! 🧮";
        } else if (puntosFaltantes == 106) {
            mensaje = "¡Autoevaluación urgente! En %0A*" + materia + "*%0A%0A*106* pts necesarios.%0A• 53 pts/periodo%0A%0APregúntate:%0A▸ ¿Estoy usando todos los recursos?%0A▸ ¿He pedido ayuda?%0A▸ ¿Puedo mejorar mi organización?%0A%0A¡Nuevas estrategias = Nuevos resultados! 📈";
        } else if (puntosFaltantes == 107) {
            mensaje = "¡107 puntos son tu oportunidad para destacar!%0AEn *" + materia + "*%0A%0A• 2do Trim: *53.5* pts%0A• 3ro Trim: *53.5* pts%0A%0A¡Enfócate en:%0A- Puntos extras por creatividad%0A- Asistencia perfecta%0A- Mejorar trabajos anteriores%0A%0A¡La excelencia se construye! 🏗️";
        } else if (puntosFaltantes == 108) {
            mensaje = "¡108 puntos = ¡54 por etapa!%0AEn *" + materia + "*%0A%0A¡Opciones realistas:%0A1. Tutorías personalizadas (+15pts)%0A2. Presentar material adicional (+10pts)%0A3. Mejorar notas existentes (+5pts c/u)%0A%0A¡Cada punto cuenta! 💯";
        } else if (puntosFaltantes == 109) {
            mensaje = "¡109 puntos faltantes = ¡Reinvención académica!%0AEn *" + materia + "*%0A%0A• 2do Trim: *54.5* pts%0A• 3ro Trim: *54.5* pts%0A%0A¡Transforma esto en:%0A- Oportunidad para dominar el tema%0A- Posibilidad de crecimiento%0A- Historia de superación%0A%0A¡Tú decides el final! ✨";
        } else if (puntosFaltantes == 110) {
            mensaje = "¡110 puntos = ¡55 por periodo!%0AEn *" + materia + "*%0A%0ADesglose posible:%0A- Exámenes principales: 35pts%0A- Trabajos prácticos: 15pts%0A- Participación: 5pts%0A%0A¡Requiere esfuerzo total pero ES POSIBLE!%0A¡Tu actitud marca la diferencia! 💪";
        } else if (puntosFaltantes == 111) {
            mensaje = "¡111 puntos faltantes = ¡Reto épico!%0AEn *" + materia + "*%0A%0A• 2do Trim: *55.5* pts%0A• 3ro Trim: *55.5* pts%0A%0A¡Conviértelo en:%0A- Tu materia de mayor crecimiento%0A- Ejemplo de resiliencia%0A- Motivación para otros%0A%0A¡Eres capaz de más de lo que crees! 🚀";
        } else if (puntosFaltantes == 112) {
            mensaje = "¡112 puntos necesarios = ¡56 por etapa!%0AEn *" + materia + "*%0A%0A¡Estrategias comprobadas:%0A1. Asistir a todas las clases (+5pts)%0A2. Entregar borradores para feedback (+7pts)%0A3. Hacer preguntas clave (+3pts)%0A%0A¡Pequeñas acciones = Grandes resultados! 🔍";
        } else if (puntosFaltantes == 113) {
            mensaje = "¡113 puntos = ¡Tu gran oportunidad!%0AEn *" + materia + "*%0A%0A• 2do Trim: *56.5* pts%0A• 3ro Trim: *56.5* pts%0A%0A¡Alternativas:%0A- Exámenes de recuperación%0A- Proyectos interdisciplinarios%0A- Portafolio de evidencias%0A%0A¡Consulta a tu profesor! 👨🏫";
        } else if (puntosFaltantes == 114) {
            mensaje = "¡114 puntos faltantes = ¡Plan de batalla!%0AEn *" + materia + "*%0A%0A• 57 pts/trimestre%0A%0A¡Recursos disponibles:%0A- Biblioteca escolar%0A- Grupos de estudio%0A- Plataformas digitales%0A- Horarios de consulta%0A%0A¡Usa todas tus armas! 🛡️";
        } else if (puntosFaltantes == 115) {
            mensaje = "¡115 puntos = ¡57.5 por periodo!%0AEn *" + materia + "*%0A%0A¡Desglose estratégico:%0A▸ 40pts (Evaluaciones)%0A▸ 12pts (Tareas)%0A▸ 5.5pts (Extra)%0A%0A¡Enfoque en calidad sobre cantidad!%0A¡Mejorar > Multiplicar! 🎯";
        } else if (puntosFaltantes == 116) {
            mensaje = "¡116 puntos necesarios = ¡Tu momento de brillar!%0AEn *" + materia + "*%0A%0A• 2do Trim: *58* pts%0A• 3ro Trim: *58* pts%0A%0A¡Convierte esto en:%0A- Historia de superación%0A- Ejemplo de perseverancia%0A- Lección de vida%0A%0A¡El esfuerzo nunca se pierde! 🌟";
        } else if (puntosFaltantes == 117) {
            mensaje = "¡117 puntos faltantes = ¡Ultra-motivación!%0AEn *" + materia + "*%0A%0A• 58.5 pts/etapa%0A%0A¡Recordatorio:%0A- Einstein reprobó matemáticas%0A- Steve Jobs abandonó la universidad%0A- Lo importante es NO rendirse%0A%0A¡Escribe tu propia historia! 📖";
        } else if (puntosFaltantes == 118) {
            mensaje = "¡118 puntos = ¡59 por periodo!%0AEn *" + materia + "*%0A%0A¡Opciones reales:%0A1. Examen extraordinario (+30pts)%0A2. Trabajo comunitario relacionado (+15pts)%0A3. Presentación especial (+10pts)%0A%0A¡Innovación académica! 💡";
        } else if (puntosFaltantes == 119) {
            mensaje = "¡119 puntos faltantes = ¡Tu prueba de fuego!%0AEn *" + materia + "*%0A%0A• 2do Trim: *59.5* pts%0A• 3ro Trim: *59.5* pts%0A%0A¡En situaciones difíciles se forjan caracteres fuertes!%0A¡Este es tu momento de crecimiento! 🌱";
        } else if (puntosFaltantes == 120) {
            mensaje = "¡120 puntos necesarios = ¡60 por etapa!%0AEn *" + materia + "*%0A%0A¡Análisis honesto:%0A• Requiere dedicación exclusiva%0A• Necesita apoyo docente%0A• Posible reiniciar el año%0A%0A¡Pero recuerda:%0AEl éxito tiene muchas formas%0A¡Y tú defines la tuya! 🏆";
        }

        else if (puntosFaltantes == 121) {
            mensaje = "📌 *Situación crítica - Plan emergente*%0AEn *" + materia + "*%0A*121* pts faltantes (60.5/trimestre)%0A%0A🔍 *Acciones inmediatas:*%0A1. Reunión URGENTE con el profesor%0A2. Solicitar evaluación diagnóstica%0A3. Considerar recursar con ventajas%0A%0A⚠️ Importante: Esto no define tu capacidad, solo tu estrategia";
        } else if (puntosFaltantes == 122) {
            mensaje = "⚡ *Reinicio inteligente*%0AEn *" + materia + "*%0A*122* pts = 61/trimestre%0A%0A💡 *Alternativas viables:*%0A• Iniciar el año con:%0A- Clases de nivelación%0A- Tutoría permanente%0A- Portafolio de avances%0A%0A✨ *Oportunidad oculta:* Podrías dominar la materia como nadie";
        } else if (puntosFaltantes == 123) {
            mensaje = "🔄 *Reprogramación académica*%0A*" + materia + "* requiere *123* pts%0A(61.5/trimestre)%0A%0A📚 *Estrategia recomendada:*%0A1. Priorizar esta materia%0A2. Aprovechar vacaciones para nivelación%0A3. Crear grupo de estudio%0A%0A🌱 *Recordatorio:* Los grandes expertos fallaron primero";
        } else if (puntosFaltantes == 124) {
            mensaje = "🧩 *Rompecabezas educativo*%0AEn *" + materia + "*%0A*124* pts faltantes (62/trimestre)%0A%0A🔧 *Solución modular:*%0A- Completar unidades clave primero%0A- Validar conocimientos parciales%0A- Acumular créditos progresivos%0A%0A💎 *Beneficio oculto:* Aprendizaje más profundo";
        } else if (puntosFaltantes == 125) {
            mensaje = "🎯 *Meta redefinida*%0A*" + materia + "* necesita *125* pts%0A(62.5/trimestre)%0A%0A🛠️ *Enfoque alternativo:*%0A1. Concentrarse en competencias básicas%0A2. Demostrar mejora continua%0A3. Obtener aval por proyectos%0A%0A🚩 *Importante:* El aprendizaje va más allá de las notas";
        } else if (puntosFaltantes == 126) {
            mensaje = "📉 *Análisis de oportunidad*%0AEn *" + materia + "*%0A*126* pts = 63/trimestre%0A%0A🔄 *Opciones realistas:*%0A• Curso intensivo pre-trimestre%0A• Validar conocimientos por experiencia%0A• Examen global diferenciado%0A%0A⚖️ *Perspectiva:* Equilibrio entre esfuerzo y resultado";
        } else if (puntosFaltantes == 127) {
            mensaje = "🧭 *Navegación académica*%0A*" + materia + "* requiere *127* pts%0A(63.5/trimestre)%0A%0A🗺️ *Rutas posibles:*%0A1. Plan semestral extendido%0A2. Educación dual (teoría + práctica)%0A3. Proyecto aplicado sustituyente%0A%0A🌅 *Nuevo enfoque:* Aprendizaje significativo > Puntos";
        } else if (puntosFaltantes == 128) {
            mensaje = "⚙️ *Ajuste de estrategia mayor*%0AEn *" + materia + "*%0A*128* pts faltantes (64/trimestre)%0A%0A🛠️ *Recomendaciones técnicas:*%0A• Diagnosticar fallas específicas%0A• Crear mapa de recuperación%0A• Establecer hitos semanales%0A%0A🔍 *Dato clave:* 72% de estudiantes mejoran al reenfocarse";
        } else if (puntosFaltantes == 129) {
            mensaje = "🚧 *Reconstrucción académica*%0A*" + materia + "* necesita *129* pts%0A(64.5/trimestre)%0A%0A🏗️ *Cimientos nuevos:*%0A1. Clases personalizadas%0A2. Evaluación por competencias%0A3. Portafolio de evidencias%0A%0A💡 *Insight:* Las crisis generan los mayores aprendizajes";
        } else if (puntosFaltantes == 130) {
            mensaje = "🎢 *Recorrido alternativo*%0AEn *" + materia + "*%0A*130* pts = 65/trimestre%0A%0A🛤️ *Caminos disponibles:*%0A• Programa de nivelación acelerada%0A• Validación de experiencia previa%0A• Proyecto integrador anual%0A%0A🏆 *Meta real:* Dominio duradero > Aprobación rápida";
        } else if (puntosFaltantes == 131) {
            mensaje = "🩺 *Diagnóstico académico*%0A*" + materia + "* requiere *131* pts%0A(65.5/trimestre)%0A%0A📝 *Prescripción educativa:*%0A1. Inmersión temática controlada%0A2. Aprendizaje basado en problemas%0A3. Evaluación por rubricas%0A%0A💊 *Dosis sugerida:* 2h diarias + retroalimentación constante";
        } else if (puntosFaltantes == 132) {
            mensaje = "🚨 *Alerta de reinvención*%0AEn *" + materia + "*%0A*132* pts faltantes (66/trimestre)%0A%0A🔄 *Pasos transformadores:*%0A• Admitir necesidad de cambio radical%0A• Buscar mentor especializado%0A• Reaprender desde bases%0A%0A🌱 *Ventaja oculta:* Puedes construir mejores fundamentos";
        } else if (puntosFaltantes == 133) {
            mensaje = "🧰 *Kit de supervivencia académica*%0A*" + materia + "* necesita *133* pts%0A(66.5/trimestre)%0A%0A🛠️ *Herramientas críticas:*%0A1. Banco de recursos de la materia%0A2. Grupo de apoyo emocional%0A3. Registro diario de micro-logros%0A%0A⚡ *Energía:* Enfócate en progreso, no en perfección";
        } else if (puntosFaltantes == 134) {
            mensaje = "🚀 *Lanzamiento de recuperación*%0AEn *" + materia + "*%0A*134* pts = 67/trimestre%0A%0A🛰️ *Fases de misión:*%0A• Fase 1: Diagnóstico preciso (1 semana)%0A• Fase 2: Ataque a debilidades (4 semanas)%0A• Fase 3: Consolidación (2 semanas)%0A%0A🎯 *Objetivo:* Aprendizaje auténtico";
        } else if (puntosFaltantes == 135) {
            mensaje = "🏗️ *Reingeniería educativa*%0A*" + materia + "* requiere *135* pts%0A(67.5/trimestre)%0A%0A📐 *Nuevo diseño:*%0A1. Unidades de aprendizaje modular%0A2. Evaluación por competencias%0A3. Creditos por demostración práctica%0A%0A💎 *Resultado:* Conocimiento aplicable > Nota numérica";
        } else if (puntosFaltantes >= 136 && puntosFaltantes <= 153) {
            mensaje = "🛑 *Evaluación de ruta crítica*%0AEn *" + materia + "*%0A*" + puntosFaltantes + "* pts faltantes%0A(" + (puntosFaltantes/2.0) + "/trimestre)%0A%0A📌 *Orientación profesional necesaria:*%0A1. Reunión con coordinador académico%0A2. Análisis de estilo de aprendizaje%0A3. Plan personalizado realista%0A%0A💡 *Sabías que:* Muchos genios tuvieron que reorientar su camino%0A%0A⚠️ *Sugerencia:* Considera:%0A• Curso remedial completo%0A• Cambio de estrategia académica%0A• Enfoque por competencias específicas";
        }
        else if (puntosFaltantes > 153) {
            mensaje = "⚠️ *Reevaluación académica necesaria*%0AEn *" + materia + "*%0A*" + puntosFaltantes + "* pts faltantes%0A%0A🔍 *Análisis requerido:*%0A1. Compatibilidad con tu estilo de aprendizaje%0A2. Necesidades educativas especiales%0A3. Estrategias alternativas de acreditación%0A%0A💡 *Recordatorio importante:*%0AEl éxito educativo tiene múltiples caminos%0A¡Este es solo un punto en tu trayectoria!";
        }

        texto = "%0A%0A🚀 *¿Necesitas ayuda?*%0AClases de apoyo escolar con descuentos:%0A- 20%% por compartir nuestro contenido%0A- 15%% adicional por referir amigos%0A📲 Contacto: wa.me/59171324941";
    
    var url = "https://api.whatsapp.com/send?phone=591" + telefono + "&text=" + mensaje+ texto;

    // Abrir la URL en una nueva pestaña
    window.open(url, '_blank');
}

});


