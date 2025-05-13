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
    var trimestre2 = $('#trimestre2').val();
    var materia_id = $('#materia_id').val();
    var telefono = $('#telefono').val();

    // Realizar la solicitud AJAX
    $.ajax({
        url: "guardar-notas",  // Ruta en Laravel
        method: "POST",
        data: {
            trimestre1: trimestre1,
            trimestre2: trimestre2,
            materia_id: materia_id,
            telefono: telefono,
            _token: $('meta[name="csrf-token"]').attr('content')  // Incluir el token CSRF
        },
        success: function(response) {
            enviarWhatsapp(telefono, response.materia.materia, response.nota.trimestre1,response.nota.trimestre2,response.nota.trimestre3);
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
function enviarWhatsapp(telefono, materia,nota1,nota2 ,puntosFaltantes) {
    let mensaje,notaMinima=51;
    

    // Personalizar el mensaje según la nota obtenida
    if (puntosFaltantes < 1) {
        mensaje = "¡Felicidades! Ya has aprobado: %0A" + materia + "%0A Aunque no te conformes con lo justo, aún puedes mejorar. No te relajes, sigue esforzándote para lograr una mejor calificación. Recuerda que el conocimiento no tiene límites. Y si deseas continuar mejorando, síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A o contacta al wa.me/59171039910 para seguir aprendiendo con ITE.";
    } 
    if (puntosFaltantes == 1) {
        mensaje = "¡Felicidades! En: %0A*" + materia + "*%0Asolo necesitas %0A*1* punto para aprobar. Con tus notas de " + nota1 + " y " + nota2 + ", ya estás muy cerca de alcanzar la meta. No te conformes, ¡vamos por más! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0AY si deseas apoyo escolar, comunícate al wa.me/59171039910 ¡Tú puedes!";
    } else if (puntosFaltantes == 2) {
        mensaje = "¡Excelente trabajo! En: %0A*" + materia + "*%0A solo te faltan %0A*2* puntos para aprobar. Con tus notas de " + nota1 + " y " + nota2 + ", estás muy cerca. ¡Recuerda que en el ITE estamos aquí para ayudarte a alcanzar esos puntos que necesitas! No olvides seguirnos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si necesitas apoyo, contáctanos al wa.me/59171039910. ¡No te rindas!";
    } else if (puntosFaltantes == 3) {
        mensaje = "¡Buen esfuerzo! En: %0A*" + materia + "*%0A solo necesitas %0A*3* puntos más para aprobar. Con tus notas de " + nota1 + " en el primer trimestre y " + nota2 + " en el segundo, tienes lo necesario para alcanzar la nota mínima de " + notaMinima + ". ¡Confía en ti y en el apoyo del ITE! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A Si deseas más ayuda, llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 4) {
        mensaje = "¡Casi lo logras! En: %0A*" + materia + "*%0A estás a solo %0A*4* puntos de aprobar. Con las notas de " + nota1 + " y " + nota2 + ", solo necesitas un pequeño esfuerzo adicional. Recuerda que en el ITE estamos contigo para ayudarte a alcanzar tus metas. ¡No olvides seguirnos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contáctanos al wa.me/59171039910 para más apoyo!";
    } else if (puntosFaltantes == 5) {
        mensaje = "¡Estás muy cerca! En: %0A*" + materia + "*%0A solo te faltan %0A*5* puntos para aprobar. Con tus notas de " + nota1 + " y " + nota2 + ", ya casi llegas a la nota mínima de " + notaMinima + ". ¡Confía en tu esfuerzo y en el ITE, puedes lograrlo! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A Para apoyo escolar, llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 6) {
        mensaje = "¡No te detengas! En: %0A*" + materia + "*%0A solo te faltan %0A*6* puntos para aprobar. Tus notas de " + nota1 + " y " + nota2 + "te han acercado mucho. Con un poco más de dedicación, alcanzarás la nota mínima de " + notaMinima + ". ¡Sigue adelante, el ITE está contigo! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 si necesitas apoyo.";
    } else if (puntosFaltantes == 7) {
        mensaje = "¡Aún hay tiempo! En: %0A*" + materia + "*%0A te faltan %0A*7* puntos para aprobar. Con tus notas de " + nota1 + " y " + nota2 + ", tienes la oportunidad de alcanzar la meta. Recuerda que con el esfuerzo y el apoyo del ITE, ¡puedes lograrlo! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y para ayuda escolar, llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 8) {
        mensaje = "¡Todavía puedes lograrlo! En: %0A*" + materia + "*%0A te faltan %0A*8* puntos para alcanzar la nota mínima de " + notaMinima + ". Con tus notas de " + nota1 + " y " + nota2 + ", puedes conseguirlo con un poco más de esfuerzo. ¡Recuerda que el ITE está aquí para apoyarte! No olvides seguirnos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si necesitas ayuda, contacta al wa.me/59171039910.";
    } else if (puntosFaltantes == 9) {
        mensaje = "¡Sigue avanzando! En: %0A*" + materia + "*%0A te faltan %0A*9* puntos para aprobar. Con tus notas de " + nota1 + " y " + nota2 + ", aún estás a tiempo de alcanzar la meta. Recuerda que el camino puede ser difícil, pero el ITE te respalda en cada paso. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A Para apoyo, llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 10) {
        mensaje = "¡No te desanimes! En: %0A*" + materia + "*%0A faltan %0A*10* puntos para llegar a la nota mínima de " + notaMinima + ". Aunque el camino es un poco más largo, con esfuerzo y dedicación, ¡puedes lograrlo! El ITE está aquí para apoyarte en cada paso del camino. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si necesitas ayuda, contacta al wa.me/59171039910.";
    }

  
    else if (puntosFaltantes == 11) {
        mensaje = "¡Estás en el camino correcto! En: %0A*" + materia + "*%0A solo necesitas %0A*11* puntos para aprobar. Aunque puede parecer mucho, cada esfuerzo cuenta. ¡Vamos por esos puntos! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo escolar.";
    } else if (puntosFaltantes == 12) {
        mensaje = "¡No te rindas! En: %0A*" + materia + "*%0A te faltan %0A*12* puntos para aprobar. Cada punto que logres cuenta, y con determinación puedes llegar lejos. El ITE está aquí para apoyarte. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si necesitas ayuda, llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 13) {
        mensaje = "¡Sigue luchando! En: %0A*" + materia + "*%0A te faltan %0A*13* puntos para alcanzar la nota mínima. Aunque el esfuerzo es mayor, cada pequeño paso te acerca más a la meta. El ITE está contigo. No olvides seguirnos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contáctanos al wa.me/59171039910 para apoyo.";
    } else if (puntosFaltantes == 14) {
        mensaje = "¡La meta está a la vista! En: %0A*" + materia + "*%0A necesitas %0A*14* puntos para aprobar. El camino puede ser desafiante, pero recuerda que cada esfuerzo suma. ¡Sigue adelante! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 si buscas ayuda.";
    } else if (puntosFaltantes == 15) {
        mensaje = "¡Estás haciendo un gran esfuerzo! En: %0A*" + materia + "*%0A te faltan %0A*15* puntos para aprobar. Aunque parece un gran reto, el ITE está aquí para guiarte en cada paso. ¡Vamos a por esos puntos! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo escolar.";
    } else if (puntosFaltantes == 16) {
        mensaje = "¡No te detengas! En: %0A*" + materia + "*%0A solo te faltan %0A*16* puntos para aprobar. Aunque la meta es alta, cada esfuerzo que realices te acerca más. ¡Confía en ti mismo! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si necesitas ayuda, llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 17) {
        mensaje = "¡Sigue avanzando! En: %0A*" + materia + "*%0A te faltan %0A*17* puntos para alcanzar la nota mínima. El esfuerzo será mayor, pero cada paso cuenta. ¡Vamos a lograrlo juntos! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contáctanos al wa.me/59171039910 para apoyo.";
    } else if (puntosFaltantes == 18) {
        mensaje = "¡Cada esfuerzo cuenta! En: %0A*" + materia + "*%0A necesitas %0A*18* puntos para aprobar. Aunque el camino es largo, la perseverancia es la clave. ¡No te rindas! El ITE está contigo. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si buscas apoyo, llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 19) {
        mensaje = "¡Aún hay tiempo! En: %0A*" + materia + "*%0A faltan %0A*19* puntos para alcanzar la nota mínima. Aunque el esfuerzo es considerable, cada pequeño logro te acerca a tu meta. ¡Sigue adelante! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo escolar.";
    } else if (puntosFaltantes == 20) {
        mensaje = "¡Tú puedes lograrlo! En: %0A*" + materia + "*%0A solo necesitas %0A*20* puntos para aprobar. Aunque el esfuerzo es mayor, cada paso te acerca a tu objetivo. ¡Confía en el ITE para apoyarte! No olvides seguirnos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 si necesitas ayuda.";
    }

    else if (puntosFaltantes == 21) {
        mensaje = "¡Esfuerzo constante! En: %0A*" + materia + "*%0A necesitas %0A*21* puntos para aprobar. Aunque parece un gran desafío, recuerda que cada pequeño paso cuenta. ¡Vamos a lograrlo juntos! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo.";
    } else if (puntosFaltantes == 22) {
        mensaje = "¡No te desanimes! En: %0A*" + materia + "*%0A te faltan %0A*22* puntos para alcanzar la nota mínima. Aunque el camino es complicado, cada esfuerzo suma. ¡Confía en el ITE para guiarte! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si necesitas ayuda, llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 23) {
        mensaje = "¡Sigue empujando! En: %0A*" + materia + "*%0A solo necesitas %0A*23* puntos más para aprobar. El esfuerzo requerido es significativo, pero cada paso te acerca a la meta. ¡Tú puedes! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contáctanos al wa.me/59171039910 para apoyo escolar.";
    } else if (puntosFaltantes == 24) {
        mensaje = "¡Cada esfuerzo cuenta! En: %0A*" + materia + "*%0A te faltan %0A*24* puntos para aprobar. Aunque parece difícil, recuerda que el esfuerzo constante es la clave. ¡No te rindas! El ITE está aquí para apoyarte. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para más ayuda.";
    } else if (puntosFaltantes == 25) {
        mensaje = "¡Estás en el camino! En: %0A*" + materia + "*%0A necesitas %0A*25* puntos para aprobar. Aunque el reto es grande, cada pequeño logro te acerca más. ¡Confía en ti mismo! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo escolar.";
    } else if (puntosFaltantes == 26) {
        mensaje = "¡No te detengas! En: %0A*" + materia + "*%0A solo te faltan %0A*26* puntos para alcanzar la nota mínima. Aunque el camino es desafiante, recuerda que con dedicación puedes lograrlo. ¡El ITE te respalda! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si necesitas ayuda, llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 27) {
        mensaje = "¡Aún puedes lograrlo! En: %0A*" + materia + "*%0A te faltan %0A*27* puntos para aprobar. Aunque el esfuerzo es considerable, cada pequeño paso cuenta. ¡Sigue adelante! El ITE está aquí para apoyarte. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo.";
    } else if (puntosFaltantes == 28) {
        mensaje = "¡Confía en tu esfuerzo! En: %0A*" + materia + "*%0A necesitas %0A*28* puntos para aprobar. Aunque parece un gran reto, cada esfuerzo suma. ¡Vamos a lograrlo juntos! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si buscas apoyo, llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 29) {
        mensaje = "¡Estás cerca! En: %0A*" + materia + "*%0A solo te faltan %0A*29* puntos para alcanzar la nota mínima. Aunque el esfuerzo requerido es alto, cada paso te acerca a tu meta. ¡No te rindas! El ITE está contigo. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo.";
    } else if (puntosFaltantes == 30) {
        mensaje = "¡No te desanimes! En: %0A*" + materia + "*%0A faltan %0A*30* puntos para aprobar. El camino puede ser difícil, pero con esfuerzo y dedicación, ¡puedes lograrlo! Recuerda que el ITE está aquí para apoyarte. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si necesitas ayuda, llama al wa.me/59171039910.";
    }


    else if (puntosFaltantes == 31) {
        mensaje = "¡Cada esfuerzo cuenta! En: %0A*" + materia + "*%0A necesitas %0A*31* puntos para aprobar. Aunque parece un gran desafío, recuerda que el trabajo duro siempre da frutos. ¡Tú puedes! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo escolar.";
    } else if (puntosFaltantes == 32) {
        mensaje = "¡No te rindas! En: %0A*" + materia + "*%0A te faltan %0A*32* puntos para alcanzar la nota mínima. Aunque el camino es complicado, cada esfuerzo suma. ¡Confía en el ITE para guiarte! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si necesitas ayuda, llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 33) {
        mensaje = "¡Sigue empujando! En: %0A*" + materia + "*%0A solo necesitas %0A*33* puntos más para aprobar. El esfuerzo requerido es significativo, pero cada paso te acerca a la meta. ¡Tú puedes! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contáctanos al wa.me/59171039910 para apoyo escolar.";
    } else if (puntosFaltantes == 34) {
        mensaje = "¡Cada esfuerzo cuenta! En: %0A*" + materia + "*%0A te faltan %0A*34* puntos para aprobar. Aunque parece difícil, recuerda que el esfuerzo constante es la clave. ¡No te rindas! El ITE está aquí para apoyarte. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para más ayuda.";
    } else if (puntosFaltantes == 35) {
        mensaje = "¡Estás en el camino! En: %0A*" + materia + "*%0A necesitas %0A*35* puntos para aprobar. Aunque el reto es grande, cada pequeño logro te acerca más. ¡Confía en ti mismo! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo escolar.";
    } else if (puntosFaltantes == 36) {
        mensaje = "¡No te detengas! En: %0A*" + materia + "*%0A solo te faltan %0A*36* puntos para alcanzar la nota mínima. Aunque el camino es desafiante, recuerda que con dedicación puedes lograrlo. ¡El ITE te respalda! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si necesitas ayuda, llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 37) {
        mensaje = "¡Aún puedes lograrlo! En: %0A*" + materia + "*%0A te faltan %0A*37* puntos para aprobar. Aunque el esfuerzo es considerable, cada pequeño paso cuenta. ¡Sigue adelante! El ITE está aquí para apoyarte. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo.";
    } else if (puntosFaltantes == 38) {
        mensaje = "¡Confía en tu esfuerzo! En: %0A*" + materia + "*%0A necesitas %0A*38* puntos para aprobar. Aunque parece un gran reto, cada esfuerzo suma. ¡Vamos a lograrlo juntos! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si buscas apoyo, llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 39) {
        mensaje = "¡Estás cerca! En: %0A*" + materia + "*%0A solo te faltan %0A*39* puntos para alcanzar la nota mínima. Aunque el esfuerzo requerido es alto, cada paso te acerca a tu meta. ¡No te rindas! El ITE está contigo. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo.";
    } else if (puntosFaltantes == 40) {
        mensaje = "¡No te desanimes! En: %0A*" + materia + "*%0A faltan %0A*40* puntos para aprobar. El camino puede ser difícil, pero con esfuerzo y dedicación, ¡puedes lograrlo! Recuerda que el ITE está aquí para apoyarte. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si necesitas ayuda, llama al wa.me/59171039910.";
    }

    else if (puntosFaltantes == 41) {
        mensaje = "¡Cada paso cuenta! En: %0A*" + materia + "*%0A necesitas %0A*41* puntos para aprobar. Aunque es un gran desafío, recuerda que el esfuerzo constante siempre da resultados. ¡No te rindas! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo escolar.";
    } else if (puntosFaltantes == 42) {
        mensaje = "¡Aún hay oportunidad! En: %0A*" + materia + "*%0A te faltan %0A*42* puntos para alcanzar la nota mínima. Aunque el esfuerzo requerido es considerable, cada paso suma. ¡Confía en ti mismo! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si necesitas ayuda, llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 43) {
        mensaje = "¡No te detengas! En: %0A*" + materia + "*%0A solo necesitas %0A*43* puntos más para aprobar. Aunque parece un gran reto, cada pequeño logro te acerca más. ¡Tú puedes! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contáctanos al wa.me/59171039910 para apoyo escolar.";
    } else if (puntosFaltantes == 44) {
        mensaje = "¡Sigue adelante! En: %0A*" + materia + "*%0A te faltan %0A*44* puntos para alcanzar la nota mínima. Aunque el camino es complicado, recuerda que cada esfuerzo cuenta. ¡El ITE está aquí para apoyarte! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para más ayuda.";
    } else if (puntosFaltantes == 45) {
        mensaje = "¡Estás en el camino correcto! En: %0A*" + materia + "*%0A necesitas %0A*45* puntos para aprobar. Aunque el reto es grande, cada pequeño logro te acerca a tu meta. ¡Confía en ti mismo! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo escolar.";
    } else if (puntosFaltantes == 46) {
        mensaje = "¡No te rindas! En: %0A*" + materia + "*%0A solo te faltan %0A*46* puntos para alcanzar la nota mínima. Aunque el camino es desafiante, con dedicación, ¡puedes lograrlo! El ITE te respalda. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si necesitas ayuda, llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 47) {
        mensaje = "¡Aún puedes lograrlo! En: %0A*" + materia + "*%0A te faltan %0A*47* puntos para aprobar. Aunque el esfuerzo es considerable, cada paso cuenta. ¡Sigue adelante! El ITE está aquí para apoyarte. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo.";
    } else if (puntosFaltantes == 48) {
        mensaje = "¡Confía en tu esfuerzo! En: %0A*" + materia + "*%0A necesitas %0A*48* puntos para aprobar. Aunque parece un gran reto, cada esfuerzo suma. ¡Vamos a lograrlo juntos! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si buscas apoyo, llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 49) {
        mensaje = "¡Estás cerca! En: %0A*" + materia + "*%0A solo te faltan %0A*49* puntos para alcanzar la nota mínima. Aunque el esfuerzo requerido es alto, cada paso te acerca a tu meta. ¡No te rindas! El ITE está contigo. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo.";
    } else if (puntosFaltantes == 50) {
        mensaje = "¡No te desanimes! En: %0A*" + materia + "*%0A faltan %0A*50* puntos para aprobar. Aunque es un camino difícil, con esfuerzo y dedicación, ¡puedes lograrlo! Recuerda que el ITE está aquí para apoyarte. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si necesitas ayuda, llama al wa.me/59171039910.";
    }

    else if (puntosFaltantes == 51) {
        mensaje = "¡Gran desafío! En: %0A*" + materia + "*%0A necesitas %0A*51* puntos para aprobar. Este es un objetivo significativo que requiere mucho esfuerzo y dedicación. ¡No te desanimes! Recuerda que el ITE está aquí para guiarte. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo escolar.";
    } else if (puntosFaltantes == 52) {
        mensaje = "¡Afronta el reto! En: %0A*" + materia + "*%0A te faltan %0A*52* puntos para alcanzar la nota mínima. Esto requiere un esfuerzo considerable, pero con determinación, ¡puedes lograrlo! El ITE está aquí para apoyarte. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si necesitas ayuda, llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 53) {
        mensaje = "¡Esfuérzate al máximo! En: %0A*" + materia + "*%0A solo necesitas %0A*53* puntos para aprobar. Este es un reto que exige dedicación y trabajo constante. ¡Sigue adelante! El ITE está contigo. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo escolar.";
    } else if (puntosFaltantes == 54) {
        mensaje = "¡Estás a un gran paso! En: %0A*" + materia + "*%0A necesitas %0A*54* puntos para alcanzar la nota mínima. Esto requiere un esfuerzo significativo y dedicación. ¡No te rindas! El ITE está aquí para apoyarte en tu camino. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para más ayuda.";
    } else if (puntosFaltantes == 55) {
        mensaje = "¡Es un desafío! En: %0A*" + materia + "*%0A te faltan %0A*55* puntos para aprobar. Este objetivo es alto y requerirá mucho esfuerzo. ¡Confía en ti mismo y en tus capacidades! El ITE te respalda. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo escolar.";
    } else if (puntosFaltantes == 56) {
        mensaje = "¡El esfuerzo es clave! En: %0A*" + materia + "*%0A necesitas %0A*56* puntos para aprobar. Este es un reto considerable que requiere dedicación y perseverancia. ¡Sigue adelante! El ITE está contigo. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si buscas ayuda, llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 57) {
        mensaje = "¡Gran trabajo por venir! En: %0A*" + materia + "*%0A solo te faltan %0A*57* puntos para alcanzar la nota mínima. Este es un gran desafío que exige un esfuerzo extra. ¡Confía en el ITE para apoyarte! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo escolar.";
    } else if (puntosFaltantes == 58) {
        mensaje = "¡No te desanimes! En: %0A*" + materia + "*%0A necesitas %0A*58* puntos para aprobar. Este objetivo requiere un compromiso fuerte y esfuerzo continuo. ¡Puedes lograrlo! El ITE te respalda. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si necesitas ayuda, llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 59) {
        mensaje = "¡Este es un gran desafío! En: %0A*" + materia + "*%0A te faltan %0A*59* puntos para alcanzar la nota mínima. Se necesita un esfuerzo considerable, pero cada paso cuenta. ¡No te rindas! El ITE está aquí para apoyarte. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo.";
    } else if (puntosFaltantes == 60) {
        mensaje = "¡Afronta el reto con fuerza! En: %0A*" + materia + "*%0A necesitas %0A*60* puntos para aprobar. Esto requiere una gran dedicación y esfuerzo. ¡Confía en tus habilidades y sigue adelante! El ITE te respalda. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para más ayuda.";
    }


    else if (puntosFaltantes == 61) {
        mensaje = "¡Afronta el desafío! En: %0A*" + materia + "*%0A necesitas %0A*61* puntos para aprobar. Este objetivo es significativo y requerirá un esfuerzo constante. ¡Recuerda que el ITE está aquí para apoyarte en cada paso! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para apoyo escolar.";
    } else if (puntosFaltantes == 62) {
        mensaje = "¡Esfuérzate aún más! En: %0A*" + materia + "*%0A te faltan %0A*62* puntos para alcanzar la nota mínima. Este es un gran reto que exigirá tu máximo esfuerzo. ¡No te desanimes, el ITE está contigo! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si necesitas ayuda, llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 63) {
        mensaje = "¡Este es un gran reto! En: %0A*" + materia + "*%0A necesitas %0A*63* puntos para aprobar. Requiere una dedicación intensa y un compromiso firme. ¡Tú puedes lograrlo! Recuerda que el ITE te respalda. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo escolar.";
    } else if (puntosFaltantes == 64) {
        mensaje = "¡Cada punto cuenta! En: %0A*" + materia + "*%0A solo te faltan %0A*64* puntos para alcanzar la nota mínima. Este objetivo exige un gran esfuerzo y perseverancia. ¡Confía en ti mismo y en el apoyo del ITE! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para más ayuda.";
    } else if (puntosFaltantes == 65) {
        mensaje = "¡No te rindas! En: %0A*" + materia + "*%0A necesitas %0A*65* puntos para aprobar. Este es un objetivo alto que requiere dedicación y esfuerzo continuo. ¡El ITE está aquí para guiarte! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y si buscas ayuda, contacta al wa.me/59171039910.";
    } else if (puntosFaltantes == 66) {
        mensaje = "¡El esfuerzo es esencial! En: %0A*" + materia + "*%0A te faltan %0A*66* puntos para alcanzar la nota mínima. Este objetivo es un gran desafío, pero con dedicación, ¡puedes lograrlo! Recuerda que el ITE está contigo. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para apoyo escolar.";
    } else if (puntosFaltantes == 67) {
        mensaje = "¡Estás cerca del desafío! En: %0A*" + materia + "*%0A necesitas %0A*67* puntos para aprobar. Este reto requiere un esfuerzo fuerte y continuo. ¡Sigue adelante! El ITE te respalda en tu camino. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo.";
    } else if (puntosFaltantes == 68) {
        mensaje = "¡Afronta el reto con determinación! En: %0A*" + materia + "*%0A necesitas %0A*68* puntos para alcanzar la nota mínima. Este objetivo es exigente y requerirá tu máximo esfuerzo. ¡El ITE está aquí para ayudarte! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para más ayuda.";
    } else if (puntosFaltantes == 69) {
        mensaje = "¡Gran esfuerzo por venir! En: %0A*" + materia + "*%0A te faltan %0A*69* puntos para aprobar. Este es un desafío considerable que requiere dedicación y compromiso. ¡Confía en el apoyo del ITE! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo escolar.";
    } else if (puntosFaltantes == 70) {
        mensaje = "¡Es un gran reto por delante! En: %0A*" + materia + "*%0A necesitas %0A*70* puntos para alcanzar la nota mínima. Este objetivo requiere un esfuerzo intensivo. ¡No te desanimes, el ITE está aquí para apoyarte en cada paso! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para más ayuda.";
    }

    else if (puntosFaltantes == 71) {
        mensaje = "¡Gran desafío! En: %0A*" + materia + "*%0A necesitas %0A*71* puntos para aprobar. Este objetivo es considerablemente alto, lo que requiere un esfuerzo extraordinario. ¡No olvides que el ITE está aquí para apoyarte en esta difícil tarea! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para apoyo escolar urgente.";
    } else if (puntosFaltantes == 72) {
        mensaje = "¡Un reto considerable! En: %0A*" + materia + "*%0A te faltan %0A*72* puntos para alcanzar la nota mínima. Esto es bastante complicado, pero recuerda que con dedicación y esfuerzo, ¡todo es posible! Contacta al ITE para apoyo urgente. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 73) {
        mensaje = "¡Esfuérzate al máximo! En: %0A*" + materia + "*%0A necesitas %0A*73* puntos para aprobar. Este objetivo es difícil y requerirá un compromiso serio. ¡No te desanimes! Recuerda que el ITE está aquí para ayudarte. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo escolar urgente.";
    } else if (puntosFaltantes == 74) {
        mensaje = "¡Un gran reto por delante! En: %0A*" + materia + "*%0A te faltan %0A*74* puntos para alcanzar la nota mínima. Esto es un desafío significativo, así que no dudes en pedir ayuda. ¡El ITE te apoya! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para más asistencia.";
    } else if (puntosFaltantes == 75) {
        mensaje = "¡Es un gran desafío! En: %0A*" + materia + "*%0A necesitas %0A*75* puntos para aprobar. Este objetivo es casi imposible sin un esfuerzo concentrado y apoyo. ¡No te rindas! Contacta al ITE para obtener la ayuda necesaria. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910.";
    } else if (puntosFaltantes == 76) {
        mensaje = "¡Afronta el reto con seriedad! En: %0A*" + materia + "*%0A te faltan %0A*76* puntos para alcanzar la nota mínima. Esto es muy difícil y requerirá dedicación constante. ¡No dudes en pedir ayuda! El ITE está aquí para ti. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo escolar urgente.";
    } else if (puntosFaltantes == 77) {
        mensaje = "¡Un desafío casi insuperable! En: %0A*" + materia + "*%0A necesitas %0A*77* puntos para aprobar. Esto requiere un esfuerzo extremo y apoyo adicional. ¡No olvides que el ITE está aquí para ayudarte! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para más asistencia.";
    } else if (puntosFaltantes == 78) {
        mensaje = "¡Es un reto significativo! En: %0A*" + materia + "*%0A te faltan %0A*78* puntos para alcanzar la nota mínima. Esto es un objetivo complicado que requiere mucho esfuerzo. ¡Recuerda que el ITE está contigo! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo escolar urgente.";
    } else if (puntosFaltantes == 79) {
        mensaje = "¡Un desafío serio! En: %0A*" + materia + "*%0A necesitas %0A*79* puntos para aprobar. Este objetivo es muy difícil de lograr sin un gran esfuerzo. ¡No dudes en buscar ayuda! El ITE está aquí para apoyarte. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para más asistencia.";
    } else if (puntosFaltantes >= 80) {
        mensaje = "¡Desafío extremo! En: %0A*" + materia + "*%0A necesitas %0A*80* puntos o más para aprobar. Este es un objetivo casi inalcanzable sin un esfuerzo monumental. ¡Es urgente que contactes al ITE para apoyo escolar! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para recibir ayuda inmediata.";
    }

    else if (puntosFaltantes == 81) {
        mensaje = "¡Situación crítica! En: %0A*" + materia + "*%0A necesitas %0A*81* puntos para aprobar. Llegar a este objetivo es extremadamente difícil ya que los dos primeros trimestres no fueron lo mejor. ¡No te rindas! Contacta al ITE para apoyo urgente. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para recibir la ayuda que necesitas.";
    } else if (puntosFaltantes == 82) {
        mensaje = "¡Esfuerzo titánico requerido! En: %0A*" + materia + "*%0A necesitas %0A*82* puntos para aprobar. Alcanzar este puntaje es muy complicado y requiere máxima dedicación, ya que los primeros trimestres no fueron suficientes. ¡El ITE está aquí para apoyarte! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para asistencia urgente.";
    } else if (puntosFaltantes == 83) {
        mensaje = "¡Un reto monumental! En: %0A*" + materia + "*%0A faltan %0A*83* puntos para aprobar. Este desafío es enorme debido a que te descuidaste en los dos primeros trimestres. ¡No pierdas la esperanza! El ITE puede ayudarte a superar esta situación. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para apoyo inmediato.";
    } else if (puntosFaltantes == 84) {
        mensaje = "¡Una situación muy complicada! En: %0A*" + materia + "*%0A necesitas %0A*84* puntos para alcanzar la aprobación. Este es un reto que exige todo tu esfuerzo, ya que los primeros trimestres te dejaron en desventaja. ¡No dudes en buscar el apoyo del ITE! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para ayuda urgente.";
    } else if (puntosFaltantes == 85) {
        mensaje = "¡Un reto extremadamente difícil! En: %0A*" + materia + "*%0A faltan %0A*85* puntos para aprobar. Llegar a este objetivo requiere un esfuerzo máximo debido a los primeros trimestres flojos. ¡No es imposible, pero necesitarás apoyo urgente! El ITE está aquí para ayudarte. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para recibir ayuda.";
    } else if (puntosFaltantes == 86) {
        mensaje = "¡Esfuerzo sobrehumano necesario! En: %0A*" + materia + "*%0A necesitas %0A*86* puntos para aprobar. Llegar a este puntaje es casi imposible sin una ayuda significativa. No pierdas más tiempo, contacta al ITE para apoyo urgente. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para asistencia inmediata.";
    } else if (puntosFaltantes == 87) {
        mensaje = "¡Desafío casi imposible! En: %0A*" + materia + "*%0A faltan %0A*87* puntos para aprobar. Esto es extremadamente difícil, pero aún hay esperanza si te esfuerzas al máximo y buscas el apoyo adecuado. El ITE puede marcar la diferencia. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para ayuda urgente.";
    } else if (puntosFaltantes == 88) {
        mensaje = "¡Situación crítica! En: %0A*" + materia + "*%0A necesitas %0A*88* puntos para aprobar. Este es un desafío enorme, prácticamente imposible si no recibes ayuda urgente. No lo dudes más, el ITE está aquí para ayudarte. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para asistencia inmediata.";
    } else if (puntosFaltantes == 89) {
        mensaje = "¡Esfuerzo máximo requerido! En: %0A*" + materia + "*%0A faltan %0A*89* puntos para alcanzar la aprobación. Este es un objetivo casi inalcanzable sin un apoyo masivo. ¡El ITE está aquí para brindarte la ayuda que necesitas! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo urgente.";
    } else if (puntosFaltantes == 90) {
        mensaje = "¡Un reto extremo! En: %0A*" + materia + "*%0A te faltan %0A*90* puntos para aprobar. La situación es crítica y requiere un esfuerzo titánico. ¡No lo hagas solo, el ITE está aquí para apoyarte! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para recibir asistencia inmediata.";
    }

    else if (puntosFaltantes == 91) {
        mensaje = "¡Misión casi imposible! En: %0A*" + materia + "*%0A te faltan %0A*91* puntos para aprobar. La posibilidad de lograrlo es extremadamente baja, pero con ayuda urgente del ITE, aún tienes una pequeña oportunidad. No lo intentes solo, síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para recibir el apoyo que necesitas.";
    } else if (puntosFaltantes == 92) {
        mensaje = "¡Un reto descomunal! En: %0A*" + materia + "*%0A faltan %0A*92* puntos para aprobar. Este desafío es prácticamente inalcanzable, pero con el respaldo del ITE y un esfuerzo sobrehumano, hay una pequeña luz al final del túnel. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y comunícate al wa.me/59171039910 para asistencia urgente.";
    } else if (puntosFaltantes == 93) {
        mensaje = "¡Desafío extremo! En: %0A*" + materia + "*%0A necesitas %0A*93* puntos para aprobar. Este es un reto gigante, casi imposible sin apoyo especializado. No te desanimes, el ITE está aquí para darte ese impulso que necesitas. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para recibir la ayuda necesaria.";
    } else if (puntosFaltantes == 94) {
        mensaje = "¡Una tarea monumental! En: %0A*" + materia + "*%0A faltan %0A*94* puntos para aprobar. La probabilidad de lograrlo por tu cuenta es mínima, pero no es imposible si cuentas con el apoyo del ITE. ¡Estamos aquí para ti! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para apoyo urgente.";
    } else if (puntosFaltantes == 95) {
        mensaje = "¡Situación límite! En: %0A*" + materia + "*%0A te faltan %0A*95* puntos para aprobar. Lograrlo parece fuera de alcance, pero el ITE puede darte el empuje que necesitas para intentar lo imposible. No lo dudes más, síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para recibir ayuda inmediata.";
    } else if (puntosFaltantes == 96) {
        mensaje = "¡Caso crítico! En: %0A*" + materia + "*%0A faltan %0A*96* puntos para aprobar. Esta situación requiere un esfuerzo sobrehumano y el respaldo completo del ITE. Aún puedes luchar por ese milagro. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y comunícate al wa.me/59171039910 para asistencia inmediata.";
    } else if (puntosFaltantes == 97) {
        mensaje = "¡Al borde de lo imposible! En: %0A*" + materia + "*%0A te faltan %0A*97* puntos para aprobar. Este es un reto casi insuperable, pero con el apoyo experto del ITE podrías alcanzar lo que parece inalcanzable. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y llama al wa.me/59171039910 para obtener la ayuda urgente que necesitas.";
    } else if (puntosFaltantes == 98) {
        mensaje = "¡Un reto insuperable! En: %0A*" + materia + "*%0A faltan %0A*98* puntos para aprobar. Lograr esta meta es casi imposible, pero no todo está perdido si recibes la ayuda del ITE. ¡No pierdas la esperanza! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para obtener apoyo urgente.";
    } else if (puntosFaltantes == 99) {
        mensaje = "¡Casi un milagro! En: %0A*" + materia + "*%0A necesitas %0A*99* puntos para aprobar. Aunque parece inalcanzable, con el apoyo del ITE podrías dar lo mejor de ti y luchar hasta el final. ¡Todavía hay tiempo! Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y comunícate al wa.me/59171039910 para ayuda inmediata.";
    } else if (puntosFaltantes == 100) {
        mensaje = "¡Desafío imposible! En: %0A*" + materia + "*%0A faltan %0A*10*  puntos para aprobar. Este es un reto que parece completamente fuera de alcance, pero con el apoyo total del ITE aún podrías hacer un esfuerzo final. Síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A y contacta al wa.me/59171039910 para apoyo escolar urgente.";
    }

    else if (puntosFaltantes > 100) {
        mensaje = "¡Lo siento mucho! En: %0A*" + materia + "*%0A aunque saques 100 en el tercer trimestre, ya no es posible aprobar. Has reprobado el año. Te sugerimos que hables con tu docente o con el director de tu colegio de manera urgente para analizar las opciones disponibles. Para recibir apoyo adicional y evaluar qué se puede hacer, síguenos en TikTok:%0Ahttps://www.tiktok.com/@ite_educabol%0A o contacta al wa.me/59171039910 para orientación urgente.";
    }



    // Codificar el mensaje para URL
    //var mensajeCodificado = encodeURIComponent(mensaje);
    
    // Crear la URL de WhatsApp con el mensaje y el número de teléfono
    var url = "https://api.whatsapp.com/send?phone=" + telefono + "&text=" + mensaje;

    // Abrir la URL en una nueva pestaña
    window.open(url, '_blank');
}

});


