console.log("HolA mundo");

import { gpu, cpu, psu, ram, mother, gabo } from "./productos.js";

function card_creator(producto, where) {
  // CONTORNO DE LA TARJETA
  const tarjeta_contenedor = document.getElementById(where);
  tarjeta_contenedor.classList.add("card--product");

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
  contenido_boton.innerText = "AGREGAR AL CARRITO";
  tarjeta_contenedor.appendChild(contenido_boton);
} // Producto = Objeto que anadir a la tarjeta ----- where = ID donde debe ir

card_creator(gpu.Rx_6600.asus, "rx6600_asus");
card_creator(gpu.Rx_6600_XT.msi, "rx6600_xt_msi");
card_creator(gpu.Rx_6600.powercolor, "rx6600_power_color");
