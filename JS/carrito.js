// si hay ago dentro del carrito queremos que el mensaje de "tu carrito esta vacio" desaparezca
//traemos la info del local storage
const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const textoCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const textoCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
console.log(botonesEliminar);

function cargarProductosCarrito() {
    if(productosEnCarrito){//si hay productos en carrito hacer algo en particular 
        textoCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        textoCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        //que los productos agregados se muestren en el contenedorCarritoProductos
        productosEnCarrito.forEach(productoEnCarrito => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML= `
                <img class="carrito-producto-imagen" src="${productoEnCarrito.imagen}" alt="${productoEnCarrito.titulo}">
                <div class="carrito-producto-titulo">
                    <small class="mx-auto">Título</small>
                    <h3 class="text-center">${productoEnCarrito.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small class="mx-auto">Cantidad</small>
                    <p class="text-center">${productoEnCarrito.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small class="mx-auto" >Precio</small>
                    <p class="text-center">${productoEnCarrito.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small class="mx-auto">Subtotal</small>
                    <p class="text-center">${productoEnCarrito.cantidad * productoEnCarrito.precio}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${productoEnCarrito.id}">
                    <i class="bi bi-trash3-fill"></i>
                </button>  
        `;
    
        contenedorCarritoProductos.append(div);
    
        });
    
    }else{
        //asi va acargar la pagina de carrito siempre
    
        textoCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        textoCarritoComprado.classList.add("disabled");
    }
    
    actualizarBotonesEliminar();
}
cargarProductosCarrito(); //queremos que se ejecute cuando carga la pagina y tambien que se ejecute cuando eliminamos un producto y se vuelvan a mostrar los productos nuevos del array y se refleje visualmente en la pagina de carrito

function actualizarBotonesEliminar () {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)});
    
}

function eliminarDelCarrito(e){
    const idBotonEliminar = e.currentTarget.productoEnCarrito.id;
    const productoEliminado = productos.find(producto => producto.id === idBoton);// me devuelve todo el objeto, todo el producto.
    
    //si agregamos el mismo producto y ya se encuentra en el carrito , no quiero que se vuelva a agregar, sino que aumente la cantidad.
    //chequeamos que el producto clickeado exista en el array de productosEnCarrito
    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        // si nos devuelve true, subirle la cantidad
        //buscamos el index del producto que ya existe en el carrito 
    const index = productosEnCarrito.findIndex(producto => producto.id ===idBoton);
    productosEnCarrito[index].cantidad++

    }else{
        productoAgregado.cantidad = 1; // estoy agregando en el objeto una nueva propiedad, cantidad: 1.
        productosEnCarrito.push(productoAgregado);
    } 
    //cada vez que agrego un producto al carrito, se actualice el numerito
    actualizarNumerito();
    
    //cada vez que agregamos algo al carrito lo guardamos en el local storage
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

