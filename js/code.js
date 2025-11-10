let sistema = new Sistema();
let alerta = new Alertas();

window.addEventListener('load',inicio);

async function inicio(){ 
  login(); 
}



function cerrarSesion(){
  sistema.cerrarSesion();
  mostrarSeccion('contenedorLogin');
     document.querySelector("#contenedorPanelSuperior").style.display ="none";

}

function mostrarSeccion(idSeccion){
    const secciones = document.querySelectorAll(".seccion");
    for(let seccion of secciones) 
    {
        seccion.style.display = "none";
    }

    document.querySelector(`#${idSeccion}`).style.display = "block";
}

function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let usuario = sistema.existeUsuarioyContrasenia(username, password);
  if(usuario == 0) {
    // alert("Login exitoso como administrador");
    sistema.guardarUsuarioLogueado(username);
    iniciarAdmin();
  }
  else if (usuario == 1) {
    // alert("Login exitoso como cliente");
    sistema.guardarUsuarioLogueado(username);
   iniciarCliente();

    
  } else {
    alert("Credenciales inválidas");
    return;
  }

  let usuarioLogueado = sistema.obtenerUsuarioLogueado();
  console.log(usuarioLogueado);
  
  let contenedorPanelSuperior = `<b>Usuario: ${usuarioLogueado.nombre}</b>
  <button type="button" onclick="cerrarSesion()" class="btnCerrarSesion">Cerrar Sesión</button>`
  document.querySelector('#contenedorPanelSuperior').innerHTML = contenedorPanelSuperior;
  }

function iniciarCliente(){
    mostrarSeccion("seccionCliente");
    cargarConciertosDisponibles();
    cargarReservasRealizadas();
    document.querySelector("#contenedorPanelSuperior").style.display ="flex";
    llenarResumenCliente();
}

function llenarResumenCliente(){
  let resumen = sistema.obtenerResumenCliente();
  document.querySelector("#contenedorResumenReserva").innerHTML = `
      <b>Saldo:${resumen.saldo}</b>
      <b>Aprobadas:${resumen.reservasAprobadas}</b>
      <b>Canceladas:${resumen.reservasCanceladas}</b>
      <b>Pendientes:${resumen.reservasPendientes}</b>
  `
}

function registrarCliente() {
  let form = document.querySelector("#registroCliente");
  if (!form.reportValidity()) {
    return;
  }
  let nombre = form.nombre.value;
  let apellido = form.apellido.value;
  let usuario = form.usuario.value;
  let password = form.password.value;
  if(sistema.obtenerUsuarioPorNombreUsuario(usuario)!=null){
    alert("El nombre de usuario ya existe. Por favor, elija otro.");
    return;
  }
    if(!sistema.comprobarContrasenia(password)){
        return;
    }
    sistema.crearCliente(nombre, apellido, usuario, password);
    alert("Cliente registrado exitosamente");
    mostrarSeccion("contenedorLogin");
    form.reset();   
}

function obtenerListaConciertosFiltro(){
  let listaConciertos = sistema.obtenerListaConciertosDisponibles();
  let conciertos = [];
  let buscador = document.querySelector('#inputBuscarConcierto').value;
  let soloOfertas = document.querySelector('#checkboxOfertas').checked;
    
  if(buscador.length>0){
    for (let concierto of listaConciertos){   
      if(concierto.nombre.toUpperCase().indexOf(buscador.toUpperCase())!= -1){
        // Si no existe lo agrego
        let existe = false;    
      for (let conciertoExiste of conciertos){      
        if(conciertoExiste.id == concierto.id){
          existe = true;
        }
      }
      if(!existe)
        conciertos.push(concierto);
    }
    }
  }else{
    conciertos = listaConciertos;
  }
  // abrirPopUpReserva(conciertos[0]);
  if(soloOfertas){
    let conciertosOfertas = [];
    for(let concierto of conciertos){
      if(concierto.oferta){
        conciertosOfertas.push(concierto);
      }
    }
    return conciertosOfertas;
  }
  return conciertos;
}

