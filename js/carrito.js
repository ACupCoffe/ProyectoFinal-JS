// import { producto_carrito } from "./main.js";
import { gpu, cpu, psu, ram, mother, gabo } from "./productos.js"; // IMPORTACION DE DATOS

const productos = { ...gpu, ...cpu, ...psu, ...ram, ...mother, ...gabo }; // ALMACENAR TODA LA DATA EN UNA SOLA LISTA

function objeto_producto(termino) {
  let resultadoBusqueda = [];

  Object.entries(productos).forEach(([clave, otro]) => {
    if (otro.nombre.toLowerCase().includes(termino)) {
      resultadoBusqueda.push(productos[clave]);
    }
  });
  return resultadoBusqueda;
}

const boton_agregar = document.getElementById("agregar_carrito");

if (boton_agregar) {
  boton_agregar.addEventListener("click", agregar_carrito);
} else {
}

function agregar_carrito() {
  // CARRITO LOCALSTORAGE
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const cantidad_producto = document.getElementById("cantidad");

  const objeto_page = localStorage.getItem("producto");
  const test_obj = objeto_producto(objeto_page);

  carrito.push({
    nombre: test_obj[0].nombre,
    precio: test_obj[0].precio,
    imagen: test_obj[0].imagen,
    cantidad: cantidad_producto.value,
  });

  localStorage.setItem("carrito", JSON.stringify(carrito));

  Toastify({
    text: "Producto Agregado",
    position: "right",
    offset: {
      x: 50,
      y: 100,
    },
    style: {
      background: "linear-gradient(to right,#3fb076, #003d29 )",
    },
  }).showToast();
}

let carrito_testeo = localStorage.getItem("carrito");
const objeto_carrito = JSON.parse(carrito_testeo);
const location_carrito = document.getElementById("contenedor_carrito");
location_carrito.className = "productos_carrito";

if (
  objeto_carrito &&
  (objeto_carrito.length > 0 || typeof objeto_carrito.length !== "number")
) {
  objeto_carrito.forEach((producto, index) => {
    const contenido = document.createElement("div");
    contenido.classList.add("contenedor_carrito");

    contenido.innerHTML = `
        <img class="img_carrito" src="${producto.imagen}">
        <div class="carrito_data">
        <h1 class="nombre_carrito">${producto.nombre}</h3>
        <p class="precio_cantidad">Cantidad: ${producto.cantidad}</p>
        <p class="precio_carrito">Precio: ${
          producto.precio * producto.cantidad
        }</p> 
        </div>   
        <button id="boton_delete_${index}" class="boton_carrito" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
      </svg>Borrar</button> 
  
      `;
    location_carrito.appendChild(contenido);

    const boton_delete = document.getElementById(`boton_delete_${index}`);
    boton_delete.addEventListener("click", () => {
      let lista_delete = JSON.parse(localStorage.getItem("carrito") || []);

      const eliminar_producto = `${index}`;

      if (eliminar_producto >= 0 && eliminar_producto < lista_delete.length) {
        lista_delete.splice(`${index}`, 1);
        localStorage.setItem("carrito", JSON.stringify(lista_delete));
        console.log("deleteada");
        location.reload();
      }
    });
  });
} else {
  const carrito_empty = document.createElement("div");
  carrito_empty.className = "carrito_empty";
  const header_empty = document.createElement("h1");
  header_empty.className = "header_empty";
  header_empty.innerText =
    "¿Vacío el carrito? ¡Es solo un adelanto de mi carrera como modelo de minimalismo! 🛒🕶️";
  carrito_empty.appendChild(header_empty);
  location_carrito.appendChild(carrito_empty);
}

let total_carrito = 0;
let total_producto = 0;

