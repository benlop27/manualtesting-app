
//define las operaciones relacionadas con los usuarios dentro del controladorUsuarios
const express = require('express');
const router = express.Router(); 

// Ruta para obtener todos los usuarios
router.get('/', (req, res) => {
    // Lógica para obtener todos los usuarios
    res.json({ message: "Obteniendo todos los usuarios" });
});

// Ruta para obtener un usuario por ID
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    // Lógica para obtener un usuario por ID
    res.json({ message: `Obteniendo el usuario con ID: ${userId}` });
});

// Ruta para crear un nuevo usuario
router.post('/', (req, res) => {
    const newUser = req.body;
    // Lógica para crear un nuevo usuario
    res.json({ message: "Creando un nuevo usuario", user: newUser });
});

// Ruta para actualizar un usuario por ID
router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    // Lógica para actualizar un usuario por ID
    res.json({ message: `Actualizando el usuario con ID: ${userId}`, user: updatedUser });
});

// Ruta para eliminar un usuario por ID
router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    // Lógica para eliminar un usuario por ID
    res.json({ message: `Eliminando el usuario con ID: ${userId}` });
});

module.exports = router;    
