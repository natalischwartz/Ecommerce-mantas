// si hay ago dentro del carrito queremos que el mensaje de "tu carrito esta vacio" desaparezca
//traemos la info del local storage
const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const textoCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const textoCarritoComprado = document.querySelector("#carrito-comprado");



if(productosEnCarrito){//si hay productos en carrito hacer algo en particular 
    textoCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    textoCarritoComprado.classList.add("disabled");
}else{

}
