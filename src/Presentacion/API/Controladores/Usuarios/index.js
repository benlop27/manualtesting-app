
//define las operaciones relacionadas con los usuarios dentro del controladorUsuarios
const express = require('express');
const router = express.Router(); 
const { ErroresUsuario } = require('../../../../Reglas/Constantes');
const UsuariosServicio = require('../../../../Servicios/Usuarios');
const UsuariosReglas = require('../../../../Reglas/Usuarios');
const BaseDeDatosRepositorio = require('../../../../Repositorios/DB/baseDeDatos');

const usuariosServicio = UsuariosServicio(BaseDeDatosRepositorio, UsuariosReglas);

// Mapeo de códigos de error a status HTTP
const ERROR_STATUS_MAP = {
    [ErroresUsuario.USUARIO_NO_EXISTE]: 404,
    [ErroresUsuario.ID_USUARIO_OBLIGATORIO]: 400,
    [ErroresUsuario.USUARIO_NO_VALIDO]: 400,
};

// Helper para manejar errores de forma consistente
const handleError = (res, error) => {
    console.error("Error:", error);
    const status = ERROR_STATUS_MAP[error.message] || 500;
    res.status(status).json({ error: error.message });
};

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await usuariosServicio.obtenerUsuarios();
        res.json({ usuarios });
    } catch (error) {
        handleError(res, error);
    }
});

// Ruta para obtener un usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || id.trim().length === 0) {
            throw new Error(ErroresUsuario.ID_USUARIO_OBLIGATORIO);
        }
        const user = await usuariosServicio.obtenerUsuarioPorId(id);
        res.json({ user });
    } catch (error) {
        handleError(res, error);
    }
});

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
    try {
        console.log("Cuerpo de la solicitud:", req.body);
        const usuario = await req.body;
        if (!usuario || Object.keys(usuario).length === 0) {
            throw new Error(ErroresUsuario.USUARIO_NO_VALIDO);
        }
        const nuevoUsuario = await usuariosServicio.crearUsuario(usuario);
        res.status(201).json({ message: "Usuario creado exitosamente", usuario: nuevoUsuario });
    } catch (error) {
        handleError(res, error);
    }
});

// Ruta para actualizar un usuario por ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioActualizado = req.body;
        if (!id || id.trim().length === 0) {
            throw new Error(ErroresUsuario.ID_USUARIO_OBLIGATORIO);
        }
        if (!usuarioActualizado || Object.keys(usuarioActualizado).length === 0) {
            throw new Error(ErroresUsuario.USUARIO_NO_VALIDO);
        }
        // TODO: Implementar actualización en el servicio
        res.json({ message: `Usuario con ID ${id} actualizado`, user: usuarioActualizado });
    } catch (error) {
        handleError(res, error);
    }
});

// Ruta para eliminar un usuario por ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || id.trim().length === 0) {
            throw new Error(ErroresUsuario.ID_USUARIO_OBLIGATORIO);
        }
        // TODO: Implementar eliminación en el servicio
        res.json({ message: `Usuario con ID ${id} eliminado` });
    } catch (error) {
        handleError(res, error);
    }
});

module.exports = router;    
