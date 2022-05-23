//Validaciones del Formulario
$(function(){

  var $valForm=$("#formulario")

  jQuery.validator.addMethod("alfanumerico", function (value, element) {
    return this.optional(element) || /^[a-zA-Z0-9-\s]+$/i.test(value);
  }, "solo alfanumerico1");

  //validacion de un email
  jQuery.validator.addMethod("alfanumerico", function (value, element) {
    return this.optional(element) || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value);
  }, "solo alfanumerico2");
  

  jQuery.validator.addMethod("sololetras", function (value, element) {
    return this.optional(element) || /^[a-z]+$/i.test(value);
  }, "Solo letras");

  jQuery.validator.addMethod("distinto", function (value, element,param) {
    return this.optional(element) || value != param ;
  }, "Distinto");
  

    $valForm.validate({
      rules:{
        nombre:{
          required:true,
          sololetras:true,
          maxlength: 50
        },
        apellido:{
          required:true,
          sololetras:true,
          maxlength:50
        },
        marca:{
          required:true,
          distinto:'cero',
          maxlength:50
        },
        modelo:{
          required:true,
          distinto:'cero',
          maxlength:50
        },
        email:{
          required:true,
          alfanumerico2:true,
          maxlength:100
        },
        tipSer:{
          distinto:'cero'
        }

      },
      messages:{
        nombre:{
          required:'Debe ingresar un nombre',
          sololetras:'Solo puede ingresar letras',
          maxlength:'Puede ingresar un maximo de 50 caracteres'
        },
        apellido:{
          required:'Debe ingresar un apellido',
          sololetras: 'Solo puede ingresar letras',
          maxlength: 'Puede ingresar un maximo de 50 caracteres'
        },
        marca:{
          required: 'Debe ingresar una Marca',
          distinto: 'Debe ingresar una opcion valida'
        },
        modelo:{
          required: 'Debe ingresar un Modelo',
          distinto: 'Debe ingresar una opcion valida'
        },
        email:{
          required: 'Debe ingresar un correo con el siguiente formato xx@xx.cl',
          alfanumerico: 'Puede ingresar letras, numeros y espacios',
          maxlength: 'Puede ingresar un maximo de 100 digitos'
        },
        tipSer: {
          distinto: 'Debe ingresar una opcion valida'
        }
      }
    })
})

// Captura de datos en pantalla de la Reserva
$(function()
{
  $('#enviar').click(function(e){
    e.preventDefault();
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var marca = document.getElementById("marca").value;
    var modelo = document.getElementById("modelo").value;
    var valor = document.getElementById("valor").value;
    var email = document.getElementById("email").value;
    var fecha_res = new Date(fec_res.value);
    var yyyy = fecha_res.getFullYear().toString();
    var mm = (fecha_res.getMonth()+1).toString();
    var dd = (fecha_res.getDate()).toString();
    var hr = (fecha_res.getHours()).toString();
    var min = (fecha_res.getMinutes()).toString();
    var fecha_formateada = ((dd[1]?dd:"0"+dd[0]) + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + yyyy );
    var hora_formateada = (hr + ":" + min)
    
    var informacionIngresada ='<p><b>Nombre Completo:</b> ' + nombre + ' ' + apellido + '</p>' +
    '<p><b>Marca Vehiculo:</b> ' + marca + '</p>' +
    '<p><b>Modelo de Vehiculo:</b> ' + modelo + '</p>' +
    '<p><b>Email de Contacto:</b> ' + email + '</p>' +
    '<p><b>Valor del Servicio:</b> ' + valor + '</p>' +
    '<p><b>Fecha Reserva Servicio:</b> ' + fecha_formateada + '</p>' +
    '<p><b>Hora Reserva Servicio:</b> ' + hora_formateada + '</p>' ;
    document.getElementById("informacionIngresada").innerHTML = informacionIngresada;
   


  })
})


