/******************************* FUNCIONES ****************************/
//FUNCION CARGAR HISTORIAL
function cargarHistorial(){
  const historial = JSON.parse(localStorage.getItem("historial"));
  const cuerpoTabla = document.querySelector('#cuerpoTabla');
  const filaSinInformacion = document.querySelector('#sin-informacion');
  const tr = document.createElement("tr");
  if(historial === null){
      if(filaSinInformacion === null){
        tr.setAttribute("id", "sin-informacion")
        let td = document.createElement("td");
        td.textContent = "Sin información";
        td.setAttribute("colspan", "8");
        tr.appendChild(td);
        cuerpoTabla.appendChild(tr);
      }
  }else{
      tr.setAttribute('class', 'fila')
      if(filaSinInformacion != null){
        filaSinInformacion.remove();
      }

      let td1 = document.createElement("td");
      td1.textContent = historial.nombre;
      tr.appendChild(td1);
      cuerpoTabla.appendChild(tr);

      let td2 = document.createElement("td");
      td2.textContent = historial.rut;
      tr.appendChild(td2);
      cuerpoTabla.appendChild(tr);

      let td3 = document.createElement("td");
      td3.textContent = historial.monto;
      tr.appendChild(td3);
      cuerpoTabla.appendChild(tr);

      let td4 = document.createElement("td");
      td4.textContent = historial.cuotas;
      tr.appendChild(td4);
      cuerpoTabla.appendChild(tr);

      let td5 = document.createElement("td");
      td5.textContent = historial.cuotaMensual;
      tr.appendChild(td5);
      cuerpoTabla.appendChild(tr);

      let td6 = document.createElement("td");
      td6.textContent = historial.totalaPagar;
      tr.appendChild(td6);
      cuerpoTabla.appendChild(tr);

      let td7 = document.createElement("td");
      td7.textContent = historial.horaYFecha;
      tr.appendChild(td7);
      cuerpoTabla.appendChild(tr);

      let td8 = document.createElement("td");
      let buttonDelete = document.createElement("button");
      buttonDelete.setAttribute("class", "btn btn-danger");
      buttonDelete.textContent = "Eliminar";
      buttonDelete.addEventListener("click", function(evt){
        evt.target.parentNode.parentNode.remove();
      })
      td8.appendChild(buttonDelete);
      tr.appendChild(td8);
      cuerpoTabla.appendChild(tr);


  }
}

//FUNCION SOLO NUMEROS
function soloNumeros(evt){
  var code = evt.which ? evt.which : evt.keyCode;
  if(code==8) {
    return true;
  } else if(code>=48 && code<=57) { 
    return true;
  } else{
    return false;
  }
}

//FUNCION OBTENER HORA Y FECHA ACTUAL
function getTimeStamp(){
  const hoy = new Date();
  let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  let fecha = hoy.getDate() + '/' + ( hoy.getMonth() + 1 ) + '/' + hoy.getFullYear();
  let timestamp = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds() + '.' + hoy.getMilliseconds();
  let dates = [`${hora} ${fecha}`,timestamp];
  return dates;
}

//FUNCION ENVIA FORMULARIO
function enviarFormulario(){
  //obtiene el monto ingresado
  const monto = parseInt(document.getElementById('txtMonto').value); 
  const nombre = document.getElementById('txtNombre').value;
  const rut = document.getElementById('txtRut').value;
  const email = document.getElementById('txtEmail').value;
  const ArrCuotas = document.getElementsByName('cuotas'); 
  let cuota = 0;
  //obtienes las cuotas
  ArrCuotas.forEach(element => {
    if(element.checked){
      cuota = parseInt(element.value);
    }
  })

  if(isNaN(monto) || cuota === 0){
    swal({
      text: 'Debe ingresar los campos requeridos',
      icon : 'info'
    })
  }else{
    const hoy = getTimeStamp();
    const credito = new Credito(nombre, rut, monto, cuota, null ,null, hoy[0], hoy[1]);
    const result = credito.calcularCuota();
    if(result[0]){
      fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method : 'POST',
        body: JSON.stringify({
          service_id : 'service_vlm759l',
          template_id : 'template_yhitgep',
          user_id : "Dt-AbemJQEkdxXSnn",
          template_params : {
              'email' : email,
              'name'    : nombre,
              'monto_solicitado' : monto,
              'cuotas': cuota,
              'cuota_mensual': credito.cuotaMensual,
              'costo_total': credito.totalaPagar,
              'timestamp': credito.horaYFecha,
          }
        }),
        headers : {
          'Content-type' : 'application/json',
          'Accept' : 'application/json'
        }
      })
      .then((response) => {
        //ENVIADO
        if(response.status === 200){
          swal({
            text: result[1],
            icon: 'success'
          })
          localStorage.setItem('historial', JSON.stringify(credito));
          cargarHistorial();
          clearForm();
          //CUALQUIER ERROR QUE OCURRA
        }else{
          swal({
            title: 'Ocurrio un error',
            icon : 'error'
          })
        }
      });
    }else{
      swal({
        title: 'Ocurrio un error',
        icon : 'error'
      })
    }
  }  
}

//FUNCIÓN LIMPIAR FORMULARIO
function clearForm(){
  document.getElementById('txtMonto').value = "";
  document.getElementById('txtNombre').value = "";
  document.getElementById('txtRut').value = "";
  document.getElementById('txtEmail').value = "";
  const ArrCuotas = document.getElementsByName('cuotas'); 
  
  ArrCuotas.forEach(element => {
    if(element.checked){
      element.checked = false;
    }
  })
  document.getElementById('resultado').innerHTML = `<p style="color: red;font-weight:bold;"></p>`;
}

//FUNCION LIMPIAR TABLA
function limpiarTabla(){
  localStorage.setItem('historial', null);
  const cuerpoTabla = document.querySelectorAll('#cuerpoTabla > .fila');
  for (let index = 0; index < cuerpoTabla.length; index++) {
    cuerpoTabla[index].remove();
  };
  cargarHistorial();
}
/******************************* FIN FUNCIONES ****************************/

/******************************* EVENTOS ****************************/


//INPUT VALIDA SOLO NUMEROS
document.getElementById('txtMonto').addEventListener('keypress', function(evt) {
  if(!soloNumeros(evt)){
    evt.preventDefault();
  }
})

//CLIC EN BOTON ENVÍAR
document.getElementById('btnEnviar').addEventListener("click", function(event){
  event.preventDefault();
  enviarFormulario();
})



//CLIC EN BOTON LIMPIAR
document.getElementById('btnLimpiar').addEventListener('click', function (evt){
 clearForm();
})

//CLIC BOTON LIMPIAR TABLA.
document.getElementById('btnLimpiarTabla').addEventListener('click', function(){
  limpiarTabla();
})

/******************************* FIN EVENTOS ****************************/

//PAGINA CARGADA
document.addEventListener("DOMContentLoaded", function(event) { 
  cargarHistorial();  
});