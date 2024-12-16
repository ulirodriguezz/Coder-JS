
const usuario = {
    nombre : "ulises",
    password : "123"
};
const productos = [
    {
        id : 1,
        nombre : "Campera roja",
        precio : 100,
        descuento : 0.1
    },
    {
        id : 2,
        nombre : "Buzo azul",
        precio : 60,
        descuento : 0.3
    },
    {
        id : 3,
        nombre : "Ojotas negras",
        precio : 20,
        descuento : 0.0
    },
    {
        id : 4,
        nombre : "Gorro verde",
        precio : 25,
        descuento : 0.15
    }
];
const menuPrincipal =  "1) Ver Productos \n2) Ir al Carrito \n3) Salir";
let carrito = [];


// INCIO DEL SIMULADOR DE ECOMMERCE
let enSesion = true;
let opcion;
inicioDeSesion();
while(enSesion){
    opcion = parseInt(prompt(menuPrincipal));
    enSesion = manejarOpciones(opcion);
}
// FIN DEL SIMULADOR





function inicioDeSesion (){
    let correcto = false;
    let intentos = 0;
    let INTENTOS_MAX = 5;
    while(!correcto && intentos < 5){
        let nombreUsuario = prompt("ingrese su nombre de usuario");
        let passW = prompt("Ingrese su contraseña");
        correcto = chequearCredenciales(nombreUsuario,passW);
        intentos++;
    }
    while(intentos == INTENTOS_MAX){
        alert("Se ha bloqueado el inicio de sesión");
    }
    alert("Bienvenido!!");
};

function chequearCredenciales (nombreUsuario, password){
    if(nombreUsuario == usuario.nombre && password == usuario.password){
        return true;
    }else{
        alert("Credenciales invalidas");
        return false;
    }
};

function manejarOpciones(opcion){

    switch(opcion){
        case 1: alert(verProductos());break;
        case 2: 
        let informe = opcionCarrito()
        alert(informe);
        break;
        case 3: alert("Gracias por comprar!!");return false;
        default :alert("Opcion invalida");
    }
    return true;
};


function opcionCarrito(){
    let opcion = 4;
    const opciones = "1) Agregar producto \n2) Quitar producto \n3) Confirmar";
        
    while(opcion !== 3){
        opcion = parseInt(prompt(mostrarCarrito() + opciones));
        switch(opcion){
            case 1:
                // Agregar un porducto por ID
                let idProducto = parseInt(prompt(verProductos() + "Ingrese el ID del producto que desea agregar al carrito:"));
                if(!carrito.some(p => p.id === idProducto)){
                    let producto = productos.find(prod => prod.id === idProducto);
                    if(producto != null){
                        producto.cantidad = 1;
                        carrito.push(producto);
                    }
                    else{
                        alert("El producto ingresado no existe");
                    }

                }else{
                    let indice = carrito.findIndex(p => p.id === idProducto);
                    carrito[indice].cantidad += 1;
                }
                break;
            case 2: 
                // Eliminar un producto por ID
                let idAEliminar = parseInt(prompt(mostrarCarrito() + "Ingrese el ID del producto que desea eliminar del carrito:"));
                let indiceProducto = carrito.findIndex(prod => prod.id === idAEliminar)
                carrito.splice(indiceProducto, 1);
                break;
            case 3:break;
            default: alert("Opcion invalida");
        }
    }
    let infromeFinal = informeCarrito();
    carrito = [];
    return infromeFinal;
}

function mostrarCarrito(){
    let msj =   "-----------CARRITO-----------\n";
    let finMsj ="--------------------------------\n";

    if(carrito.length === 0){
        msj = msj + "        No hay productos\n"+finMsj;
        return msj;
    }
    for(const producto of carrito){
        msj = msj + productoAString(producto)+"Cantidad: "+producto.cantidad+"\n";
    }
    return msj + finMsj;
}

function informeCarrito(){
    let montoTotal = 0;
    let msj = "--------------COMPRA--------------\n    Su carrito ha sido confirmado\n";
    let finMsj = "------------------------------------";

    if(carrito.length === 0){
        msj = msj + "    Monto total: $"+montoTotal;
    }
    else{
        for(const producto of carrito){
            montoTotal += (producto.precio * (1-producto.descuento)) * producto.cantidad;
        }
        msj = msj + "    Monto total: $"+montoTotal;
    }
    return msj +"\n"+finMsj;

}

function verProductos(){
    let msj ="";

    for(const prod of productos){
        msj = msj + productoAString(prod);
    }
    return msj;
};

function productoAString(producto){
    return "---------PRODUCTO "+producto.id+"---------\nNombre: "+producto.nombre+"\nPrecio: "+producto.precio+"\nDescuento: "+producto.descuento*100+"%\n";
}