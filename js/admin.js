function iniciarAdmin(){
    mostrarSeccion("seccionAdmin");
    document.querySelector("#contenedorPanelSuperior").style.display = "flex";
    cargarTablasReservas();
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

