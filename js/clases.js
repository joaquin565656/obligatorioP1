class Sistema {
    constructor(){
        
        this.listaDeClientes = [];
        this.listaDeAdministradores = [];
        this.listaDeConciertos = [];
        this.listaEstadosReserva = [];
        this.listaReservas = [];
        this.usuarioLogueado = null;
        this.resumenCliente = []
        this.ID_ESTADO_PENDIENTE = 1;
        this.ID_ESTADO_APROBADA = 2;
        this.ID_ESTADO_CANCELADA = 3;
        this.precargar();
    }

    precargar(){
            
         // --- CLIENTES ---
    this.listaDeClientes.push(new Cliente("Ana", "Pérez", "anap", "Ana123", 10000));
    this.listaDeClientes.push(new Cliente("Bruno", "García", "brunog", "Bru123", 10000));
    this.listaDeClientes.push(new Cliente("Camila", "Rodríguez", "cami_r", "Cami123", 10000));
    this.listaDeClientes.push(new Cliente("Diego", "Fernández", "diegof", "Diego123", 10000));
    this.listaDeClientes.push(new Cliente("Elena", "López", "elena_l", "Elen123", 10000));
    this.listaDeClientes.push(new Cliente("Federico", "Suárez", "fede_s", "Fede123", 10000));
    this.listaDeClientes.push(new Cliente("Gabriela", "Torres", "gabi_t", "Gabi123", 10000));
    this.listaDeClientes.push(new Cliente("Hernán", "Méndez", "hernanm", "Hern123", 10000));
    this.listaDeClientes.push(new Cliente("Isabel", "Cruz", "isa_c", "Isa123", 10000));
    this.listaDeClientes.push(new Cliente("Joaquín", "Díaz", "joaco_d", "Joaco123", 10000));

        
         // --- ADMINISTRADORES ---
    this.listaDeAdministradores.push(new Administrador("Joaquín", "joaquin", "Admin123"));
    this.listaDeAdministradores.push(new Administrador("Super", "superadmin", "Super123"));
        
    this.listaEstadosReserva.push(new EstadoReserva("Pendiente", true)); // id = 1
    this.listaEstadosReserva.push(new EstadoReserva("Aprobada", true)); //id = 2
    this.listaEstadosReserva.push(new EstadoReserva("Cancelada", true)); //id = 3

        // --- CONCIERTOS ---
        this.listaDeConciertos.push(new Concierto("Smooth Criminal", "Michael Jackson", 3000, "Generado con IA.", "https://i.ytimg.com/vi/q8w1d01Y2vY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCJvi4Gui8sk4qURQdLiYPhuDu3uw", 200, true, false));
        this.listaDeConciertos.push(new Concierto("Rock al Parque", "La Vela Puerca", 1500, "Festival de rock uruguayo.", "https://imgs.elpais.com.uy/dims4/default/89ee5ae/2147483647/strip/true/crop/970x667+15+0/resize/1440x990!/quality/90/?url=https%3A%2F%2Fel-pais-uruguay-production-web.s3.us-east-1.amazonaws.com%2Fbrightspot%2Fuploads%2F2018%2F01%2F17%2F5a5fc53dc4f64.jpeg", 100, true, true));
        this.listaDeConciertos.push(new Concierto("Blues Session", "B.B. King", 2000, "Noche de blues.", "https://runrun.es/wp-content/uploads/2015/05/bb1.jpg", 50, true, true));
        this.listaDeConciertos.push(new Concierto("Metal Fest", "Rata Blanca", 1800, "Metal argentino en vivo.", "https://www.cmtv.com.ar/imagenes_artistas/252.webp", 0, false, false));
        this.listaDeConciertos.push(new Concierto("Pop Night", "Dua Lipa", 2500, "Show internacional de pop.", "https://www.hola.com/horizon/landscape/39e86606e8d5-img0437.jpg", 3, true, false));


        
         // --- RESERVAS ---

    // PENDIENTES 

        // Michael Jackson: 3000 * 2 = 6000
        this.listaReservas.push(new Reserva(this.listaDeClientes[0], this.listaDeConciertos[0], 2, 6000, this.listaEstadosReserva[0], "10/11/2025"));
    
        // B.B. King: 2000 * 5 = 10000 //Cuando la procese debería quedar total a pagar = 900
        this.listaReservas.push(new Reserva(this.listaDeClientes[1], this.listaDeConciertos[2], 5, 10000, this.listaEstadosReserva[0], "10/11/2025"));
    
        // La Vela Puerca: 1500 * 10 = 15000 → -10% = 13500 (saldo insuficiente luego)
        this.listaReservas.push(new Reserva(this.listaDeClientes[9], this.listaDeConciertos[1], 10, 15000, this.listaEstadosReserva[0], "10/11/2025"));
  
   // APROBADAS (se asume saldo y cupos ya descontados)
   
        // La Vela Puerca: 1500 * 4 =6000 - 10%  = 5400
        this.listaReservas.push(new Reserva(this.listaDeClientes[2], this.listaDeConciertos[1], 4, 5400, this.listaEstadosReserva[1], "09/11/2025"));
    
        // Michael Jackson: 3000 * 3 = 9000 
        this.listaReservas.push(new Reserva(this.listaDeClientes[3], this.listaDeConciertos[0], 3, 9000, this.listaEstadosReserva[1], "08/11/2025"));
    
        // Dua Lipa: 2500 * 1 = 2500
        this.listaReservas.push(new Reserva(this.listaDeClientes[4], this.listaDeConciertos[4], 1, 2500, this.listaEstadosReserva[1], "08/11/2025"));

 // CANCELADAS

        // Rata Blanca (pausado): 1800 * 2 = 3600
        this.listaReservas.push(new Reserva(this.listaDeClientes[5], this.listaDeConciertos[3], 2, 3600, this.listaEstadosReserva[2], "09/11/2025"));
      
        // Michael Jackson: 3000 * 10 = 30000 - 10% = 27.000 (saldo insuficiente hipotético)
        this.listaReservas.push(new Reserva(this.listaDeClientes[6], this.listaDeConciertos[0], 10, 27000, this.listaEstadosReserva[2], "09/11/2025"));
       
        // Dua Lipa: 2500 * 3 = 7500 (supera cupo)
        this.listaReservas.push(new Reserva(this.listaDeClientes[7], this.listaDeConciertos[4], 3, 7500, this.listaEstadosReserva[2], "09/11/2025"));
       
        // B.B. King: 2000 * 3 = 6000 (Saldo insuficiente para ese cliente)
        this.listaReservas.push(new Reserva(this.listaDeClientes[2], this.listaDeConciertos[2], 3, 6000, this.listaEstadosReserva[2], "08/11/2025"));
    
        // Descontar cupos de las aprobadas
    this.listaDeConciertos[1].cuposDisponibles -= 4;  // Camila
    this.listaDeConciertos[0].cuposDisponibles -= 3;  // Diego
    this.listaDeConciertos[4].cuposDisponibles -= 1;  // Elena

    // Descontar saldo de los clientes con reservas aprobadas
    this.listaDeClientes[2].saldo -= 5400;
    this.listaDeClientes[3].saldo -= 9000;
    this.listaDeClientes[4].saldo -= 2500;
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

    cambiarEstadoConcierto(idConcierto,estado){
        let concierto = this.obtenerConciertoPorId(idConcierto);
        
        if(concierto == null){
            alert("No se encontró concierto");
            return;
        }
        // Para activar concierto
        if(estado){

            if(concierto.cuposDisponibles<= 0){
                alert("No se puede activar este concierto porque no tiene cupos disponibles");
                return false;
            }
            concierto.estado = true;
            return true;
        }else{
            concierto.estado = false;
            return true;
            
        }
        return false;
    }

    editarConcierto(idConcierto,nombre,artista,precio,descripcion,imagen,cuposDisponibles,oferta){
        let conciertoEditar = null;
        for(let concierto of this.listaDeConciertos){
            if(concierto.id == idConcierto){
                conciertoEditar = concierto;
            }
        }
        let estado = conciertoEditar.estado;
        
        // Verifico si cupos disponibles pasa a 0 lo pongo en estado pausa
        if(cuposDisponibles==0){
            estado = false;
        }
        if(conciertoEditar!=null){            
            conciertoEditar.nombre = nombre;
            conciertoEditar.artista = artista;
            conciertoEditar.precio = precio;
            conciertoEditar.descripcion = descripcion;
            conciertoEditar.imagen = imagen;
            conciertoEditar.cuposDisponibles = cuposDisponibles;
            conciertoEditar.oferta = oferta;
            conciertoEditar.estado = estado;
            return true;

            // Si no encuentra concierto
        }else{
            alert("No se encontró concierto a editar");
            return false; 
        }
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
        return null;
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
        return null;
    }

    cancelarReserva(idReserva){
        let reserva = this.obtenerReservaPorID(idReserva);        
        reserva.estado = this.obtenerEstadoReservaPorId(this.ID_ESTADO_CANCELADA);
    }


    existeReservaClienteLogueado(concierto){
        for(let reserva of this.listaReservas){
            if(reserva.cliente.id == this.usuarioLogueado.id && reserva.concierto.id == concierto.id){                
                if(reserva.estado.id != this.ID_ESTADO_CANCELADA)
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

    agruparReservasPorConcierto(){
        let reservas = sistema.obtenerReservasPorIdEstadoTodas(this.ID_ESTADO_APROBADA);
        let conciertos = this.obtenerListaConciertosTotales();
        let listaAgrupada = [];
        for(let concierto of conciertos){
            let cantidadEntradas = 0;
            let totalAPagar = 0;

            for(let reserva of reservas){
                if(concierto == reserva.concierto){
                    cantidadEntradas +=reserva.cantidadEntradas;
                    totalAPagar += reserva.totalAPagar;
                }
            }
            if(cantidadEntradas > 0)
            listaAgrupada.push(new ResumenGanancias(concierto,cantidadEntradas,totalAPagar));
        }
        return listaAgrupada;
    }
    obtenerTotalRecaudado(){
        let listaAgrupada = sistema.agruparReservasPorConcierto();
        let total = 0;
        for(let reserva of listaAgrupada){
            total += reserva.total;
        }
        return total;
    }
    obtenerClientePorId(idCliente){
        let clientes = this.obtenerClientes();
        for(let cliente of clientes){
            if(cliente.id == idCliente){
                return cliente;
            }
        }
        return null;
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

// Descuento especial
if(reserva.cantidadEntradas>=4){
    reserva.totalAPagar = reserva.totalAPagar * 0.9; // paga el 90% porque se le descuenta un 10 por mas de 4 entradas
}

if(!this.disponeSaldo(reserva.cliente.id,reserva.totalAPagar)){
    this.cancelarReserva(idReserva); 
    alert("Se canceló la reserva por no tener saldo disponible");
    return;
}

if(!this.cuposDisponibles(reserva.concierto.id,reserva.cantidadEntradas)){
    this.cancelarReserva(idReserva);
    alert("Se canceló la reserva por no haber cupos disponibles");
    return;
    
}

if(!reserva.concierto.estado){
    this.cancelarReserva(idReserva);
    alert("Se canceló la reserva porque el concierto no está activo");
    return;
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

alert("La reserva se aprobó");
}

aprobarReserva(idReserva){
    let reserva = this.obtenerReservaPorID(idReserva);
    let estadoAprobado = this.obtenerEstadoReservaPorId(this.ID_ESTADO_APROBADA);
    reserva.estado = estadoAprobado;
}

validarConcierto(nombre,artista,precio,descripcion,imagen,cuposDisponibles,editando){

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
    }    
    if(cuposDisponibles <=0 && editando == false){
        alert("Cantidad de cupos debe ser un número mayor a cero");
        return false;
    }

    if(cuposDisponibles <0 && editando == true){
        alert("Cantidad de cupo no puede ser menor a 0");
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

let idResumenGanancias = 1;
class ResumenGanancias {
    constructor(concierto,cantidadEntradas,total){
        this.id = idResumenGanancias++;
        this.concierto = concierto;
        this.cantidadEntradas = cantidadEntradas;
        this.total = total;
    }
}