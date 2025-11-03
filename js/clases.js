class Sistema {
    constructor(){
        this.listaDeClientes = [
            new Cliente("Joaquín", "Guerra", "joaco", "1234",10000),
            new Cliente("123", "123", "jj", "1234",10000)

        ]
        this.listaDeAdministradores = [
            new Administrador("admin","1234"),
            new Administrador("administrador","admin123")
        ];
        this.usuarioLogueado = null;
    }

    existeUsuario(user,pass){
    let clientes = this.listaDeClientes;
    let administradores = this.listaDeAdministradores;
    let usuarioEncontrado = null;
    for (let i = 0; i < clientes.length; i++) {
        let cliente = clientes[i];
        if (cliente.nombreUsuario === user && cliente.password === pass) {
            usuarioEncontrado = cliente;
            return 1; //Usuario tipo cliente
        }
    }

        for (let i = 0; i < administradores.length; i++) {
            let admin = administradores[i];
            if (admin.nombreUsuario === user && admin.password === pass) {
                usuarioEncontrado = admin;
                return 0; //Usuario tipo administrador
        }
        }
    return -1; //Usuario no encontrado
    }

    obtenerUsuarioPorNombreUsuario(nombreUsuario){
        for (let cliente of this.listaDeClientes) {
            if (cliente.nombreUsuario.toLowerCase() === nombreUsuario.toLowerCase()) {
                return cliente;
            }
        }

        for (let admin of this.listaDeAdministradores) {
            if (admin.nombreUsuario.toLowerCase() === nombreUsuario.toLowerCase()) {
                return admin;
            }
        }
        return null;
    }
    guardarUsuarioLogueado(nombreUsuario){
        let usuario = this.obtenerUsuarioPorNombreUsuario(nombreUsuario);
        if(usuario == null){
            console.log("Usuario no encontrado");
            return;
        }       
        this.usuarioLogueado = usuario;
    }

    obtenerClientes(){
        return this.listaDeClientes;
    }

    comprobarContrasenia(contrasenia){
        if(contrasenia.length < 5){
            alert("La contraseña debe tener al menos 5 caracteres.");
            return false;
        }
        let tieneMayuscula = false;
        let tieneMinuscula = false;
        let tieneNumero = false;
        for(let i=0; i<contrasenia.length; i++){
             // Verifica si es una letra mayúscula
        if (contrasenia[i] >= "A" && contrasenia[i] <= "Z") {
            tieneMayuscula = true;
        }

        // Verifica si es una letra minúscula
        else if (contrasenia[i] >= "a" && contrasenia[i] <= "z") {
            tieneMinuscula = true;
        }
            if(!isNaN(contrasenia[i])){
                tieneNumero = true;
            }
        }
        if(!tieneMayuscula || !tieneMinuscula || !tieneNumero){
            alert("La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número.");
            return false;
        }
        return true;
    }

    crearCliente(nombre, apellido, nombreUsuario, password){
        let nuevoCliente = new Cliente(nombre, apellido, nombreUsuario, password,10000);
        this.listaDeClientes.push(nuevoCliente);
    }
}

let idCliente = 1;
class Cliente {
    constructor(nombre, apellido, nombreUsuario, password,saldo) 
    {
        this.id = idCliente++;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nombreUsuario = nombreUsuario;
        this.password = password;
        this.saldo = saldo;
    }
}

let idAdministrador = 1;
class Administrador {
    constructor(nombreUsuario, password) {
        this.id = idAdministrador++;
        this.nombreUsuario = nombreUsuario;
        this.password = password;

    }
}
