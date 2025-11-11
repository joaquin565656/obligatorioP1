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

        
        this.listaDeAdministradores.push(new Administrador("Joaquín","admin","1234"));
        this.listaDeAdministradores.push(new Administrador("Prueba","administrador","admin123"));

        this.listaDeConciertos.push(new Concierto("Concierto de Michael Jackson","Michael Jackson",160000,'Smooth Criminal','./imagenes/ConciertoMichaelJackson.jpg',4,true,false));
        this.listaDeConciertos.push(new Concierto("Concierto de Shakira","Shakira",6000,'Shakira en vivo','./imagenes/ConciertoShakira.jpg',100,true,false));
        this.listaDeConciertos.push(new Concierto("Concierto de Metallica","Metallica",15000,'Metallica WorldWired Tour','./imagenes/ConciertoMetallica.png',100,true,true));
        this.listaDeConciertos.push(new Concierto("Concierto de ACDC","ACDC",15000,'ACDC Gira','./imagenes/ConciertoACDC.png',100,true,true));
        this.listaDeConciertos.push(new Concierto("Concierto de Bad Bunny","Bad Bunny",8000,'Bad Bunny Live','./imagenes/ConciertoBadBunny.png',100,true,false));
        this.listaDeConciertos.push(new Concierto("Concierto de Taylor Swift","Taylor Swift",20000,'The Eras Tour','./imagenes/ConciertoTaylorSwift.png',100,true,true));

        this.listaEstadosReserva.push(new EstadoReserva("Pendiente", true));
        this.listaEstadosReserva.push(new EstadoReserva("Aprobada", true));
        this.listaEstadosReserva.push(new EstadoReserva("Cancelada", true));

        
        this.listaReservas.push(new Reserva(this.listaDeClientes[0],this.listaDeConciertos[0],4,8000,this.listaEstadosReserva[0],'07/11/2025'));
        this.listaReservas.push(new Reserva(this.listaDeClientes[0],this.listaDeConciertos[1],4,14000,this.listaEstadosReserva[1],'07/11/2025'));
        this.listaReservas.push(new Reserva(this.listaDeClientes[0],this.listaDeConciertos[4],6,16000,this.listaEstadosReserva[2],'07/11/2025'));
        this.listaReservas.push(new Reserva(this.listaDeClientes[0],this.listaDeConciertos[4],8,20000,this.listaEstadosReserva[1],'07/11/2025'));
        this.listaReservas.push(new Reserva(this.listaDeClientes[0],this.listaDeConciertos[4],10,18000,this.listaEstadosReserva[0],'07/11/2025'));
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

    obtenerListaConciertosTotales(){
        return this.listaDeConciertos;
    }
    obtenerListaConciertosDisponibles(){
        let lista = [];
        for(let concierto of this.listaDeConciertos){
        if(concierto.estado == true && concierto.cuposDisponibles>0)
        lista.push(concierto)
        }
        return lista;
    }

    obtenerConciertoPorId(id){        
        let conciertos = this.listaDeConciertos;
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
    
    obtenerTodasLasReservas(){
        return this.listaReservas;
    }

    obtenerReservaPorID(idReserva){
        let reservas = this.obtenerTodasLasReservas();
        for(let reserva of reservas){
            if(reserva.id == idReserva)
                return reserva;
        }
    }
    
    obtenerEstadoReservaPorId(idEstado){
        let estados = this.obtenerEstadosReserva();
        for(let estado of estados){
            if(estado.id == idEstado){
                return estado
            }
        }
        return undefined;
    }
    cancelarReserva(idReserva){
        let reserva = this.obtenerReservaPorID(idReserva);        
        reserva.estado = this.obtenerEstadoReservaPorId(3);
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

    obtenerReservasPorIdEstadoTodas(idEstado){
        let lista = [];
        for(let reserva of this.listaReservas){
            if(reserva.estado.id == idEstado){
                lista.push(reserva);
            }
        }
        return lista;
    }

    obtenerClientePorId(idCliente){
        let clientes = this.obtenerClientes();
        for(let cliente of clientes){
            if(cliente.id == idCliente){
                return cliente;
            }
        }
        return undefined;
    }

    disponeSaldo(idCliente,totalAPagar){
        let cliente = this.obtenerClientePorId(idCliente);
        let saldo = cliente.saldo;
        if(totalAPagar <= saldo){
            return true;
        }
        return false;
    }

    cuposDisponibles(idConcierto,entradas){
        let concierto = this.obtenerConciertoPorId(idConcierto);
        if(concierto.cuposDisponibles>= entradas){
            return true;
        }
        return false;
    }

procesarReserva(idReserva){
let reserva = this.obtenerReservaPorID(idReserva)

if(!this.disponeSaldo(reserva.cliente.id,reserva.totalAPagar)){
    this.cancelarReserva(idReserva);
    iniciarAdmin();   
    alert("Se canceló la reserva por no tener saldo disponible");
    return;
}

if(!this.cuposDisponibles(reserva.concierto.id,reserva.cantidadEntradas)){
    this.cancelarReserva(idReserva);
    iniciarAdmin();
    alert("Se canceló la reserva por no haber cupos disponibles");
    return;
    
}

if(!reserva.concierto.estado){
    this.cancelarReserva(idReserva);
    iniciarAdmin();
    alert("Se canceló la reserva porque el concierto no está activo");
    return;
}

// Descuento especial
if(reserva.cantidadEntradas>=4){
    reserva.totalAPagar = reserva.totalAPagar * 0.9; // paga el 90% porque se le descuenta un 10 por mas de 4 entradas
}
// Apruebo reserva
this.aprobarReserva(idReserva);
// Descuento saldo
reserva.cliente.saldo -= reserva.totalAPagar;
// Descuento cupos
reserva.concierto.cuposDisponibles -= reserva.cantidadEntradas;

if(reserva.concierto.cuposDisponibles<=0){
    reserva.concierto.estado = false;
}
// Actualizo los datos
iniciarAdmin();
}

aprobarReserva(idReserva){
    let reserva = this.obtenerReservaPorID(idReserva);
    let estadoAprobado = this.obtenerEstadoReservaPorId(2);
    reserva.estado = estadoAprobado;
}

validarConcierto(nombre,artista,precio,descripcion,imagen,cuposDisponibles,form){
    console.log(nombre);
    console.log(artista);
    
   if (!form.reportValidity()) {
    return false;
  }

// Verifico para asegurarme que tenga datos
  if(nombre =="" || artista =="" || descripcion == "" || imagen =="" ){
    alert("Complete todos los campos")
    return false;
  }

    if(isNaN(precio)){
        alert("Ingrese precio solamente en números")
        return false;
    }
    
    if(isNaN(cuposDisponibles)){
        alert("Ingrese cantidad de cupos disponibles solamente en números")
        return false;
    }

    if(precio <=0){
        alert("Precio debe ser un número mayor a cero");
        return false;
    }else if(cuposDisponibles <=0){
        alert("Cantidad de cupos debe ser un número mayor a cero");
        return false;
    }
    return true;
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
    constructor(nombre,nombreUsuario, password) {
        this.id = idAdministrador++;
        this.nombre = nombre;
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