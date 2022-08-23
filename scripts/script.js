let stockProductos=[];
let carrito=[];
const contenedorProductos = document.getElementById("contenedor-productos"); //Main que contiene todo

if(!localStorage.getItem('stockSave')) //Es que no existe la variable en el local storage.
{ 
  const stockInicial=[
                      {id:0, nombre: "TRANQUILA", ref: "RF21A", stock: 200, desc: "Perfecto para tí", precio: 7990, talle:"L", img:'../imgs/pintaU1.jpg', imgMin:'../imgs/min1.jpg'},
                      {id:1, nombre: "AUSENTE", ref: "RF22E", stock: 200, desc: "Perfecto para tí", precio: 6990, talle:"L", img:'../imgs/pintaU2.jpg', imgMin:'../imgs/min2.jpg'},
                      {id:2, nombre: "SOLTERA", ref: "RF330", stock: 200, desc: "Perfecto para tí", precio: 5990, talle:"L", img:'../imgs/pintaU3.jpg', imgMin:'../imgs/min3.jpg'},
                      {id:3, nombre: "LINDA", ref: "RF412", stock: 200, desc: "Perfecto para tí", precio: 8990, talle:"L", img:'../imgs/pintaU4.jpg', imgMin:'../imgs/min4.jpg'}
                    ];
 stockProductos=stockInicial; //hago el stockProductos con los valores iniciales
 localStorage.setItem('stockSave', JSON.stringify(stockInicial));
}
else{  
      stockProductos= JSON.parse(localStorage.getItem('stockSave'));
}


stockProductos.forEach((producto)=>{
  //console.log("Linea 22: Pasa por el forech");
  const div = document.createElement('div');
  div.classList.add('producto'); //Adicionando una clase al div.
  const codeCard = `
  <img src=${producto.img} alt="imagen">
  <h3>${producto.nombre}</h3>
  <p>${producto.ref}</p>
  <p>Unidades disponibles: ${producto.stock}</p>
  <p class="PrecioProducto">Precio: $${producto.precio}</p>
  <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas-fa-shopping-cart"></i></button>
  `; 
  div.innerHTML=codeCard;
  contenedorProductos.appendChild(div);

});


const contenedorCarrito = document.getElementById(`carrito-contenedor`);
const boton1= document.getElementById(`agregar0`);
const boton2= document.getElementById(`agregar1`);
const boton3= document.getElementById(`agregar2`);
const boton4= document.getElementById(`agregar3`);
/*const botonEli1= document.getElementById(`eliminarRF21A`);
const botonEli2= document.getElementById(`eliminarRF22E`);
const botonEli3= document.getElementById(`eliminarRF330`);
const botonEli4= document.getElementById(`eliminarRF412`);
*/
const precioTotal= document.getElementById(`precio-total`);
const botonPay = document.getElementById(`btn-pay`);
const botonVaciar = document.getElementById(`boton-vaciar`);


boton1.addEventListener('click', function(e){
  const i=0;
  addToCar(i); 
})

boton2.addEventListener('click', function(e){
  const i=1;
  addToCar(i); 
})

boton3.addEventListener('click', function(e){
  const i=2;
  addToCar(i); 
})

boton4.addEventListener('click', function(e){
  const i=3;
  addToCar(i); 
})

/*
botonEli1.addEventListener('click', function(e){
  const referencia="RF21A"; //Esta es la referncia.
  let nuevoCarrito=[];//un array vacio;
  document.getElementById(referencia).outerHTML = ""; //se saca el elemento CSS del carrito.
  nuevoCarrito = carrito.filter(item=>item.ref!=referencia);
  carrito=nuevoCarrito;
 })

 botonEli2.addEventListener('click', function(e){
  const referencia="RF22E"; //Esta es la referncia.
  let nuevoCarrito=[];//un array vacio;
  document.getElementById(referencia).outerHTML = ""; //se saca el elemento CSS del carrito.
  nuevoCarrito = carrito.filter(item=>item.ref!=referencia);
  carrito=nuevoCarrito;
 })

 botonEli3.addEventListener('click', function(e){
  const referencia="RF330"; //Esta es la referncia.
  let nuevoCarrito=[];//un array vacio;
  document.getElementById(referencia).outerHTML = ""; //se saca el elemento CSS del carrito.
  nuevoCarrito = carrito.filter(item=>item.ref!=referencia);
  carrito=nuevoCarrito;
 })

 botonEli4.addEventListener('click', function(e){
  const referencia="RF412"; //Esta es la referncia.
  let nuevoCarrito=[];//un array vacio;
  document.getElementById(referencia).outerHTML = ""; //se saca el elemento CSS del carrito.
  nuevoCarrito = carrito.filter(item=>item.ref!=referencia);
  carrito=nuevoCarrito;
 })

 //<div><button id="Eliminar${carrito[indice].ref}" class="boton-eliminar">Eliminar <i class="fas-fa-shopping-cart"></i></button></div>

*/
 
botonVaciar.addEventListener('click', function(e){

  if(carrito.length!=0)//es que si hay algo en el carrito.
  {   for (let i=0; i<carrito.length; i++)
      {   document.getElementById(`${carrito[i].ref}`).outerHTML = ""; //se saca el elemento CSS del carrito.
      } 
               
      carrito=[]; //El carrito lo vuelve vacio
      precioTotal.textContent=0; //El precio total lo vuelve 0
      //window.location.reload();//como hago un submit
  }
})



