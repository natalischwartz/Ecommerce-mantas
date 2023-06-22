// si hay ago dentro del carrito queremos que el mensaje de "tu carrito esta vacio" desaparezca
//traemos la info del local storage
const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const textoCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const textoCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
console.log(botonesEliminar);
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
console.log(contenedorTotal);
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito() {
    if(productosEnCarrito && productosEnCarrito.length > 0 ){//si hay productos en carrito hacer algo en particular 
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
        //asi va acargar la pagina de carrito siempre. Me aseguro que siempre pase esto 
    
        textoCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        textoCarritoComprado.classList.add("disabled");
    }
    
    actualizarBotonesEliminar();
    actualizarTotal();

}
cargarProductosCarrito(); //queremos que se ejecute cuando carga la pagina y tambien que se ejecute cuando eliminamos un producto y se vuelvan a mostrar los productos nuevos del array y se refleje visualmente en la pagina de carrito

function actualizarBotonesEliminar () {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)});
    
}



function eliminarDelCarrito(e){
    
    const idBoton = e.currentTarget.id
    console.log(idBoton); //nos trae el id de ese producto

    //cuando hago click en el boton eliminar quiero que pasen varias cosas 
    //necesito que busque  cual es el producto en el array de productos en carrito
    
    console.log(productosEnCarrito)

    //traemos el index de ese producto , y hacemos un splice para eliminarlo del array
    const index = productosEnCarrito.findIndex(productoEnCarrito => productoEnCarrito.id ===idBoton)
    console.log(index);

    productosEnCarrito.splice(index,1)

    console.log(productosEnCarrito)

    cargarProductosCarrito();

    //que se guarde la actualizacion en el local storage

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}


botonVaciar.addEventListener("click", vaciarCarrito);
//boton vaciar
function vaciarCarrito(){
    productosEnCarrito.length = 0; // eliminamos todo del array 
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

// el total que se calcule cada vez que se cargan los productos en carrito 

function actualizarTotal(){

    const totalCalculado = productosEnCarrito.reduce((acc, productoEnCarrito) => acc + (productoEnCarrito.cantidad*productoEnCarrito.precio),0 );
    console.log(totalCalculado);
    
    contenedorTotal.textContent = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
//boton comprar ahora 
function comprarCarrito(){

    productosEnCarrito.length = 0; // que limpie todo , que quede el array vacio 
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    textoCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    textoCarritoComprado.classList.remove("disabled");
    
}