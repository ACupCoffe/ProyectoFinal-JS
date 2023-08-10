import { gpu, cpu, psu, ram, mother, gabo } from "./productos.js"; // IMPORTACION DE DATOS

export { card_creator, realizarBusqueda };

const productos = { ...gpu, ...cpu, ...psu, ...ram, ...mother, ...gabo }; // ALMACENAR TODA LA DATA EN UNA SOLA LISTA

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
    console.log(producto);
    window.location.href = "/pages/producto.html"; // IR A PRODUCTO
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
function realizarBusqueda(termino) {
  let resultadoBusqueda = [];

  Object.entries(productos).forEach(([clave, otro]) => {
    if (
      otro.nombre.toLowerCase().includes(termino) ||
      otro.descripcion.toLowerCase().includes(termino)
    ) {
      resultadoBusqueda.push(productos[clave]);
    }
  });
  return resultadoBusqueda;
}

// CARD DE TESTEO
for (let i = 0; i < 5; i++) {
  const test_id = document.getElementById("recomendacion_" + i);

  if (test_id !== null) {
    switch (i) {
      case 1:
        card_creator(cpu.ryzen_5600x, "recomendacion_" + i);
        break;

      case 2:
        card_creator(mother.aorus_b550, "recomendacion_" + i);
        break;

      case 3:
        card_creator(ram.vengance_lpx, "recomendacion_" + i);
        break;

      case 4:
        card_creator(gpu.rx6600_xt_xfx, "recomendacion_" + i);
    }
  } else {
  }
}

// INPUT -- BARRA DE BUSQUEDA

const input = document.getElementById("busqueda");

const categoria_enlace = document.getElementById("mostrar_todo");

input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const termino_buscado = input.value;

    localStorage.setItem("termino_buscado", termino_buscado);
    console.log(termino_buscado);
    window.location.href = "../pages/clasificados.html";
  }
});

categoria_enlace.addEventListener("click", function () {
  localStorage.setItem("termino_buscado", "mostrar_todo");
  window.location.href = "../pages/clasificados.html";
});

const producto_buscado = localStorage.getItem("termino_buscado"); // GUARDADO

let mostrar = realizarBusqueda(producto_buscado); // INDICAR QUE MOSTRAR

const coincidencia_producto = document.getElementById("productos_coincidencia");

if (producto_buscado === "mostrar_todo") {
  let i = 0;
  for (const key in productos) {
    const objProducto = productos[key];
    const where_card = document.createElement("a");
    where_card.id = "producto_" + i;
    coincidencia_producto.appendChild(where_card);
    card_creator(objProducto, "producto_" + i);
    i++;
  }
} else {
  console.log("busqueda");
  for (let i = 0; i < mostrar.length; i++) {
    const where_card = document.createElement("a");
    where_card.id = "producto_" + i;
    coincidencia_producto.appendChild(where_card);
    // const show_nombre = document.createElement("p");
    // show_nombre.innerText = mostrar[i].nombre;
    // where_card.appendChild(show_nombre);
    // const show_precio = document.createElement("p");
    // show_precio.innerText = mostrar[i].precio;
    // where_card.appendChild(show_precio);

    card_creator(mostrar[i], "producto_" + i);
    console.log(typeof mostrar);
  }
}
