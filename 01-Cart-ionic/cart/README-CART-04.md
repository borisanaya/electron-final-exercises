# Ionic Cart 04 - Selección de Libros con Click

## Objetivo
Agregar interactividad al grid de libros permitiendo seleccionar libros para el carrito haciendo clic en la tarjeta de cada libro. Al hacer clic, se incrementa un contador y se almacena el libro seleccionado, pero aún no se muestra el panel del carrito.

## ¿Qué aprenderás?
- Manejo de eventos en componentes Ionic
- Actualización dinámica del DOM con JavaScript
- Uso de un contador y almacenamiento de selección
- Separación de lógica de presentación y datos
- Buenas prácticas para la gestión de estado en apps sencillas

## Requisitos previos
- Haber completado el paso 3 (grid de tarjetas desde books.json)

## Estructura de carpetas sugerida
```
ionic-cart-04/
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
Copia los archivos de `ionic-cart-03` a una nueva carpeta llamada `ionic-cart-04`.

### 2. Añade un contador visible en la barra superior
En el archivo `index.html`, agrega un contador en la barra de herramientas:

```html
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>Mi Tienda de Libros</ion-title>
    <ion-buttons slot="end">
      <ion-button>
        <ion-icon name="cart-outline"></ion-icon>
        <span id="contador">0</span>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
```

### 3. Modifica el renderizado de tarjetas para permitir selección
- Al crear cada tarjeta, añade un manejador de evento para seleccionar el libro:

```js
let contador = 0;
let librosSel = [];
books.forEach((book, i) => {
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
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    contador++;
    document.getElementById('contador').textContent = contador;
    librosSel.push(book);
  });
  col.appendChild(card);
  row.appendChild(col);
});
```

### 4. Explicación de la lógica
- Cada vez que el usuario hace clic en una tarjeta, el contador aumenta y el libro se añade al array `librosSel`.
- El contador se muestra en la barra superior y refleja el número de libros seleccionados.
- Aún no se muestra el panel de carrito, solo se almacena la selección.

### 5. Personaliza la experiencia
- Puedes resaltar visualmente las tarjetas seleccionadas cambiando el estilo del card al hacer clic.
- Ejemplo:

```js
card.classList.add('seleccionado'); // Añade una clase CSS
```

Y en el CSS:
```css
.seleccionado {
  border: 2px solid #3880ff;
  box-shadow: 0 0 10px #3880ff44;
}
```

### 6. Verifica la funcionalidad
- Selecciona varios libros y observa cómo el contador aumenta.
- Revisa el array `librosSel` en la consola para ver los libros seleccionados.

## Explicación de los componentes y lógica
- `<ion-button>` y `<ion-icon>`: Botón y icono del carrito en la barra superior.
- `contador`: Variable que almacena el número de libros seleccionados.
- `librosSel`: Array que almacena los objetos de los libros seleccionados.
- Evento `click` en cada tarjeta: Permite seleccionar libros y actualizar el contador.

## Buenas prácticas
- Mantén el código modular y bien comentado.
- Usa nombres descriptivos para variables y funciones.
- Separa la lógica de selección de la lógica de renderizado.
- Piensa en la escalabilidad: en el futuro, el carrito será un panel aparte.

---
Este paso introduce la lógica interactiva básica y la selección de libros para el carrito, preparando el terreno para implementar el panel de carrito en el siguiente paso.