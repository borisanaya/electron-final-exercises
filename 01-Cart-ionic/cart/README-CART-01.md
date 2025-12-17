# Ionic Cart 01 - Estructura Básica

## Objetivo
Iniciar el desarrollo de una aplicación de carrito de compras usando Ionic y Electron. En este primer paso, crearás la estructura mínima de un proyecto, aprenderás los conceptos básicos de Ionic y cómo preparar el entorno para trabajar con Electron.

## ¿Qué aprenderás?
- Qué es Ionic y para qué sirve
- Qué es Electron y cómo se integra con Ionic
- Estructura mínima de un proyecto Ionic clásico (sin frameworks extra)
- Uso de los componentes básicos: `ion-app`, `ion-header`, `ion-toolbar`, `ion-title`, `ion-content`, `ion-button`
- Inclusión de Ionic a través de CDN
- Organización de archivos y carpetas para un proyecto escalable

## Requisitos previos
- Node.js instalado (versión 16 o superior)
- Editor de código (VS Code recomendado)
- Conocimientos básicos de HTML y JavaScript

## Introducción
Ionic es un framework para crear interfaces modernas y responsivas usando componentes web reutilizables. Electron permite empaquetar aplicaciones web como aplicaciones de escritorio multiplataforma. Combinando ambos, puedes crear una app de carrito de compras con una experiencia nativa.

## Estructura de carpetas sugerida
```
ionic-cart-01/
├── index.html
├── main.js
├── package.json
```

## Pasos detallados

### 1. Crea la carpeta del proyecto
Crea una carpeta llamada `ionic-cart-01` para este primer paso.

### 2. Crea el archivo `index.html`
Este archivo será la base de tu interfaz. Copia y pega el siguiente contenido:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Ionic Cart - Paso 1</title>
  <!-- Incluye Ionic desde CDN -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css" />
</head>
<body>
  <ion-app>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Mi Tienda de Libros</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding ion-text-center">
      <ion-button color="success">¡Comenzar!</ion-button>
    </ion-content>
  </ion-app>
  <!-- Ionic JS para componentes -->
  <script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"></script>
  <script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"></script>
</body>
</html>
```

### 3. Prepara archivos para Electron
Para ejecutar la app como escritorio, añade estos archivos:

- `main.js`:
```js
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);
```

- `package.json`:
```json
{
  "name": "ionic-cart-01",
  "version": "1.0.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "devDependencies": {
    "electron": "^32.3.3"
  }
}
```

Instala Electron con:
```
npm install
```

### 4. Ejecuta la app
Ejecuta:
```
npm start
```

## Explicación de la interfaz
- `<ion-app>`: Contenedor principal de Ionic.
- `<ion-header>` y `<ion-toolbar>`: Barra superior con título.
- `<ion-content>`: Zona principal de la app.
- `<ion-button>`: Botón de acción.

## Buenas prácticas
- Mantén el código HTML limpio y bien indentado.
- Usa comentarios para marcar secciones importantes.
- Prepara la estructura de carpetas pensando en los siguientes pasos (por ejemplo, una carpeta `data/` para libros, `images/` para portadas, etc).

---
Este paso sienta las bases para el resto de la práctica incremental. Asegúrate de entender cómo se estructura la app antes de avanzar al siguiente paso.