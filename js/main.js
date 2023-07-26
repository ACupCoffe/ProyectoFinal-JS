console.log("HolA mundo");

import { gpu, cpu, psu, ram, mother, gabo } from "./productos.js";

// const card_container = document.getElementById("testeo");
// card_container.classList.add("card--product");

// CONTENEDOR IMG
// const container_img = document.createElement("div");
// container_img.classList.add("card--product__img");
// card_container.appendChild(container_img);
// const imgElement = document.createElement("img");
// imgElement.setAttribute("src", gpu.Rx_6600.asus.image);
// container_img.appendChild(imgElement);

// CONTENDOR DESC
// const container_desc = document.createElement("div");
// container_desc.classList.add("card--product__txt");
// card_container.appendChild(container_desc);
// const descTitle = document.createElement("p");
// descTitle.classList.add("title_card");
// descTitle.innerText = gpu["Rx 6600"].asus.nombre;
// container_desc.appendChild(descTitle);
// const descPrecio = document.createElement("p");
// descPrecio.classList.add("precio_card");
// descPrecio.innerText = "USD $" + gpu["Rx 6600"].asus.precio;
// container_desc.appendChild(descPrecio);
// const descCont = document.createElement("p");
// descCont.classList.add("desc_card");
// descCont.innerText = gpu["Rx 6600"].asus.descripcion;
// container_desc.appendChild(descCont);

for (let obj_producto in gpu) {
  console.log("Modelo: " + obj_producto);

  const datosProducto = gpu[obj_producto];

  for (let valor in datosProducto) {
    if (typeof datosProducto[valor] === "object") {
      console.log(valor + ":");

      const obejetoAnidado = datosProducto[valor];

      for (let clave in obejetoAnidado) {
        console.log(clave + ": " + obejetoAnidado[clave]);
      }
    } else {
      console.log(valor + ": " + datosProducto[valor]);
    }
  }
}

function card_creator(producto) {
  const tarjeta_contenedor = document.getElementById("testeo");
}
