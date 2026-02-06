/**
 * Pruebas unitarias para UsuariosReglas
 * Valida que las reglas de negocio funcionen correctamente
 */

const UsuariosReglas = require('../Usuarios');

describe('Pruebas Unitarias - Reglas de Usuario', () => {
    
    describe('esUsuarioValido', () => {
        
        it('debe retornar true cuando el usuario tiene nombre y email válidos', () => {
            const usuario = {
                nombre: 'Juan Pérez',
                email: 'juan@example.com'
            };
            expect(UsuariosReglas.esUsuarioValido(usuario)).toBe(true);
        });

        it('debe lanzar error cuando falta el nombre', () => {
            const usuario = {
                email: 'juan@example.com'
            };
            expect(() => UsuariosReglas.esUsuarioValido(usuario)).toThrow(
                'El nombre y el email son obligatorios'
            );
        });

        it('debe lanzar error cuando falta el email', () => {
            const usuario = {
                nombre: 'Juan Pérez'
            };
            expect(() => UsuariosReglas.esUsuarioValido(usuario)).toThrow(
                'El nombre y el email son obligatorios'
            );
        });

        it('debe lanzar error cuando faltan nombre y email', () => {
            const usuario = {};
            expect(() => UsuariosReglas.esUsuarioValido(usuario)).toThrow(
                'El nombre y el email son obligatorios'
            );
        });

        it('debe lanzar error cuando el nombre es una cadena vacía', () => {
            const usuario = {
                nombre: '',
                email: 'juan@example.com'
            };
            expect(() => UsuariosReglas.esUsuarioValido(usuario)).toThrow(
                'El nombre y el email son obligatorios'
            );
        });

        it('debe lanzar error cuando el email es una cadena vacía', () => {
            const usuario = {
                nombre: 'Juan Pérez',
                email: ''
            };
            expect(() => UsuariosReglas.esUsuarioValido(usuario)).toThrow(
                'El nombre y el email son obligatorios'
            );
        });
    });

    describe('usuarioEstaAutorizado', () => {
        
        it('debe retornar true cuando el estado es "Activo"', () => {
            expect(UsuariosReglas.usuarioEstaAutorizado('Activo')).toBe(true);
        });

        it('debe retornar true cuando el estado es "Pendiente"', () => {
            expect(UsuariosReglas.usuarioEstaAutorizado('Pendiente')).toBe(true);
        });

        it('debe retornar false cuando el estado es "Bloqueado"', () => {
            expect(UsuariosReglas.usuarioEstaAutorizado('Bloqueado')).toBe(false);
        });

        it('debe retornar false cuando el estado es "Inactivo"', () => {
            expect(UsuariosReglas.usuarioEstaAutorizado('Inactivo')).toBe(false);
        });

        it('debe retornar false cuando el estado es una cadena vacía', () => {
            expect(UsuariosReglas.usuarioEstaAutorizado('')).toBe(false);
        });

        it('debe retornar false cuando el estado es null', () => {
            expect(UsuariosReglas.usuarioEstaAutorizado(null)).toBe(false);
        });

        it('debe retornar false cuando el estado es undefined', () => {
            expect(UsuariosReglas.usuarioEstaAutorizado(undefined)).toBe(false);
        });

        it('debe ser case-sensitive y rechazar "activo" en minúsculas', () => {
            expect(UsuariosReglas.usuarioEstaAutorizado('activo')).toBe(false);
        });
    });
});
