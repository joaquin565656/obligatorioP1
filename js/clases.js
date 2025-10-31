class Sistema {
    constructor(){
        this.listaDeUsuarios = [
            new Usuario("Joaquín", "Guerra", "joaco", "1234",0),
            new Usuario("123", "123", "jj", "1234",1)
        ]
        this.usuarioLogueado = null;
    }

    obtenerTipoDeLogin(user,pass){
    let usuarios = this.listaDeUsuarios;
    let usuarioEncontrado = null;
    for (let i = 0; i < usuarios.length; i++) {
        let usuario = usuarios[i];
        if (usuario.email === user && usuario.password === pass) {
            usuarioEncontrado = usuario;
            break;
        }
    }

    if (usuarioEncontrado) {
        if(usuarioEncontrado.rol == 0){
            this.usuarioLogueado = usuarioEncontrado;
            return 0;
            
        }else{
            this.usuarioLogueado = usuarioEncontrado;
            return 1;
            
        }
    } else {
        return null;
    }
    }

    lista(){
        return this.listaDeUsuarios;
    }
}

class Usuario {
    constructor(nombre, apellido, email, password,rol) 
    {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.rol = rol ?? 0; // 0: usuario, 1: admin
    }
}