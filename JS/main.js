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

console.log(botonesAgregar);



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
    
}
