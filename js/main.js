let funla = "HLA MUNDO";
funla = funla.toLowerCase();
console.log(funla); // TEST DE CONEXION

let carrito = [];

console.log(carrito);

import { gpu, cpu, psu, ram, mother, gabo } from "./productos.js"; // IMPORTACION DE DATOS

const productos = { gpu, cpu, psu, ram, mother, gabo }; // ALMACENAR TODA LA DATA EN UNA SOLA LISTA

//CREACION DE LAS CARD
function card_creator(producto, where) {
  const datosComplete =
    producto.nombre !== undefined &&
    producto.precio !== undefined &&
    producto.descripcion !== undefined &&
    producto.imagen !== undefined;

  // CONTORNO DE LA TARJETA
  const tarjeta_contenedor = document.getElementById(where);
  tarjeta_contenedor.classList.add("card--product");
  tarjeta_contenedor.addEventListener("click", function () {
    window.location.href = "./pages/producto.html";
  });

  if (datosComplete) {
    // CONTENEDOR IMAGEN
    const contenedor_imagen = document.createElement("div");
    contenedor_imagen.classList.add("card--product__img");
    tarjeta_contenedor.appendChild(contenedor_imagen);

    // img
    const img_elemento = document.createElement("img");
    img_elemento.classList.add();
    img_elemento.setAttribute("src", producto.imagen);
    contenedor_imagen.appendChild(img_elemento);

    // CONTENEDOR TEXTO
    const contenedor_contenido = document.createElement("div");
    contenedor_contenido.classList.add("card--product__txt");
    tarjeta_contenedor.appendChild(contenedor_contenido);

    // contenido --- TITULO ---
    const contenido_title = document.createElement("p");
    contenido_title.classList.add("title_card");
    contenido_title.innerText = producto.nombre;
    contenedor_contenido.appendChild(contenido_title);

    // contenido --- PRECIO ---
    const contenido_precio = document.createElement("p");
    contenido_precio.classList.add("precio_card");
    contenido_precio.innerText = "USD $" + producto.precio;
    contenedor_contenido.appendChild(contenido_precio);

    // contenido --- DESC ---
    const contenido_desc = document.createElement("p");
    contenido_desc.classList.add("desc_card");
    contenido_desc.innerText = producto.descripcion;
    contenedor_contenido.appendChild(contenido_desc);

    // CONTENEDOR BOTON
    const contenido_boton = document.createElement("div");
    contenido_boton.classList.add("boton");
    contenido_boton.innerText = "MAS INFORMACION";
    tarjeta_contenedor.appendChild(contenido_boton);
  } else {
    // SI FALTA ALGUNA DATA HARA LO SIGUIENTE
    tarjeta_contenedor.classList.add("card--product__notfound");
    const error_header = document.createElement("p");
    error_header.innerText = "404";
    error_header.classList.add("error_header");
    tarjeta_contenedor.appendChild(error_header);

    const error_context = document.createElement("div");
    tarjeta_contenedor.appendChild(error_context);
    error_context.classList.add("error_context");

    const context_message = document.createElement("p");
    context_message.innerText =
      "El producto no se a encontrado , disculpar las molestias";
    error_context.appendChild(context_message);
  }
} // Producto = Objeto que anadir a la tarjeta ----- where = ID donde debe ir

//FUNCION -- BARRA DE BUSQUEDA
function search_by_term(term) {
  term = term.toLowerCase();

  const resultados = [];

  for (const producto in productos) {
    const categoriasProducto = productos[producto];

    for (const variables in categoriasProducto) {
      const objetoVariable = categoriasProducto[variables];

      if (
        objetoVariable.nombre.toLowerCase().includes(term) ||
        (objetoVariable.descripcion &&
          objetoVariable.descripcion.toLowerCase().includes(term)) ||
        (objetoVariable.empresa &&
          objetoVariable.empresa.toLowerCase().includes(term)) ||
        (objetoVariable.socket &&
          objetoVariable.socket.toLowerCase().includes(term) &&
          term.trim() !== "")
      ) {
        resultados.push(objetoVariable.nombre);
      }
    }
  }

  console.log(resultados); // MOSTRAR LOS QUE EXISTEN
}

// CARD DE TESTEO
card_creator(cpu.ryzen_5600x, "recomendacion_1");
card_creator(mother.aorus_b550, "recomendacion_2");
card_creator(ram.vengance_lpx, "recomendacion_3");
card_creator(gpu.rx6600_xt_xfx, "recomendacion_4");

// INPUT -- BARRA DE BUSQUEDA
const input = document.getElementById("busqueda");
input.addEventListener("input", function () {
  const input_term = this.value;

  search_by_term(input_term);
});
