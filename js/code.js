let sistema = new Sistema();

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
    alert("Login exitoso como administrador");
    sistema.guardarUsuarioLogueado(username);
    mostrarSeccion("seccionAdmin");
    llenarTablaClientes();
    return;
  }
  if (usuario == 1) {
    alert("Login exitoso como cliente");
    sistema.guardarUsuarioLogueado(username);
    mostrarSeccion("seccionCliente");
    llenarTablaClientes();
  } else {
    alert("Credenciales inválidas");
  }
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