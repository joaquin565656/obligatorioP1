let sistema = new Sistema();

window.addEventListener('load',inicio);

function inicio(){ 
  login();

}
function cerrarSesion(){

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
    return;
  }
  if (usuario == 1) {
    // alert("Login exitoso como cliente");
    sistema.guardarUsuarioLogueado(username);
    mostrarSeccion("seccionCliente");
    cargarConciertosDisponibles();
    llenarTablaClientes();
    
  } else {
    alert("Credenciales inválidas");
    return;
  }

  let usuarioLogueado = sistema.obtenerUsuarioLogueado();
  let contenedorPanelSuperior = `<strong>Usuario: ${usuarioLogueado.nombre}</strong>
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
  return conciertos;
}
function cargarConciertosDisponibles(){
  let conciertos = obtenerListaConciertosFiltro();
  document.querySelector('#contenedorConcierto').innerHTML ="";
  if(conciertos.length<=0)
  document.querySelector('#contenedorConcierto').innerHTML =`<div clas="tarjeta"> No hay conciertos que coincidan con la búsqueda`;

  for(let concierto of conciertos){
    let mostrarConcierto =` <div class="tarjeta" id="tarjetaConcierto">
      <div class="imgconcierto">
        <img src="${concierto.imagen}" alt="Imagen del Concierto" class="img">
      </div>
  
      <div class="datosConcierto">
        <h3 class="nombreConcierto">${concierto.nombre}</h3>
        <p><strong>Artista:</strong> ${concierto.artista}</p>
        <p><strong>Precio:</strong> $${concierto.precio}</p>
        <p><strong>Cupos disponibles:</strong> ${concierto.cuposDisponibles}</p>
        <button type="button" class="btnReservar">Reservar entrada</button>
      </div>
    </div>`
    document.querySelector('#contenedorConcierto').innerHTML += mostrarConcierto;

  }
}