botonPay.addEventListener('click', function(e){
  // 1. descontar del stockDeProductos solo sería cambiar la cantidad restando la cantidad del carrito.
  //2. Debería guardar en el localstorage ese nuevo stock variable stocksave
  //llevar el array carrito a vacio [] y el total tambien llevarlo a cero.
  //sacar todos los elementos del contenedor de carrito y un outer vacio.
  
  if(carrito.length!=0)//es que si hay algo en el carrito.
  {   for (let i=0; i<carrito.length; i++)
      {   const indice = stockProductos.findIndex(item=>item.ref===carrito[i].ref); //Esto si fuera un array sencillo, pero es un array de objetos.: 
          console.log(`Linea 81: ${indice}`);
          stockProductos[indice].stock =  parseInt(stockProductos[indice].stock)- parseInt(carrito[i].cantidad);
          //console.log(`Linea 82: stockProductos ${stockProductos[indice].stock}`);
          document.getElementById(`${carrito[i].ref}`).outerHTML = ""; //se saca el elemento CSS del carrito.
      } //1. descontar del stockDeProductos solo sería cambiar la cantidad restando la cantidad del carrito.
      
      //console.log(`Linea 86: el JSON ${JSON.stringify(stockProductos)}`);
      localStorage.setItem('stockSave', JSON.stringify(stockProductos));//2. Debería guardar en el localstorage ese nuevo stock variable stocksave
          
      carrito=[]; //El carrito lo vuelve vacio
      precioTotal.textContent=0; //El precio total lo vuelve 0
      window.location.reload();//como hago un submit
  }
})

function buscarEnCarrito(objeto)
{ /*console.log(`entró a buscar En Carrito${[...objeto]}`)*/
  const elemento={};
  let indice=0;
  if(carrito.length===0)
  { //console.log(`entró al IF de  buscar En Carrito`);
    elemento.ref=objeto.ref;
    elemento.nombre=objeto.nombre;
    elemento.cantidad=1;
    elemento.precio=objeto.precio;
    elemento.subtotal=1*parseInt(objeto.precio);
    elemento.imgMin=objeto.imgMin;
    carrito.push(elemento); //Ya coloqué el primer elemento
    //console.log(`Salió del IF de  buscar En Carrito linea 85: ${carrito[0].subtotal}`);
    return indice;
  }
  else{
    //voy a recorrer todo el carrito buscando la referencia
    for (let i=0; i<carrito.length; i++)
    {  if(carrito[i].ref===objeto.ref)
       { console.log(`linea 92: ya existe la referncia${[carrito[i].ref]}`);
         carrito[i].cantidad= parseInt(carrito[i].cantidad)+1;
         carrito[i].subtotal=parseInt(carrito[i].cantidad)*parseInt(carrito[i].precio); //Aqui estoy diciendo, mira ahora item, que actua como un carrito[i], me va a actuaizar los valores
         indice=i;
         console.log(`linea 96: Encontró la ref y ahora el subtotal: ${carrito[indice].subtotal}`);
         return indice;
       }
    }
        //El carrito si tiene productos pero no el que vamos a comprar
        elemento.ref=objeto.ref;
        elemento.nombre=objeto.nombre;
        elemento.cantidad=1;
        elemento.precio=objeto.precio;
        elemento.subtotal=1*parseInt(objeto.precio);
        elemento.imgMin=objeto.imgMin;
        carrito.push(elemento); //Ya coloqué el primer elemento
        indice=carrito.length-1;
        console.log(`Linea 109: Salió del IF de  buscar En Carrito${carrito[indice].subtotal}`);
        return indice;
  }
  //console.log(`Salio de Buscar En Carrito ${carrito}`);
}

function addToCar(id){

  const indice=buscarEnCarrito(stockProductos[id]);
  if(document.getElementById(`${carrito[indice].ref}`))
       {  document.getElementById(`${carrito[indice].ref}`).outerHTML = ""; //Estoy borrando si el elemento existe
          //const divElim= document.getElementById(`${carrito[indice].ref}`);
          //divElim.parentNode.removeChild(divElim);
       }
  
  const div = document.createElement('div'); //Creando un div para adicionar al código html
  div.classList.add('product-in-Car'); //Adicionando una clase al div.
  div.setAttribute("id", `${carrito[indice].ref}`);//El id de este div es la referencia.
  const codeCard=`
            <div>${carrito[indice].ref}</div>
            <div><img src=${carrito[indice].imgMin} alt="imagen"></div>
            <div>${carrito[indice].nombre}</div>
            <div>${carrito[indice].cantidad}</div>
            <div>$ ${carrito[indice].precio}</div>
            <div>$ ${carrito[indice].subtotal}</div>
            <div><button id="eliminar${carrito[indice].ref}" class="boton-eliminar" onclick="funcionEliminar('${carrito[indice].ref}')" >Eliminar <i class="fas-fa-shopping-cart"></i></button></div>
          </div>
  `;
  div.innerHTML=codeCard;
  contenedorCarrito.appendChild(div);
  calcTotal();
}

function calcTotal()
{ let total=0;
  for(let item of carrito)
  {  total= parseInt(item.subtotal)+total;
  }
  precioTotal.textContent=total;
}


function funcionEliminar(referencia)
{ console.log(`Linea 230 entró a funcion Eliminar ${referencia}`);
  let nuevoCarrito=[];//un array vacio; 
  document.getElementById(referencia).outerHTML = ""; //se saca el elemento CSS del carrito.
  nuevoCarrito = carrito.filter(item=>item.ref!=referencia);
  carrito=nuevoCarrito; 
  calcTotal();
  
}

/*onclick="myFunction()"
function myFunction() {
  document.getElementById("demo").innerHTML = "YOU CLICKED ME!";
}
*/
