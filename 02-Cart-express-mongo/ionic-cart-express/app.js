'use strict';
let contador = 0;
let librosSel = [];

// Cambia esta URL si tu backend está en otra dirección
const API_URL = 'http://localhost:3000/api/libros';
const IMG_URL = 'http://localhost:3000/public/';

async function cargarLibros() {
  try {
    const res = await fetch(API_URL);
    const books = await res.json();
    let cadenaDOM = "";
    books.forEach((book, i) => {
      cadenaDOM +=
        `<ion-col size="auto">
            <ion-card id="card${i}" style="width: 150px;">
                <img src="${IMG_URL}${book.img}" height="170" width="108" style="object-fit: cover;"/>
                <ion-card-header>
                    <ion-card-title style="font-size: 14px;">${book.title}</ion-card-title>
                    <ion-card-subtitle style="font-size: 12px;">${book.author}</ion-card-subtitle>
                </ion-card-header>
            </ion-card>
        </ion-col>`;
    });
    document.getElementById("izquierda").innerHTML = cadenaDOM;
    // Escuchadores para añadir al carrito
    books.forEach((book, i) => {
      document.getElementById(`card${i}`).addEventListener('click', () => {
        contador++;
        document.getElementById("contador").textContent = contador;
        librosSel.push(book);
        panelDerecha();
      });
    });
  } catch (err) {
    document.getElementById("izquierda").innerHTML = '<p style="color:red">No se pudieron cargar los libros.</p>';
  }
}

const panelDerecha = () => {
  let contenido = "";
  librosSel.forEach((book, i) => {
    contenido +=
      `<ion-item class="cart-item">
          <ion-thumbnail slot="start">
              <img src="${IMG_URL}${book.img}">
          </ion-thumbnail>
          <ion-label>
              <h2>${book.title}</h2>
              <p>${book.author}</p>
          </ion-label>
          <ion-button fill="clear" slot="end" id="btnMinus${i}" color="danger">
              <ion-icon name="trash-outline"></ion-icon>
          </ion-button>
      </ion-item>`;
  });
  document.getElementById("lista").innerHTML = contenido;
  //escuchadores botones minus
  librosSel.forEach((book, i) => {
    document.getElementById(`btnMinus${i}`).addEventListener('click', () => {
      eliminarLibroSel(i);
    });
  });
}
const eliminarLibroSel = (i) => {
  librosSel.splice(i, 1); //eliminamos el elemento del array
  contador--;
  document.getElementById("contador").textContent = contador;
  panelDerecha();
}

//función muestra/oculta panel carrito con ion-menu
const toggleCarrito = async () => {
  const menu = document.querySelector('ion-menu');
  if (menu) {
    await menu.toggle();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  cargarLibros();
  const cartButton = document.getElementById("cartButton");
  if (cartButton) {
    cartButton.addEventListener('click', toggleCarrito);
  }
});
