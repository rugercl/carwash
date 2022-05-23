//Cargar tarjetas a productos.html
const contenedor = document.getElementById('contenedor-productos')
const texto = document.createElement('p')
contenedor.appendChild(texto)

for (const producto of ventasOnline) {

    const div = document.createElement('div')    
    div.className = "producto"
    
    div.innerHTML = `
        <img src=${producto.img} class="img-producto" >
        <h4>${producto.nombre}</h4>
        <p>${producto.desc}</p>
        <p class="precioProducto">${producto.precio}</p>
        <button id="${producto.id}" class="boton-agregar">Agregar</button>
    `
    contenedor.appendChild(div)
}

//constantes a usar en el carrito
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const lisProductos = document.querySelector('#contenedor-productos');
const finalizarCompra = document.querySelector('#finalizar-compra');
const precioTotal = document.getElementById('precioTotal')
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //agrega productos al carrito
    lisProductos.addEventListener('click', agregarProducto )

    //elimina productos del carrito
    carrito.addEventListener('click', eliminarProducto)

    //muestra los productos del localStorage
    document.addEventListener('DOMContentLoaded', ()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    //vaciar el carrito de compras
    vaciarCarrito.addEventListener('click', ()=>{
        //vaciando el carrito
        articulosCarrito = [];

        //limpiando el html
        limpiarHTML();
    })
    

    //Finalizar compra y enviar a MP
    finalizarCompra.addEventListener('click', async ()=>{
        
        const productosMP = articulosCarrito.map( (prod) => {
            return {
                title: prod.titulo,
                description: "",
                picture_url: "",
                category_id: prod.id,
                quantity: prod.cantidad,
                currency_id: "CLP",
                unit_price: parseInt(prod.precio)
            }
        })
        console.log(articulosCarrito)
        console.log(productosMP)
    
    const resp = await fetch('https://api.mercadopago.com/checkout/preferences', {
                        method: 'POST',
                        headers: {
                            Authorization: 'Bearer TEST-1457650983818543-091402-a36162383703b703f6793fc4f7cbc247-93812871'
                        },
                        body: JSON.stringify({
                            items: productosMP,
                        back_urls: {
                            success: 'http://127.0.0.1:5501/productos.html',
                            failure: 'http://127.0.0.1:5501/productos.html'
                        }
                        })
                    })
        
        const data = await resp.json()
        window.location.replace(data.init_point)
    })    
}


function agregarProducto(e){
    e.preventDefault();

    if(e.target.classList.contains('boton-agregar')){
        const proSeleccionado= e.target.parentElement;
        leerProductos(proSeleccionado)
        }
}

function eliminarProducto(e){
    
    if(e.target.classList.contains('borrar-producto')){
        const producId = e.target.getAttribute('id')

        //eliminando
        articulosCarrito = articulosCarrito.filter( produc => produc.id !== producId );

        carritoHTML();
    }

}

function leerProductos(produc){

    const infoProduc={
        imagen: produc.querySelector('img').src,
        titulo: produc.querySelector('h4').textContent,
        precio: produc.querySelector('.precioProducto').innerHTML,
        id: produc.querySelector('button').getAttribute('id'),
        cantidad:1
    }
    console.log(infoProduc)

// revisa si existe producto, para no repetir, sumando la cantidad
    const existe = articulosCarrito.some( produc=> produc.id===infoProduc.id);
    if(existe){
        const product = articulosCarrito.map(produc=>{
            if(produc.id===infoProduc.id){
                produc.cantidad++;
                return produc;
            }else{
                return produc;
            }

        })
        articulosCarrito = [...product]
    }else{

//agregar elementos al carrito
        articulosCarrito = [...articulosCarrito, infoProduc];
    }

    carritoHTML();
}

//muestra el carrito de compras en el html
function carritoHTML(){

    //limpiar el html
    limpiarHTML();

//rrecorrer el carito de compras y mostrar en html
    articulosCarrito.forEach(produc =>{
        const {imagen, titulo, precio, cantidad, id} = produc;
        const row = document.createElement('tr');
        row.innerHTML=`
        <td>
            <img src="${imagen}" width="60">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
        <a href="#" class="borrar-producto" id="${id}">x</>
        </td>        
        `;

    //agregar el html en el carrito
        contenedorCarrito.appendChild(row);
    })
    //agregar el carrito de compras al storage
    sincronizarStorage();

    //informacion del total de la compra del cliente
    let pagar = articulosCarrito.reduce((counter, item)=> counter + (item.precio*item.cantidad),0);
    precioTotal.innerText = pagar;

}

//funcion productos en storage
function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

//elimina los productos del html
function limpiarHTML(){
    
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}


