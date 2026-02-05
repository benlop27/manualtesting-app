/**
 * Reglas de negocio relacionadas con Usuarios
 * Aquí se definen las validaciones y reglas que deben cumplirse
 * al manejar usuarios en el sistema.
 */
const UsuariosReglas = {

    /**
     * Valida si un usuario cumple con los requisitos mínimos
     * @param {*} usuario 
     */
    
    esUsuarioValido: function (usuario) {
        if (!usuario.nombre || !usuario.email) {
            throw new Error("El nombre y el email son obligatorios");
        } return true;
    },

    /**
     * Verifica si un usuario está autorizado según su estado
     * @param {*} status 
     */

    usuarioEstaAutorizado: function (status) {

        if (status === 'Pendiente' || status === 'Activo') {
            return true;
        } else {

            return false;
        }
    },
}

module.exports = UsuariosReglas;