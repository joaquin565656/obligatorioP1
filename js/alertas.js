class Alertas {
  constructor() {}
  error(titulo, texto, textobtn) {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: "error",
      confirmButtonText: textobtn,
    });
  }
  exito(titulo,texto,tituloBtn){
     Swal.fire({
    title: titulo,
    text: texto,
    icon: 'success',
    confirmButtonText: tituloBtn
  });
  }
  async confirmacion(titulo,texto,icono,textoBtnConfirmar,textoBtnCancelar,mostrarBtnCancelar){
    const result = await Swal.fire({
        title: titulo,
        text: texto,
        icon: icono ?? 'warning',
        confirmButtonText: textoBtnConfirmar,
        cancelButtonText: textoBtnCancelar,
        showCancelButton: mostrarBtnCancelar
    });
    return result.isConfirmed;
  }

  progressBarTimer(titulo,texto,timerMs){
    Swal.fire({
  title: titulo,
  text: texto,
  timer: timerMs,
  timerProgressBar: true,
   didOpen: () => {
    Swal.showLoading();
  }
});
  }

}
