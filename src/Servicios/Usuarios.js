
/**
 * Servicio para la gestion de usuarios
 * @param {*} BaseDeDatosRepositorio 
 * @param {*} UsuariosReglas 
 * @returns 
 */

const e = require('express');
const { ErroresUsuario } = require('../Reglas/Constantes');
const { v4: uuidv4 } = require('uuid');

const UsuariosServicio = (BaseDeDatosRepositorio, UsuariosReglas) => {

    obtenerUsuarios = async () => {
        return await BaseDeDatosRepositorio.obtenerValores('usuarios');
    }

    obtenerUsuarioPorId = async (id) => {
        if (!id) {
            throw new Error("El ID del usuario es obligatorio", );
        }
        
        const usuario = BaseDeDatosRepositorio.obtenerPorId('usuarios', id);
        
        if (!usuario) {
            throw new Error(ErroresUsuario.USUARIO_NO_EXISTE);
        }
        return usuario;
    }

    crearUsuario = async (usuario) => {
        const esUsuarioValido = UsuariosReglas.esUsuarioValido(usuario);

        if (!esUsuarioValido) {
            throw new Error(ErroresUsuario.USUARIO_NO_VALIDO);
        }
        usuario.id = uuidv4();
        try {
            await BaseDeDatosRepositorio.guardarValores('usuarios', usuario);
            return usuario;
        } 
        catch (error) {
            console.error("Error al guardar el usuario:", error);
            throw new Error("Error al guardar el usuario");
        }
    }
    return {
        obtenerUsuarios,
        obtenerUsuarioPorId,
        crearUsuario
    }
}
module.exports = UsuariosServicio;