switch (objeto_carrito) {
  case null:
    const null_container = document.getElementById("total_container");
    const null_contenido = document.createElement("div");
    null_contenido.className = "total-contenido";
    null_contenido.innerHTML = `
      <h1 class='resumen_titulo'>Resumen de Compra</h1>
      <span class='line-division-resumen'></span>
      
      <p class='resumen-envio'>Envio: <span>No Disponible</span></p>
      <div class="dropdown">
        <label for="metodo-pago">Método de Pago:</label>
          <select id='payment' class="dropdown-select">
            <option value="1">Mercado Pago</option>
            <option value="2">Uala</option>
            <option value="4">Cripto</option>
            <option value="5">Efectivo</option>
            <option value="6">Transferencia</option>
          </select>
      </div>
      <p class='resumen-envio'>Descuento: <span>No Aplicable</span></p>
      <p class= 'resumen-producto'>Productos <span class='resumen-cantidad'>(${total_producto})</span>: ${total_carrito}</p>
      <button id='realizar_compra' class='boton-compra boton'>Hacer Compra</button>
    `;
    null_container.appendChild(null_contenido);

    break;

  default:
    objeto_carrito.forEach(productos => {
      const precio_final = productos.precio * productos.cantidad;
      const producto_final = parseInt(productos.cantidad);

      total_producto += producto_final;
      total_carrito += precio_final;
    });

    const total_container = document.getElementById("total_container");
    const total_contenido = document.createElement("div");
    total_contenido.className = "total-contenido";
    total_contenido.innerHTML = `
      <h1 class='resumen_titulo'>Resumen de Compra</h1>
      <span class='line-division-resumen'></span>
      
      <p class='resumen-envio'>Envio: <span>Gratis</span></p>
      <div class="dropdown">
        <label for="metodo-pago">Método de Pago:</label>
          <select id='payment' class="dropdown-select">
            <option value="1">Mercado Pago</option>
            <option value="2">Uala</option>
            <option value="4">Cripto</option>
            <option value="5">Efectivo</option>
            <option value="6">Transferencia</option>
          </select>
      </div>
      <p class='resumen-envio'>Descuento: <span>5%</span></p>
      <p class= 'resumen-producto'>Productos <span class='resumen-cantidad'>(${total_producto})</span>: ${total_carrito}</p>
      <button id='realizar_compra' class='boton-compra boton'>Hacer Compra</button>
    `;
    total_container.appendChild(total_contenido);

    break;
}

const boton_compra = document.getElementById("realizar_compra");

if (objeto_carrito === null || objeto_carrito.length === 0) {
  const null_boton = boton_compra;
  null_boton.addEventListener("click", () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "¡El carrito llora de soledad! 🛒 ¡Hora de llenarlo de felicidad y compras geniales! 🎉😄",
    });
  });
} else {
  const compra_hace_boton = document.getElementById("realizar_compra");
  compra_hace_boton.addEventListener("click", () => {
    Swal.fire({
      title: "Datos del Comprador",
      html: `
          <form id="mi_formulario" class='fromulario-final'>
            <label class='label-final' for="nombre">Nombre:</label>
            <input class='input-final' type="text" id="formulario_nombre" pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+" required>
            <br>
            <label class='label-final' for="email">Email:</label>
            <input class='input-final' type="email" id="formulario_email" required>
            <br>
            <label class='label-final' for="dni">DNI:</label>
            <input class='input-final' type="number" id="formulario_dni" required>
            <br>
            <label class='label-final' for="direccion">Dirrecion:</label>
            <input class='input-final' type="text" id="formulario_direccion" required>
            <br>
            <label class='label-final' for="codigo_postal">Codigo Postal:</label>
            <input class='input-final' type="number" id="formulario_codigo_postal" required>
          </form>
        `,
      showCancelButton: true,
      confirmButtonText: "Enviar",
      allowOutsideClick: false,
      preConfirm: () => {
        const formulario = document.getElementById("mi_formulario");

        if (formulario.checkValidity()) {
          const data = {
            nombre: formulario.querySelector("#formulario_nombre").value,
            email: formulario.querySelector("#formulario_email").value,
            dni: formulario.querySelector("#formulario_dni").value,
            direccion: formulario.querySelector("#formulario_direccion").value,
            codigo_postal: formulario.querySelector("#formulario_codigo_postal")
              .value,
          };
          data.compras = objeto_carrito;

          Swal.fire({
            title: "Datos enviados",
            text: "Se ha tomado su pedido. Por favor espere a que nuestro equipo se comunique con usted.",
            icon: "success",
            confirmButtonText: "Aceptar",
          }).then(result => {
            if (result.isConfirmed) {
              localStorage.removeItem("carrito");
              window.location.href = "../index.html";
            }
          });
        } else {
          Swal.showValidationMessage(
            "Por favor, completa todos los campos correctamente."
          );
        }
      },
    });
  });
}
