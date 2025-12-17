# Ionic Cart 02 - Lista de Libros

## Objetivo
Ampliar la interfaz de la aplicación para mostrar una lista de libros usando los componentes de lista de Ionic. Este paso te permitirá familiarizarte con la visualización de datos en forma de lista y la organización de la información en la interfaz.

## ¿Qué aprenderás?
- Cómo mostrar colecciones de datos en Ionic usando `ion-list` e `ion-item`
- Personalización de listas y elementos
- Organización de la información textual en la interfaz
- Buenas prácticas para estructurar datos y código

## Requisitos previos
- Haber completado el paso 1 (estructura básica con Electron e Ionic)

## Estructura de carpetas sugerida
```
ionic-cart-02/
├── index.html
├── main.js
├── package.json
```

## Pasos detallados

### 1. Copia la estructura base
Copia los archivos de `ionic-cart-01` a una nueva carpeta llamada `ionic-cart-02`.

### 2. Modifica el archivo `index.html`
Sustituye el botón por una lista de libros. Puedes usar títulos y autores ficticios o reales. Ejemplo:

```html
<ion-content class="ion-padding">
  <ion-list>
    <ion-item>Q - Luther Blissett</ion-item>
    <ion-item>El amor en tiempos cólera - Gabriel García Márquez</ion-item>
    <ion-item>Watchmen - Alan Moore y Dave Gibbons</ion-item>
    <ion-item>54 - Wu Ming</ion-item>
  </ion-list>
</ion-content>
```

### 3. Personaliza la lista
- Puedes agregar más libros, separar título y autor con estilos, o usar `<ion-label>` dentro de cada `<ion-item>` para mayor control.
- Ejemplo avanzado:

```html
<ion-list>
  <ion-item>
    <ion-label>
      <h2>Q</h2>
      <p>Luther Blissett</p>
    </ion-label>
  </ion-item>
  <!-- Más items aquí -->
</ion-list>
```

### 4. Revisa la estructura y el diseño
- Asegúrate de que la lista se vea bien en la ventana de la app.
- Puedes ajustar el padding, colores o tipografía usando CSS en el `<head>`.

### 5. (Opcional) Prepara la estructura para datos dinámicos
- Si lo deseas, crea una carpeta `data/` y un archivo `books.json` para preparar el siguiente paso, donde los libros se cargarán dinámicamente.

## Explicación de los componentes
- `<ion-list>`: Contenedor de la lista de elementos.
- `<ion-item>`: Elemento individual de la lista.
- `<ion-label>`: Permite organizar el contenido textual dentro de un item.

## Buenas prácticas
- Mantén la lista ordenada y bien indentada.
- Usa comentarios para separar secciones si la lista es larga.
- Piensa en la escalabilidad: en el futuro, los datos vendrán de un archivo JSON.

---
Este paso te introduce a la visualización de datos y la estructura de listas en Ionic. Es la base para mostrar información dinámica en los siguientes pasos.