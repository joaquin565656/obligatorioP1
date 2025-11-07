let sistema = new Sistema();

window.addEventListener('load',inicio);

function inicio(){ 
  // login();

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
    mostrarSeccion("seccionAdmin");
    llenarTablaClientes();
    document.querySelector("#contenedorPanelSuperior").style.display = "flex";
    return;
  }
  if (usuario == 1) {
    // alert("Login exitoso como cliente");
    sistema.guardarUsuarioLogueado(username);
    mostrarSeccion("seccionCliente");
    cargarConciertosDisponibles();
    llenarTablaClientes();
    cargarReservasRealizadas();
    document.querySelector("#contenedorPanelSuperior").style.display ="flex";

    
  } else {
    alert("Credenciales inválidas");
    return;
  }

  let usuarioLogueado = sistema.obtenerUsuarioLogueado();
  let contenedorPanelSuperior = `<b>Usuario: ${usuarioLogueado.nombre}</b>
  <button type="button" onclick="cerrarSesion()" class="btnCerrarSesion">Cerrar Sesión</button>`
  document.querySelector('#contenedorPanelSuperior').innerHTML = contenedorPanelSuperior;
}

function llenarTablaClientes() {
  let tablaClientes = document.getElementById("tablaClientes");
  let clientes = sistema.obtenerClientes();
  let filas = "";
  for (let cliente of clientes) {
    filas += `
                <tr>
                    <td>${cliente.id}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.apellido}</td>
                </tr>
            `;
  }
  tablaClientes.innerHTML = filas;
}

function registrarCliente() {
  let form = document.querySelector("#registroCliente");
  if (!form.reportValidity()) {
    console.log("Formulario no válido");
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
function cargarReservasRealizadas(){
  let reservas = sistema.obtenerReservasTotal();
  let trReserva = "";
  for(let reserva of reservas){
    trReserva += `
            <tr>
                <td>${reserva.id}</td>
                <td>${reserva.fecha}</td>
                <td>${reserva.concierto.nombre}</td>
                <td>${reserva.cantidadEntradas}</td>
                <td>${reserva.estado.nombre}</td>
            </tr>`
  }
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
        <p><b>Cupos disponibles:</b> ${concierto.cuposDisponibles}</p>
        <button class="btnReservar" onClick="abrirPopUpReserva('${concierto.id}')">Reservar entrada</button>
      </div>
    </div>`
    document.querySelector('#contenedorConcierto').innerHTML += mostrarConcierto;

  }
}

let conciertoSeleccionado = null;

function abrirPopUpReserva(idConcierto) {
  let concierto = sistema.buscarConciertoPorId(idConcierto)
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
  cargarReservasRealizadas();
  
  alert(`✅ Reserva confirmada para ${cantidad} entrada(s) de "${conciertoSeleccionado.nombre}"`);
  cerrarPopUpReserva();
  cargarConciertosDisponibles(); // actualiza la lista
}