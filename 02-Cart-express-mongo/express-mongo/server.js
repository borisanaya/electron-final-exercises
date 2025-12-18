'use strict';
const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Ruta de prueba
app.get('/test', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor funcionando' });
});

// Conexión a MongoDB Atlas
// Reemplaza 'url' con tu cadena de conexión real proporcionada por atlas
const url = 'Reemplaza 'url' con tu cadena de conexión real proporcionada por atlas';
const client = new MongoClient(url);
const dbName = 'libros';
let db;
let collection;

// Conectar a la base de datos
async function conectarDB() {
    try {
        await client.connect();
        console.log('Conectado a MongoDB Atlas');
        db = client.db(dbName);
        collection = db.collection('libros');
    } catch (error) {
        console.error('Error al conectar a MongoDB Atlas:', error);
        process.exit(1);
    }
}

// Rutas API

// GET - Obtener todos los libros
app.get('/api/libros', async (req, res) => {
    try {
        const libros = await collection.find({}).toArray();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener libros' });
    }
});

// GET - Buscar libros por título
app.get('/api/libros/titulo/:titulo', async (req, res) => {
    try {
        const titulo = req.params.titulo;
        const libros = await collection.find({ 
            title: { $regex: '.*' + titulo + '.*', $options: 'i' } 
        }).toArray();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar por título' });
    }
});

// GET - Buscar libros por autor
app.get('/api/libros/autor/:autor', async (req, res) => {
    try {
        const autor = req.params.autor;
        const libros = await collection.find({ 
            author: { $regex: '.*' + autor + '.*', $options: 'i' } 
        }).toArray();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar por autor' });
    }
});

// POST - Insertar un nuevo libro
app.post('/api/libros', async (req, res) => {
    try {
        const libro = {
            title: req.body.title,
            author: req.body.author,
            img: req.body.img
        };
        const resultado = await collection.insertOne(libro);
        res.status(201).json({ 
            mensaje: 'Libro insertado correctamente',
            id: resultado.insertedId 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al insertar libro' });
    }
});

// Iniciar servidor
conectarDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
});

// Manejar cierre de la aplicación
process.on('SIGINT', async () => {
    await client.close();
    console.log('Conexión a MongoDB Atlas cerrada');
    process.exit(0);
});
