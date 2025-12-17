'use strict';
const fs = require('fs');
let fichero = fs.readFileSync('./data/books.json');
let books = JSON.parse(fichero);
let cadenaDOM = "";
let contador = 0;
let librosSel = new Array();

//crear el DOM panel Izquierda con Ionic Grid
books.forEach((book, i) => {
    cadenaDOM +=
        `<ion-col size="auto">
            <ion-card id="card${i}" style="width: 150px;">
                <img src="images/${book.img}" height="170" width="108" style="object-fit: cover;"/>
                <ion-card-header>
                    <ion-card-title style="font-size: 14px;">${book.title}</ion-card-title>
                    <ion-card-subtitle style="font-size: 12px;">${book.author}</ion-card-subtitle>
                </ion-card-header>
            </ion-card>
        </ion-col>`;
});
document.getElementById("izquierda").innerHTML = cadenaDOM;

//una vez contruido el DOM de imágenes creamos escuchadores
books.forEach((book, i) => {
    document.getElementById(`card${i}`).addEventListener('click', () => {
        contador++;
        document.getElementById("contador").textContent = contador;
        librosSel.push(book);
        panelDerecha();
    });
});
//función para DOM panel derecha con Ionic
const panelDerecha = () => {
    let contenido = "";
    librosSel.forEach((book, i) => {
        contenido +=
            `<ion-item class="cart-item">
                <ion-thumbnail slot="start">
                    <img src="./images/${book.img}">
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

//Esperar a que Ionic esté listo
document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById("cartButton");
    if (cartButton) {
        cartButton.addEventListener('click', toggleCarrito);
    }
});