async function cancelarReserva(idReserva){
  const cancelar = await alerta.confirmacion('Cancelar Reserva',`¿Seguro que desea cancelar la reserva ${idReserva}?`,'warning','Si','No',true) 
  if(cancelar){

    sistema.cancelarReserva(idReserva)
    // alerta.progressBarTimer('Cancelando reserva','Su reserva está siendo cancelada',2000);
    alerta.exito('Reserva cancelada','Su reserva se canceló correctamente','Ok')
    iniciarCliente();
  }
}
function cargarReservasRealizadas(){
  let reservas = sistema.obtenerReservasTotalPorClienteLogueado();
  let trReserva = "";
  let trEstado = "";
  for(let reserva of reservas){
    let trCancelar = "<td></td>";
    if(reserva.estado.id == 1){
      trCancelar = `<td><button type="button" class="btnCancelarReserva" onClick="cancelarReserva('${reserva.id}')">Cancelar</button> </td>`;
      trEstado = `<td class="estado-pendiente">${reserva.estado.nombre}</td>`
    }else if (reserva.estado.id == 2){
    trEstado = `<td class="estado-aprobada">${reserva.estado.nombre}</td>`
    }else if (reserva.estado.id == 3){
    trEstado = `<td class="estado-cancelada">${reserva.estado.nombre}</td>`
    }
      
    trReserva += `
            <tr>
                <td>${reserva.id}</td>
                <td>${reserva.fecha}</td>
                <td>${reserva.concierto.nombre}</td>
                <td>${reserva.cantidadEntradas}</td>
                <td>${reserva.totalAPagar}</td>
                ${trEstado}
                ${trCancelar}
            </tr>`
  }
let resumen = sistema.obtenerResumenCliente();
  trReserva += 
  `
  <tr>
                <td colSpan="7" style="background-color:#e0e0e0; font-weight:bold; text-align:center;">Resumen:</td>
  </tr>

  <tr>
                <td></td>
                <td></td>
                <td>Monto total reservas aprobadas</td>
                <td>----</td>
                <td>${sistema.obtenerMontoTotalReservasAprobadasCliente()}</td>
                <td></td>
                <td></td>
    </tr>
  <tr>
                <td></td>
                <td></td>
                <td>Saldo disponible</td>
                <td>----</td>
                <td>${resumen.saldo}</td>
                <td></td>
                <td></td>
    </tr>
  `
  document.querySelector("#tablaReservas").innerHTML = trReserva;
}
function cargarConciertosDisponibles(){
  let conciertos = obtenerListaConciertosFiltro();
  document.querySelector('#contenedorConcierto').innerHTML ="";
  if(conciertos.length<=0)
  document.querySelector('#contenedorConcierto').innerHTML =`<div> No hay conciertos que coincidan con la búsqueda`;

  for(let concierto of conciertos){
    let mostrarConcierto =`
    <div class="tarjeta">
    ${concierto.oferta ? '<span class="badge-oferta"> En oferta</span>' : ''}
      <div class="imgconcierto">
        <img src="${concierto.imagen}" alt="Imagen del Concierto" class="img">
      </div>
  
      <div class="datosConcierto">
        <h3 class="nombreConcierto">${concierto.nombre}</h3>
        <p><b>Artista:</b> ${concierto.artista}</p>
        <p><b>Precio:</b> $${concierto.precio}</p>
        <p><b>Descripción:</b> ${concierto.descripcion}</p>
        <p><b>Cupos disponibles:</b> ${concierto.cuposDisponibles}</p>
        <button class="btnReservar" onClick="abrirPopUpReserva('${concierto.id}')">Reservar entrada</button>
      </div>
    </div>`
    document.querySelector('#contenedorConcierto').innerHTML += mostrarConcierto;

  }
}

let conciertoSeleccionado = null;

function abrirPopUpReserva(idConcierto) {
  let concierto = sistema.obtenerConciertoPorId(idConcierto)
  conciertoSeleccionado = concierto;

  const PopUpReserva = document.querySelector("#PopUpReservaReserva");
  document.querySelector("#PopUpReservaNombreConcierto").innerText = concierto.nombre;
  document.querySelector("#PopUpReservaArtista").innerHTML = `<b>Artista:</b> ${concierto.artista}`;
  document.querySelector("#PopUpReservaPrecio").innerHTML = `<b>Precio:</b> $${concierto.precio}`;
  document.querySelector("#PopUpReservaCupos").innerHTML = `<b>Cupos disponibles:</b> ${concierto.cuposDisponibles}`;
  document.querySelector("#PopUpReservaImagenConcierto").src = concierto.imagen;

  PopUpReserva.style.display = "flex";
}

function cerrarPopUpReserva() {
  document.querySelector("#PopUpReservaReserva").style.display = "none";
}

function confirmarReserva() {
  const cantidad = parseInt(document.querySelector("#cantidadEntradas").value);
  if(sistema.existeReservaClienteLogueado(conciertoSeleccionado))
    return alert("Ya tiene una reserva realizada para este concierto");
  if (cantidad <= 0 ) {
    alert("Cantidad no puede ser menor a 0.");
    return;
  }
  sistema.crearReserva(sistema.obtenerUsuarioLogueado(),conciertoSeleccionado,cantidad,cantidad*conciertoSeleccionado.precio);
  iniciarCliente()
  
  alerta.exito('Reserva confirmada!',`Su reserva para el concierto ${conciertoSeleccionado.nombre} ha sido confirmada`,'Ok')
  // alert(`✅ Reserva confirmada para ${cantidad} entrada(s) de "${conciertoSeleccionado.nombre}"`);
  cerrarPopUpReserva();
}