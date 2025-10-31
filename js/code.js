let sistema = new Sistema();


function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let login = sistema.obtenerTipoDeLogin(username, password);
    switch (login) {
        case 0:
            console.log("Es admin");
            console.log("usuario logueado es "+sistema.usuarioLogueado.nombre);
            
            break;
        case 1:
            console.log("Es usuario");
            console.log("usuario logueado es "+sistema.usuarioLogueado.nombre);
            break;
        default:
            console.log("Credenciales no son validas");
            break;
    }
}

