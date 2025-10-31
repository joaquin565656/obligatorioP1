let sistema = new Sistema();


function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let login = sistema.obtenerTipoDeLogin(username, password);
    switch (login) {
        case 0:
            console.log("Es admin");
            console.log("usuario logueado es "+sistema.usuarioLogueado.nombre);

            document.querySelector("#seccionAdmin").style.display = "block";
            document.querySelector("#contenedorLogin").style.display = "none";
            llenarTablaUsuarios();
            
            break;
        case 1:
            console.log("Es usuario");
            console.log("usuario logueado es "+sistema.usuarioLogueado.nombre);
            break;
        default:
            console.log("Credenciales no son validas");
            break;
    }

    function llenarTablaUsuarios(){
        let tablaUsuarios = document.getElementById("tablaUsuarios");
        let usuarios = sistema.obtenerUsuarios();
        let filas ="";
        for (let usuario of usuarios) {
            filas += `
                <tr>
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.email}</td>
                </tr>
            `;
        }
        tablaUsuarios.innerHTML = filas;
    }
}

