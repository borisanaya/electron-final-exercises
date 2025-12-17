# Ionic Cart 03 - Grid de Tarjetas desde books.json

## Objetivo
Transformar la visualización de la lista de libros en un grid de tarjetas visualmente atractivo, cargando los datos dinámicamente desde un archivo books.json. Cada tarjeta debe mostrar la imagen, título y autor del libro, pero aún no es interactiva.

## ¿Qué aprenderás?
- Cómo cargar datos desde un archivo JSON en un proyecto Electron+Ionic
- Renderizar dinámicamente tarjetas usando los datos del JSON
- Uso de `ion-grid`, `ion-row`, `ion-col`, `ion-card` y el campo `img` para las imágenes
- Organización visual avanzada y personalización de estilos con CSS
- Separación de datos y presentación

## Requisitos previos
- Haber completado el paso 2 (lista de libros)

## Estructura de carpetas sugerida
```
ionic-cart-03/
├── index.html
├── main.js
├── package.json
├── data/
│   └── books.json
├── images/
│   └── (imágenes de los libros)
```

## Pasos detallados

### 1. Copia la estructura base
Copia los archivos de `ionic-cart-02` a una nueva carpeta llamada `ionic-cart-03`.

### 2. Prepara los datos y las imágenes
- Crea una carpeta `data/` y coloca dentro el archivo `books.json` con la información de los libros. Ejemplo:

```json
[
  { "title": "Q", "author": "Luther Blissett", "img": "0.jpg" },
  { "title": "El amor en tiempos cólera", "author": "Gabriel García Márquez", "img": "1.jpg" }
]
```
- Coloca las imágenes correspondientes en la carpeta `images/` (usa nombres como 0.jpg, 1.jpg, etc).

### 3. Modifica el archivo `index.html`
- Elimina la lista y crea un grid vacío:

```html
<ion-grid>
  <ion-row id="libros-row">
    <!-- Las tarjetas se generarán dinámicamente -->
  </ion-row>
</ion-grid>
```

### 4. Carga y renderiza los libros dinámicamente
- En tu archivo de JavaScript (puede ser un `<script>` en el HTML o un archivo externo), lee el JSON y genera las tarjetas:

```js
const fs = require('fs');
let fichero = fs.readFileSync('./data/books.json');
let books = JSON.parse(fichero);
const row = document.getElementById('libros-row');
books.forEach(book => {
  const col = document.createElement('ion-col');
  col.setAttribute('size', 'auto');
  const card = document.createElement('ion-card');
  card.innerHTML = `
    <img src="images/${book.img}" height="170" width="108" style="object-fit:cover;" />
    <ion-card-header>
      <ion-card-title>${book.title}</ion-card-title>
      <ion-card-subtitle>${book.author}</ion-card-subtitle>
    </ion-card-header>
  `;
  col.appendChild(card);
  row.appendChild(col);
});
```

### 5. Personaliza el diseño
- Usa CSS para mejorar la presentación de las tarjetas, por ejemplo:

```html
<style>
ion-card {
  width: 150px;
  margin: 10px auto;
}
ion-card img {
  object-fit: cover;
  height: 170px;
  width: 108px;
}
ion-row {
  justify-content: center;
}
</style>
```

### 6. Verifica la carga dinámica
- Asegúrate de que los libros se muestran correctamente y que las imágenes corresponden a cada libro.
- Si una imagen no aparece, revisa el nombre en el JSON y en la carpeta `images/`.

## Explicación de los componentes
- `<ion-grid>`, `<ion-row>`, `<ion-col>`: Sistema de grillas de Ionic para organizar el contenido.
- `<ion-card>`: Tarjeta visual para cada libro.
- `<img>`: Muestra la portada del libro, usando el campo `img` del JSON.
- `<ion-card-header>`, `<ion-card-title>`, `<ion-card-subtitle>`: Encabezado y detalles de la tarjeta.

## Buenas prácticas
- Mantén la estructura de carpetas organizada.
- Usa nombres de imagen coherentes con el JSON.
- Separa los datos (books.json) de la presentación (HTML/JS).
- Comenta el código para facilitar el mantenimiento.

---
Este paso te permite practicar la carga y renderizado dinámico de datos en Ionic/Electron, y sienta la base para la interactividad en los siguientes pasos.