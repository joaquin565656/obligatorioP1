function iniciarAdmin(){
    mostrarSeccion("seccionAdmin");
    document.querySelector("#contenedorPanelSuperior").style.display = "flex";
    cargarTablasReservas();
    cargarTablaConciertosAdmin();
    //abrirPopUpCrearConcierto(undefined);
}

const ID_ESTADO_PENDIENTE = 1;
const ID_ESTADO_APROBADAS = 2;
const ID_ESTADO_CANCELADAS = 3;
function cargarTablasReservas(){
    // Pendientes
    document.querySelector("#adminReservasPendientesTBody").innerHTML = cargarTablaPorIdEstado(ID_ESTADO_PENDIENTE)
    // Aprobadas
    document.querySelector("#adminReservasAprobadasTBody").innerHTML = cargarTablaPorIdEstado(ID_ESTADO_APROBADAS)
    // Canceladas
    document.querySelector("#adminReservasCanceladasTBody").innerHTML = cargarTablaPorIdEstado(ID_ESTADO_CANCELADAS)
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

function cambiarEstadoConcierto(idConcierto,estado){
    console.log(idConcierto);
    
    if(sistema.cambiarEstadoConcierto(idConcierto,estado)){
        iniciarAdmin();
    }
}
function pausarConcierto(idConcierto){
    
    if(sistema.pausarConcierto(idConcierto)){
        iniciarAdmin();
    }
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
            <td>
            <div class="contenedorAcciones">
                <button type="button" onClick="abrirPopUpCrearConcierto('${concierto.id}')" class="btnModificar">Modificar </button> 
                ${!concierto.estado ? 
                    `<button type = "button" class="estadoActivar" onClick="cambiarEstadoConcierto('${concierto.id}',true)">Activar </button>`:
                    `<button type = "button" class="estadoPausa" onClick="cambiarEstadoConcierto('${concierto.id}',false)">Pausar </button>`
            }
            </div>
            </td>
           
        </tr>`
    }
    document.querySelector("#tablaConciertosAdmin").innerHTML = trConcierto;
}

function cerrarPopUpCrearConcierto(){
        document.getElementById("PopUpCrearConcierto").style.display = "none";   
}

let idConciertoEditando = null;
function abrirPopUpCrearConcierto(idConcierto){
    document.getElementById("PopUpCrearConcierto").style.display = "flex";
    let form = document.querySelector("#formCrearConcierto");
    // Está editando
    if(idConcierto!=null){
        idConciertoEditando = idConcierto;
        let concierto = sistema.obtenerConciertoPorId(idConcierto);

    let nombre = document.querySelector("#nombreConcierto").value = concierto.nombre;
    let artista = document.querySelector("#artistaConcierto").value = concierto.artista;
    let precio = document.querySelector("#precioConcierto").value = concierto.precio;
    let descripcion = document.querySelector("#descripcionConcierto").value = concierto.descripcion;
    let imagen = document.querySelector("#imagenConcierto").value = concierto.imagen;
    let cuposDisponibles = document.querySelector("#cuposDisponiblesConcierto").value = concierto.cuposDisponibles;
    let oferta = document.querySelector("#chkOfertaConcierto").checked = concierto.oferta;

    
    document.querySelector("#btnCrearConcierto").textContent = `Guardar Cambios`
            


    }else{
        // Está creando
        idConciertoEditando = null;
        form.reset();
        document.querySelector("#btnCrearConcierto").textContent = "Crear"

        
    }
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

    // si es un concierto nuevo
    
if(idConciertoEditando== null){    
    sistema.crearConcierto(nombre,artista,precio,descripcion,imagen,cuposDisponibles,oferta);
    alert("Concierto creado correctamente");
}else{
    if(sistema.editarConcierto(idConciertoEditando, nombre,artista,precio,descripcion,imagen,cuposDisponibles,oferta))
        alert("Concierto editado correctamente");
}

iniciarAdmin();
form.reset();
cerrarPopUpCrearConcierto();
    
}