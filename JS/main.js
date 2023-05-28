//Variables
console.log("aqui estoy");



//PRODUCTOS

const productos = [
    {
        "id": "sabana-01",
        "titulo": "Sabana 01",
        "imagen": "./img/sabanas/sabanas-menuchas.jpeg",
        "categoria": {
            "nombre": "Sabanas",
            "id": "sabanas"
        },
        "precio": 1000
    },
    {
        "id": "sabana-02",
        "titulo": "Sabana 02",
        "imagen": "./img/sabanas/sabanas-menuchas2.jpeg",
        "categoria": {
            "nombre": "Sabanas",
            "id": "sabanas"
        },
        "precio": 1000
    },
    {
        "id": "sabana-03",
        "titulo": "Sabana 03",
        "imagen": "./img/sabanas/sabanas-microfibra.png",
        "categoria": {
            "nombre": "Sabanas",
            "id": "sabanas"
        },
        "precio": 1000
    },
    {
        "id": "manta-01",
        "titulo": "Manta 01",
        "imagen": "./img/mantas/frazada-termica.png",
        "categoria": {
            "nombre": "Mantas",
            "id": "mantas"
        },
        "precio": 1000
    },
    {
        "id": "manta-02",
        "titulo": "Manta 02",
        "imagen": "./img/mantas/mantas1.png",
        "categoria": {
            "nombre": "Mantas",
            "id": "mantas"
        },
        "precio": 1000
    },
    {
        "id": "manta-03",
        "titulo": "Manta 03",
        "imagen": "./img/mantas/mantas2.png",
        "categoria": {
            "nombre": "Mantas",
            "id": "mantas"
        },
        "precio": 1000
    },
    {
        "id": "manta-04",
        "titulo": "Manta 04",
        "imagen": "./img/mantas/mantas3.png",
        "categoria": {
            "nombre": "Mantas",
            "id": "mantas"
        },
        "precio": 1000
    },
    {
        "id": "cortina-01",
        "titulo": "Cortina 01",
        "imagen": "./img/cortinas/cortina-con-presilla-faldon.png",
        "categoria": {
            "nombre": "Cortinas",
            "id": "cortinas"
        },
        "precio": 1000
    },
    {
        "id": "cortina-02",
        "titulo": "Cortina 02",
        "imagen": "./img/cortinas/cortina-faldon.jpeg",
        "categoria": {
            "nombre": "Cortinas",
            "id": "cortinas"
        },
        "precio": 1000
    },
    {
        "id": "cortina-03",
        "titulo": "Cortina 03",
        "imagen": "./img/cortinas/cortina-presillas.png",
        "categoria": {
            "nombre": "Cortinas",
            "id": "cortinas"
        },
        "precio": 1000
    },
];

//elementos llamados del HTML

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");





function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";
    //recorrer el array de productos y que los muestre
    productosElegidos.forEach(producto =>{
        //creamos el contenedor de cada producto
        const div = document.createElement("div");
        div.classList.add("producto");
        // dentro del div anterior queremos insertar toda la info
        div.innerHTML = ` 
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `
        //insertamos
        contenedorProductos.append(div);

    })

    actualizarBotonesAgregar();
    
};

//cuando cargue la pagina quiero que me muestre todos los productos
cargarProductos(productos);

//botonCategorias es un array de botones.por cada boton queremos varias cosas 
botonesCategorias.forEach(boton =>{
    boton.addEventListener("click", (e)=>{
        //al darle click al boton se agregue la clase active 

        botonesCategorias.forEach(boton =>{
            boton.classList.remove("active")
        });
        e.currentTarget.classList.add("active");    // aplico current target porque hace referencia al boton + icono, osea que hace referencia al elemento donde aplicamos addeventlistener y no solo el icono. si estaria solo target al dar click en el icono no funciona 

        if(e.currentTarget.id != "todos"){ // si el usuario esta clickeando en los botones que tengan como id , sabanas, mantas o cortinas 
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            //al dar click en alguna categoria quiero que me cargue especificamente los productos de esa categoria. por eso pongo como condicion que coincidan los ids. 
            cargarProductos(productosBoton);
        }else{
            tituloPrincipal.innerText = "Todos los productos"
            cargarProductos(productos); // array principal que contiene todos los productos 
        }
    })


});

function actualizarBotonesAgregar () {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);


    });
    
}

let productosEnCarrito;

const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));
if(productosEnCarritoLS){ //si hay algo en el local storage, si hay algo en el json.parse, que productosEnCarrito sea igual a lo que se traiga del local storage.
    productosEnCarrito = productosEnCarritoLS;
    actualizarNumerito();


}else{
    productosEnCarrito = [];
}

;


//esta funcion tiene que agregar los elemnentos a un array
function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id; // en esta variable se guarda el id del producto que estoy clickeando
    const productoAgregado = productos.find(producto => producto.id === idBoton);// me devuelve todo el objeto, todo el producto.
    
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

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad,0 ) // suma las cantidades de productos que hay agregado en el array productosEnCarrito
    numerito.textContent = nuevoNumerito;
}

