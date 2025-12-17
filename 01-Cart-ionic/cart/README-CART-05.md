# Ionic Cart 05 - Panel de Carrito

## Objetivo
Implementar un panel de carrito que muestre los libros seleccionados, permitiendo ver en tiempo real los libros agregados. El panel debe abrirse desde un botón y mostrar la lista de libros seleccionados con sus imágenes, título y autor.

## ¿Qué aprenderás?
- Cómo crear un panel lateral (menu) en Ionic/Electron
- Renderizado condicional y dinámico de listas
- Comunicación entre funciones para actualizar la interfaz
- Uso de listas dinámicas en el carrito
- Cómo mostrar imágenes en el carrito usando el valor de `img` del JSON
- Buenas prácticas para la gestión de estado y UI

## Requisitos previos
- Haber completado el paso 4 (selección de libros con click)

## Estructura de carpetas sugerida
```
ionic-cart-05/
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
Copia los archivos de `ionic-cart-04` a una nueva carpeta llamada `ionic-cart-05`.

### 2. Añade el panel de carrito en el HTML
Agrega un panel lateral usando `<ion-menu>` y una lista para mostrar los libros seleccionados:

```html
<ion-menu side="end" menu-id="carrito" content-id="main-content">
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Carrito</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-list id="lista-carrito">
      <!-- Libros seleccionados -->
    </ion-list>
  </ion-content>
</ion-menu>
```

Asegúrate de que el atributo `content-id` coincida con el id del contenido principal (por ejemplo, `<ion-content id="main-content">`).

### 3. Añade el botón para abrir el carrito
En la barra superior, el botón del carrito debe abrir el panel:

```js
document.getElementById("cartButton").addEventListener('click', () => {
  const menu = document.querySelector('ion-menu');
  if (menu) menu.toggle();
});
```

### 4. Renderiza los libros seleccionados en el panel
Cada vez que se seleccione un libro, actualiza la lista del carrito:

```js
function renderizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  lista.innerHTML = '';
  librosSel.forEach(libro => {
    const item = document.createElement('ion-item');
    item.innerHTML = `<ion-thumbnail slot="start"><img src='images/${libro.img}'></ion-thumbnail> <ion-label><h2>${libro.title}</h2><p>${libro.author}</p></ion-label>`;
    lista.appendChild(item);
  });
}
```

Llama a esta función cada vez que se seleccione un libro.

### 5. Sincroniza el contador y el panel
- El contador en la barra superior debe reflejar el número de libros en el carrito.
- El panel debe abrirse y cerrarse correctamente al pulsar el botón del carrito.

### 6. Personaliza la experiencia
- Puedes añadir un botón para eliminar libros del carrito junto a cada item:

```js
item.innerHTML += `<ion-button fill="clear" slot="end" onclick="eliminarLibro(${i})"><ion-icon name="trash-outline"></ion-icon></ion-button>`;
```
- Implementa la función `eliminarLibro(i)` para quitar el libro del array y volver a renderizar el carrito.

### 7. Verifica la funcionalidad
- Selecciona varios libros y abre el panel para verlos listados.
- Elimina libros y verifica que el contador y la lista se actualizan correctamente.

## Explicación de los componentes y lógica
- `<ion-menu>`: Panel lateral para el carrito.
- `<ion-list>` y `<ion-item>`: Lista de libros seleccionados.
- `<ion-thumbnail>`: Muestra la imagen del libro.
- `<ion-label>`: Muestra título y autor.
- Botón de carrito: Abre/cierra el panel.
- Función de renderizado: Actualiza la lista del carrito dinámicamente.

## Buenas prácticas
- Mantén la lógica de renderizado y eventos bien separada.
- Usa funciones puras para actualizar el estado y la UI.
- Comenta el código para facilitar el mantenimiento.
- Piensa en la experiencia de usuario: feedback visual, animaciones, etc.

---
Este paso simula la funcionalidad básica de un carrito de compras en una tienda online, usando imágenes dinámicas desde el JSON y un panel lateral interactivo.