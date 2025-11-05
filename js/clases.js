class Sistema {
    constructor(){
       this.precargar();
    }

    precargar(){
 this.listaDeClientes = [
            new Cliente("Joaquín", "Guerra", "joaco", "1234",10000),
            new Cliente("123", "123", "jj", "1234",10000)

        ]
        this.listaDeAdministradores = [
            new Administrador("admin","1234"),
            new Administrador("administrador","admin123")
        ];
        this.usuarioLogueado = null;

        this.listaDeConciertos = [
            new Concierto("Concierto de Michael Jackson","Michael Jackson",120000,'Smooth Criminal','./imagenes/ConciertoMichaelJackson.jpg',100,true,false),
            new Concierto("Concierto de Shakira","Shakira",6000,'Shakira en vivo','./imagenes/ConciertoShakira.jpg',100,true,false),
            new Concierto("Concierto de Shakira","Shakira",6000,'Shakira en vivo','./imagenes/ConciertoShakira.jpg',100,true,false),
            new Concierto("Concierto de Shakira","Shakira",6000,'Shakira en vivo','./imagenes/ConciertoShakira.jpg',100,true,false),
            new Concierto("Concierto de Shakira","Shakira",6000,'Shakira en vivo','./imagenes/ConciertoShakira.jpg',100,true,false),
            new Concierto("Concierto de Shakira","Shakira",6000,'Shakira en vivo','./imagenes/ConciertoShakira.jpg',100,true,false),
            new Concierto("Concierto de Shakira","Shakira",6000,'Shakira en vivo','./imagenes/ConciertoShakira.jpg',100,true,false),
            new Concierto("Concierto de Shakira","Shakira",6000,'Shakira en vivo','./imagenes/ConciertoShakira.jpg',100,true,false),
            new Concierto("Concierto de Shakira","Shakira",6000,'Shakira en vivo','./imagenes/ConciertoShakira.jpg',100,true,false),
            new Concierto("Concierto de Shakira","Shakira",6000,'Shakira en vivo','./imagenes/ConciertoShakira.jpg',100,true,false),
            new Concierto("Concierto de Shakira","Shakira",6000,'Shakira en vivo','./imagenes/ConciertoShakira.jpg',100,true,false),
            new Concierto("Concierto de Shakira","Shakira",6000,'Shakira en vivo','./imagenes/ConciertoShakira.jpg',100,true,false),
            new Concierto("Concierto de Shakira","Shakira",6000,'Shakira en vivo','./imagenes/ConciertoShakira.jpg',100,true,false)
        ];
    }

    existeUsuarioyContrasenia(user,pass){
    let clientes = this.listaDeClientes;
    let administradores = this.listaDeAdministradores;
    let usuarioEncontrado = null;
    for (let i = 0; i < clientes.length; i++) {
        let cliente = clientes[i];
        if (cliente.nombreUsuario.toLowerCase() === user.toLowerCase() && cliente.password === pass) {
            usuarioEncontrado = cliente;
            return 1; //Usuario tipo cliente
        }
    }

        for (let i = 0; i < administradores.length; i++) {
            let admin = administradores[i];
            if (admin.nombreUsuario.toLowerCase() === user.toLowerCase() && admin.password === pass) {
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
    obtenerUsuarioLogueado(){
        return this.usuarioLogueado;
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

    crearConcierto(nombre,artista,precio,descripcion,imagen,cuposDisponibles,oferta){
        let nuevoConcierto = new Concierto(nombre,artista,precio,descripcion,imagen,cuposDisponibles,true,oferta);
        this.listaDeConciertos.push(nuevoConcierto);
    }

    obtenerListaConciertosDisponibles(){
        let lista = [];
        for(let concierto of this.listaDeConciertos){
        if(concierto.estado == true && concierto.cuposDisponibles>0)
        lista.push(concierto)
        }
        return lista;
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

let idConcierto = 1;
class Concierto {
    
    constructor(nombre,artista,precio,descripcion,imagen,cuposDisponibles,estado,oferta){
        this.id = `CON_ID_${idConcierto++}`;
        this.nombre = nombre;
        this.artista = artista;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.cuposDisponibles = cuposDisponibles;
        this.estado = estado;
        this.oferta = oferta;

    }

}
