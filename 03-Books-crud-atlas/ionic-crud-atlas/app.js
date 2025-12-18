'use strict';
const { MongoClient } = require('mongodb');
//cadena de conexión
// Reemplaza 'url' con tu cadena de conexión real proporcionada por atlas
const url = 'Reemplaza 'url' con tu cadena de conexión real proporcionada por atlas';
const client = new MongoClient(url);
const dbName = 'libros';
client.connect();
const db = client.db(dbName);
const collection = db.collection('libros');

async function buscarTodos() {
    //busqueda con find para cargar todos los libros
    let findResult = await collection.find({}).toArray();
    representaLibros(findResult);
}
async function buscarTitulo(){
    let txtBuscar = document.getElementById("txtBuscar").value;
    let filteredDocs = await collection.find({ title: { $regex: '.*' + txtBuscar + '.*' } }).toArray();
    console.log(filteredDocs);
    //creamos el DOM para esos libros
    representaLibros(filteredDocs);
}
async function buscarAutor(){
    let txtBuscarAutor = document.getElementById("txtBuscarAutor").value;
    let filteredDocs = await collection.find({ author: { $regex: '.*' + txtBuscarAutor + '.*' } }).toArray();
    console.log(filteredDocs);
    //creamos el DOM para esos libros
    representaLibros(filteredDocs);
}
//cargar los libros pasados como parámetro con Ionic
const representaLibros = (books => {
    let cadenaDOM = "";
    books.forEach(book => {
        cadenaDOM +=
            `<div>
                <ion-card style="width: 150px;">
                    <img src="./images/${book.img}" height="170" width="108" style="object-fit: cover;"/>
                    <ion-card-header>
                        <ion-card-title style="font-size: 14px;">${book.title}</ion-card-title>
                        <ion-card-subtitle style="font-size: 12px;">${book.author}</ion-card-subtitle>
                    </ion-card-header>
                </ion-card>
            </div>`;
    });
    document.getElementById("wrapper").innerHTML = cadenaDOM;
});

//escuchador del boton buscar libro por título
document.getElementById("btnBuscar").addEventListener('click', async () => {
    let txtBuscar = document.getElementById("txtBuscar").value;
    if (txtBuscar == "") {
        const toast = document.getElementById('notification');
        toast.message = 'Debe escribir algo';
        await toast.present();
    } else {
        //buscamos el libro o libros
        buscarTitulo();
        //cerrar modal
        const modal = document.getElementById('modalBusquedas');
        modal.dismiss();
    }
});

//escuchador del boton buscar libro por autor
document.getElementById("btnBuscarAutor").addEventListener('click', async () => {
    let txtBuscarAutor = document.getElementById("txtBuscarAutor").value;
    if (txtBuscarAutor == "") {
        const toast = document.getElementById('notification');
        toast.message = 'Debe escribir algo';
        await toast.present();
    } else {
        //buscamos el libro o libros
        buscarAutor();
        //cerrar modal
        const modal = document.getElementById('modalBusquedas');
        modal.dismiss();
    }
});

async function insertaLibro(libro){
    const insertResult = await collection.insertMany([libro]);
    console.log('Inserted documents =>', insertResult);
}

//escuchador del boton nuevo libro
document.getElementById("btnNuevoLibro").addEventListener('click', async () => {
    let txtNuevoTitulo = document.getElementById("txtNuevotitulo").value;
    let txtNuevoAutor = document.getElementById("txtNuevoAutor").value;
    let txtNuevaImagen = document.getElementById("txtNuevaImagen").value;
    if (txtNuevoTitulo == "" || txtNuevoAutor == "" || txtNuevaImagen == "") {
        const toast = document.getElementById('notification');
        toast.message = 'Debe escribir todos los campos';
        await toast.present();
    } else {
        //Insertamos el libro
        let libro = {
            title: txtNuevoTitulo,
            author: txtNuevoAutor,
            img: txtNuevaImagen
        };
        await insertaLibro(libro);
        const toast = document.getElementById('notification');
        toast.message = 'Libro guardado correctamente';
        await toast.present();
        //cerrar modal
        const modal = document.getElementById('modalNuevo');
        modal.dismiss();
        //limpiar campos
        document.getElementById("txtNuevotitulo").value = '';
        document.getElementById("txtNuevoAutor").value = '';
        document.getElementById("txtNuevaImagen").value = '';
        //recargar todos los libros
        buscarTodos();
    }
});


//escuchador del boton buscar todos
document.getElementById("btnTodos").addEventListener('click', () => {
    buscarTodos();
});

//Controlar botones de cerrar modales
document.addEventListener('DOMContentLoaded', () => {
    const closeBusquedas = document.getElementById('closeBusquedas');
    const closeNuevo = document.getElementById('closeNuevo');
    
    if (closeBusquedas) {
        closeBusquedas.addEventListener('click', () => {
            document.getElementById('modalBusquedas').dismiss();
        });
    }
    
    if (closeNuevo) {
        closeNuevo.addEventListener('click', () => {
            document.getElementById('modalNuevo').dismiss();
        });
    }
});

//llamo a la función buscar todos para que
//se carguen todos los libros inicialmente
buscarTodos();
