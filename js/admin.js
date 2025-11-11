function iniciarAdmin(){
    mostrarSeccion("seccionAdmin");
    document.querySelector("#contenedorPanelSuperior").style.display = "flex";
    cargarTablasReservas();
    cargarTablaConciertosAdmin();
    abrirPopUpCrearConcierto();
}

function cargarTablasReservas(){
    // Pendientes
    document.querySelector("#adminReservasPendientesTBody").innerHTML = cargarTablaPorIdEstado(1)
    // Aprobadas
    document.querySelector("#adminReservasAprobadasTBody").innerHTML = cargarTablaPorIdEstado(2)
    // Canceladas
    document.querySelector("#adminReservasCanceladasTBody").innerHTML = cargarTablaPorIdEstado(3)
}

function cargarTablaPorIdEstado(idEstado){
    let reservas = sistema.obtenerReservasPorIdEstadoTodas(idEstado);
    let trReserva = "";
    for(let reserva of reservas){
        trReserva +=
        `
        <tr>
            <td>${reserva.id}</td>
            <td>${reserva.fecha}</td>
            <td>${reserva.concierto.nombre}</td>
            <td>${reserva.cantidadEntradas}</td>
            <td>${reserva.totalAPagar}</td>
            ${idEstado == 1 ? `<td><button type="button" class="btnProcesarReserva" onClick="sistema.procesarReserva('${reserva.id}')">Procesar</button></td>` : ''}
        </tr>
        `
    }

    return trReserva;
}

function cargarTablaConciertosAdmin(){
    let conciertos = sistema.obtenerListaConciertosTotales();
    let trConcierto = "";
    for(let concierto of conciertos)
    {
        trConcierto += 
        `<tr>
            <td>${concierto.id} </td>
            <td>${concierto.nombre} </td>
            <td>${concierto.artista} </td>
            <td>${concierto.cuposDisponibles} </td>
            <td>${concierto.estado ? 'Activo':'Pausa'} </td>
            <td><input type = "checkbox" ${concierto.oferta ? 'checked': ''} disabled></checkbox> </td>
            <td><button type = "button">Modificar </button> </td>
        </tr>`
    }
    document.querySelector("#tablaConciertosAdmin").innerHTML = trConcierto;
}

function cerrarPopUpCrearConcierto(){
        document.getElementById("PopUpCrearConcierto").style.display = "none";   
}

function abrirPopUpCrearConcierto(){
    document.getElementById("PopUpCrearConcierto").style.display = "flex";
}

function crearConcierto(){
    let nombre = document.querySelector("#nombreConcierto").value;
    let artista = document.querySelector("#artistaConcierto").value;
    let precio = Number(document.querySelector("#precioConcierto").value);
    let descripcion = document.querySelector("#descripcionConcierto").value;
    let imagen = document.querySelector("#imagenConcierto").value;
    let cuposDisponibles = document.querySelector("#cuposDisponiblesConcierto").value;
    let oferta = document.querySelector("#chkOfertaConcierto").checked;
    let form = document.querySelector("#formCrearConcierto");

    if(!sistema.validarConcierto(nombre,artista,precio,descripcion,imagen,cuposDisponibles,form)){
       return;   
    }

    sistema.crearConcierto(nombre,artista,precio,descripcion,imagen,cuposDisponibles,oferta);
    alert("Concierto creado correctamente");
    iniciarAdmin();
    form.reset();
    cerrarPopUpCrearConcierto();
 
    
}