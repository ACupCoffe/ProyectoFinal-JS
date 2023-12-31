import { gpu, cpu, psu, ram, mother, gabo } from "./productos.js"; // IMPORTACION DE DATOS

const productos = { ...gpu, ...cpu, ...psu, ...ram, ...mother, ...gabo }; // ALMACENAR TODA LA DATA EN UNA SOLA LISTA

//CREACION DE LAS CARD
function card_creator(producto, where) {
  const datosComplete =
    producto.nombre !== undefined &&
    producto.precio !== undefined &&
    producto.descripcion !== undefined &&
    producto.imagen !== undefined;

  // CONTORNO DE LA TARJETA
  if (datosComplete) {
    const tarjeta_contenedor = document.getElementById(where);
    tarjeta_contenedor.classList.add("card--product");
    tarjeta_contenedor.addEventListener("click", function () {
      switch (input_id) {
        case "busqueda_index":
          localStorage.setItem("producto", producto.nombre.toLowerCase());
          window.location.href = "./pages/producto.html"; // IR A PRODUCTO
          break;

        case "busqueda_folder":
          localStorage.setItem("producto", producto.nombre.toLowerCase());
          window.location.href = "./producto.html"; // IR A PRODUCTO
          break;
      }
    });

    const input_search = document.querySelector("input");
    const input_id = input_search.id;

    // CONTENEDOR IMAGEN
    const contenedor_imagen = document.createElement("div");
    contenedor_imagen.classList.add("card--product__img");
    tarjeta_contenedor.appendChild(contenedor_imagen);

    // img
    const img_elemento = document.createElement("img");
    img_elemento.classList.add();
    const org_ruta_img = producto.imagen;

    switch (input_id) {
      case "busqueda_index":
        const index_change = org_ruta_img.slice(1);
        img_elemento.setAttribute("src", index_change);
        break;

      case "busqueda_folder":
        img_elemento.setAttribute("src", org_ruta_img);
        break;
    }

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
    const contenido_boton = document.createElement("a");
    contenido_boton.classList.add("boton");
    contenido_boton.addEventListener("click", function () {
      window.location.href = "#";
    });
    contenido_boton.innerText = "MAS INFORMACION";
    tarjeta_contenedor.appendChild(contenido_boton);
  } else {
    const tarjeta_contenedor = document.getElementById(where);
    tarjeta_contenedor.classList.add("card--product");
    tarjeta_contenedor.addEventListener("click", function () {
      Swal.fire({
        title: "PRODUCTO NO ENCONTRADO",
        icon: "question",
        confirmButtonText: "Entendido",
        text: "El producto seleccionado no se encuentra habilitado",
      });
    });
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
  //console.log(producto);
} // Producto = Objeto que anadir a la tarjeta ----- where = ID donde debe ir

// CREACION PAGIN PRODUCTO

function page_producto(producto) {
  const img_producto = document.getElementById("imagen_producto");

  const input_search = document.querySelector("input");
  const input_id = input_search.id;

  switch (input_id) {
    case "busqueda_index":
      const index_change = producto.imagen.slice(1);
      img_producto.setAttribute("src", index_change);
      break;

    case "busqueda_folder":
      img_producto.setAttribute("src", producto.imagen);
      break;
  }

  const titulo_producto = document.getElementById("titulo_producto");
  titulo_producto.innerText = producto.nombre;

  const precio_producto = document.getElementById("precio_producto");
  precio_producto.innerText = "USD $" + producto.precio;

  const cuotas_total = producto.precio * 2.3;
  const cuotas = cuotas_total / 12;
  const precio_por_cuota = document.getElementById("precio_cuotas");
  precio_por_cuota.innerText = cuotas.toFixed(2);

  const precio_total_cuotas = document.getElementById("precio_total_cuotas");
  precio_total_cuotas.innerText = cuotas_total.toFixed(2);

  const descripcion_producto = document.getElementById("descripcion_producto");
  descripcion_producto.innerText = producto.descripcion;
}

const viendo_producto = localStorage.getItem("producto");

try {
  let producto_page = realizarBusqueda(viendo_producto);
  page_producto(producto_page[0]);
} catch (error) {}

// FIN PAGINA PRODUCTO

//FUNCION -- BARRA DE BUSQUEDA
export function realizarBusqueda(termino) {
  let resultadoBusqueda = [];

  Object.entries(productos).forEach(([clave, otro]) => {
    if (
      otro.nombre.toLowerCase().includes(termino) ||
      otro.descripcion.toLowerCase().includes(termino) ||
      otro.claves_busqueda.toLowerCase().includes(termino)
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
const input_search = document.querySelector("input");
const input_id = input_search.id;

switch (input_id) {
  case "busqueda_index":
    input_search.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        const termino_buscado = input_search.value;

        localStorage.setItem("termino_buscado", termino_buscado);
        window.location.href = "./pages/clasificados.html";
      }
    });
    break;

  case "busqueda_folder":
    input_search.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        const termino_buscado = input_search.value;

        localStorage.setItem("termino_buscado", termino_buscado);
        window.location.href = "./clasificados.html";
      }
    });
    break;
}

// FILTRACIONES
var enlacesCategoria = document.querySelectorAll(".enlace-categoria");
enlacesCategoria.forEach(function (enlace) {
  enlace.addEventListener("click", function () {
    var textoEnlace = enlace.textContent;
    localStorage.setItem("termino_buscado", textoEnlace.toLowerCase());
  });
});

const categoria_enlace = document.getElementById("mostrar_todo");

categoria_enlace.addEventListener("click", function () {
  localStorage.setItem("termino_buscado", "mostrar_todo");
});

const producto_buscado = localStorage.getItem("termino_buscado"); // GUARDADO

let mostrar = realizarBusqueda(producto_buscado); // INDICAR QUE MOSTRAR

const coincidencia_producto = document.getElementById("productos_coincidencia");

if (producto_buscado === "mostrar_todo") {
  let i = 0;
  for (const key in productos) {
    const objProducto = productos[key];
    const where_card = document.createElement("div");
    where_card.id = "producto_" + i;
    coincidencia_producto.appendChild(where_card);
    card_creator(objProducto, "producto_" + i);
    i++;
  }
} else {
  for (let i = 0; i < mostrar.length; i++) {
    const where_card = document.createElement("a");
    where_card.id = "producto_" + i;
    coincidencia_producto.appendChild(where_card);
    card_creator(mostrar[i], "producto_" + i);
  }
}

let h2_elements = document.querySelectorAll(".categoria_producto h2");
let h3_elements = document.querySelectorAll(".categoria_producto h3");
let li_elements = document.querySelectorAll(".categoria_producto li");

h2_elements.forEach(function (h2) {
  h2.addEventListener("click", function () {
    let categoria = h2.textContent;
    localStorage.setItem("termino_buscado", categoria.toLowerCase());
    location.reload();
  });
});

h3_elements.forEach(function (h3) {
  h3.addEventListener("click", function () {
    let categoria = h3.textContent;
    localStorage.setItem("termino_buscado", categoria.toLowerCase());
    location.reload();
  });
});

li_elements.forEach(function (li) {
  li.addEventListener("click", function () {
    let subcategoria = li.textContent;
    localStorage.setItem("termino_buscado", subcategoria.toLowerCase());
    location.reload();
  });
});
