class Sistema {
    constructor(){
        
        this.listaDeClientes = [];
        this.listaDeAdministradores = [];
        this.listaDeConciertos = [];
        this.listaEstadosReserva = [];
        this.listaReservas = [];
        this.usuarioLogueado = null;
        this.resumenCliente = []
        this.precargar();
    }

    precargar(){
            
        this.listaDeClientes.push(new Cliente("Joaquín", "Guerra", "joaco", "1234",10000))
        this.listaDeClientes.push(new Cliente("123", "123", "jj", "1234",10000))

        
        this.listaDeAdministradores.push(new Administrador("admin","1234"));
        this.listaDeAdministradores.push(new Administrador("administrador","admin123"));

        this.listaDeConciertos.push(new Concierto("Concierto de Michael Jackson","Michael Jackson",120000,'Smooth Criminal','./imagenes/ConciertoMichaelJackson.jpg',100,true,false));
        this.listaDeConciertos.push(new Concierto("Concierto de Shakira","Shakira",6000,'Shakira en vivo','./imagenes/ConciertoShakira.jpg',100,true,false));
        this.listaDeConciertos.push(new Concierto("Concierto de Metallica","Metallica",15000,'Metallica WorldWired Tour','./imagenes/ConciertoMetallica.png',100,true,true));
        this.listaDeConciertos.push(new Concierto("Concierto de ACDC","ACDC",15000,'ACDC Gira','./imagenes/ConciertoACDC.png',100,true,true));
        this.listaDeConciertos.push(new Concierto("Concierto de Bad Bunny","Bad Bunny",8000,'Bad Bunny Live','./imagenes/ConciertoBadBunny.png',100,true,false));
        this.listaDeConciertos.push(new Concierto("Concierto de Taylor Swift","Taylor Swift",20000,'The Eras Tour','./imagenes/ConciertoTaylorSwift.png',100,true,true));

        this.listaEstadosReserva.push(new EstadoReserva("Pendiente", true));
        this.listaEstadosReserva.push(new EstadoReserva("Aprobada", true));
        this.listaEstadosReserva.push(new EstadoReserva("Cancelada", true));

        
        this.listaReservas.push(new Reserva(this.listaDeClientes[0],this.listaDeConciertos[0],6,12000,this.listaEstadosReserva[0],'07/11/2025'));
        this.listaReservas.push(new Reserva(this.listaDeClientes[0],this.listaDeConciertos[1],6,12000,this.listaEstadosReserva[1],'07/11/2025'));
        this.listaReservas.push(new Reserva(this.listaDeClientes[0],this.listaDeConciertos[4],6,12000,this.listaEstadosReserva[2],'07/11/2025'));
        this.listaReservas.push(new Reserva(this.listaDeClientes[0],this.listaDeConciertos[4],6,12000,this.listaEstadosReserva[1],'07/11/2025'));
        this.listaReservas.push(new Reserva(this.listaDeClientes[0],this.listaDeConciertos[4],6,12000,this.listaEstadosReserva[0],'07/11/2025'));
    }

    cerrarSesion(){
        this.usuarioLogueado = null;
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

    obtenerResumenCliente(){
        let cliente = this.obtenerUsuarioLogueado();
        let aprobadas = 0;
        let canceladas = 0;
        let pendientes = 0;
        let saldo = cliente.saldo;
        let reservas = this.listaReservas
        for(let reserva of reservas){
            if(reserva.cliente == cliente){
                console.log(reserva);
                if(reserva.estado.id == 1)
                    pendientes++;
                if(reserva.estado.id == 2)
                    aprobadas++
                if(reserva.estado.id == 3)
                    canceladas++;
            }
        }
        let resumen = new ResumenCliente(cliente,aprobadas,canceladas,pendientes,saldo);
        return resumen;
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

    buscarConciertoPorId(id){
        let conciertos = this.obtenerListaConciertosDisponibles();
        for(let concierto of conciertos){
            if(concierto.id == id)
                return concierto;
        }
        return undefined;
    }

    crearReserva(cliente,concierto,cantidadEntradas,totalAPagar){
        let nuevaReserva = new Reserva(cliente,concierto,cantidadEntradas,totalAPagar,this.obtenerEstadosReserva()[0],new Date().toLocaleDateString());
        this.listaReservas.push(nuevaReserva);
    }
    cambiarEstadoReserva(reserva, nuevoEstado){
        reserva.estado = nuevoEstado;
    }

    obtenerReservasTotalPorClienteLogueado(){
        let reservas = [];
        for(let reserva of this.listaReservas){
            if(reserva.cliente == this.usuarioLogueado){
                reservas.push(reserva);
            }
        }
        return reservas;
    }

    obtenerReservaPorID(idReserva){
        let reservas = this.obtenerReservasTotalPorClienteLogueado();
        for(let reserva of reservas){
            if(reserva.id == idReserva)
                return reserva;
        }
    }
    cancelarReserva(idReserva){
        let reservas = this.obtenerReservasTotalPorClienteLogueado();
        let reserva = this.obtenerReservaPorID(idReserva);
        for(let res of reservas){            
            if(res == reserva){
                res.estado = this.listaEstadosReserva[2];
            }
        }

    }
    existeReservaClienteLogueado(concierto){
        for(let reserva of this.listaReservas){
            if(reserva.cliente.id == this.usuarioLogueado.id && reserva.concierto.id == concierto.id){
                return true;
            }
        }
        return false;
    }

    obtenerEstadosReserva(){
        let estados = [];
        for(let estado of this.listaEstadosReserva){
            if(estado.activo == true){
                estados.push(estado);
            }
        }
        return estados;
    }

    obtenerMontoTotalReservasAprobadasCliente(){
        let monto = 0;
        for(let reserva of this.listaReservas){
            if(reserva.cliente == this.usuarioLogueado && reserva.estado.id == 2){
                monto += reserva.totalAPagar;
            }
        }
        return monto;

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

let estadoReserva = 1;
class EstadoReserva {
    constructor(nombre,activo){
        this.id = estadoReserva++;
        this.nombre = nombre;
        this.activo = activo;
    }
}

let idReserva = 1;
class Reserva {
    constructor(cliente,concierto,cantidadEntradas,totalAPagar,estado,fecha){
        this.id = `RES_ID_${idReserva++}`;
        this.cliente = cliente;
        this.concierto = concierto;
        this.cantidadEntradas = cantidadEntradas;
        this.totalAPagar = totalAPagar;
        this.estado = estado; //obj estado reserva
        this.fecha = fecha;
    }
}

class ResumenCliente {
    constructor(cliente,reservasAprobadas,reservasCanceladas,reservasPendientes,saldo){
        this.cliente = cliente;
        this.reservasAprobadas = reservasAprobadas;
        this.reservasCanceladas = reservasCanceladas;
        this.reservasPendientes = reservasPendientes;
        this.saldo = saldo;
    }
}