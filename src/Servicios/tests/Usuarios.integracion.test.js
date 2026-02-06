/**
 * Pruebas de Integración para UsuariosServicio
 * Prueba la interacción entre Servicio, Reglas y Repositorio (mock)
 */

const UsuariosServicio = require('../Usuarios');
const UsuariosReglas = require('../../Reglas/Usuarios');
const { ErroresUsuario } = require('../../Reglas/Constantes');

// Mock de BaseDeDatosRepositorio
const crearMockBaseDatos = () => {
    let datosEnMemoria = {
        usuarios: [
            { id: '1', nombre: 'Juan Pérez', email: 'juan@example.com' },
            { id: '2', nombre: 'María García', email: 'maria@example.com' },
        ]
    };

    return {
        obtenerValores: jest.fn((entidad) => {
            return datosEnMemoria[entidad] || [];
        }),
        obtenerPorId: jest.fn((entidad, id) => {
            const valores = datosEnMemoria[entidad] || [];
            return valores.find(v => v.id === id);
        }),
        guardarValores: jest.fn((entidad, valores) => {
            const valoresArray = Array.isArray(valores) ? valores : [valores];
            if (!datosEnMemoria[entidad]) {
                datosEnMemoria[entidad] = [];
            }
            valoresArray.forEach(nv => {
                const index = datosEnMemoria[entidad].findIndex(v => v.id === nv.id);
                if (index !== -1) {
                    datosEnMemoria[entidad][index] = nv;
                } else {
                    datosEnMemoria[entidad].push(nv);
                }
            });
            return Promise.resolve();
        }),
        editarValor: jest.fn((entidad, id, nuevoValor) => {
            const valores = datosEnMemoria[entidad] || [];
            const index = valores.findIndex(v => v.id === id);
            if (index !== -1) {
                valores[index] = { ...valores[index], ...nuevoValor };
                return valores[index];
            }
            return null;
        }),
        eliminarValor: jest.fn((entidad, id) => {
            const valores = datosEnMemoria[entidad] || [];
            const index = valores.findIndex(v => v.id === id);
            if (index !== -1) {
                const eliminado = valores.splice(index, 1)[0];
                return eliminado;
            }
            return null;
        }),
    };
};

describe('UsuariosServicio - Integración', () => {
    let mockBaseDatos;
    let usuariosServicio;

    beforeEach(() => {
        mockBaseDatos = crearMockBaseDatos();
        usuariosServicio = UsuariosServicio(mockBaseDatos, UsuariosReglas);
    });

    describe('obtenerUsuarios', () => {
        it('debe retornar la lista completa de usuarios', async () => {
            const usuarios = await usuariosServicio.obtenerUsuarios();
            expect(usuarios).toHaveLength(2);
            expect(usuarios[0].nombre).toBe('Juan Pérez');
            expect(usuarios[1].nombre).toBe('María García');
        });

        it('debe retornar un array vacío si no hay usuarios', async () => {
            mockBaseDatos.obtenerValores.mockReturnValueOnce([]);
            const usuarios = await usuariosServicio.obtenerUsuarios();
            expect(usuarios).toEqual([]);
        });

        it('debe llamar a obtenerValores del repositorio', async () => {
            await usuariosServicio.obtenerUsuarios();
            expect(mockBaseDatos.obtenerValores).toHaveBeenCalledWith('usuarios');
        });
    });

    describe('obtenerUsuarioPorId', () => {
        it('debe retornar un usuario específico por ID', async () => {
            const usuario = await usuariosServicio.obtenerUsuarioPorId('1');
            expect(usuario).toEqual({
                id: '1',
                nombre: 'Juan Pérez',
                email: 'juan@example.com'
            });
        });

        it('debe lanzar error cuando el usuario no existe', async () => {
            await expect(usuariosServicio.obtenerUsuarioPorId('999')).rejects.toThrow(
                ErroresUsuario.USUARIO_NO_EXISTE
            );
        });

        it('debe lanzar error cuando el ID es vacío o falsy', async () => {
            await expect(usuariosServicio.obtenerUsuarioPorId('')).rejects.toThrow(
                'El ID del usuario es obligatorio'
            );
        });

        it('debe lanzar error cuando el ID es null', async () => {
            await expect(usuariosServicio.obtenerUsuarioPorId(null)).rejects.toThrow(
                'El ID del usuario es obligatorio'
            );
        });

        it('debe llamar a obtenerPorId del repositorio', async () => {
            await usuariosServicio.obtenerUsuarioPorId('1');
            expect(mockBaseDatos.obtenerPorId).toHaveBeenCalledWith('usuarios', '1');
        });
    });

    describe('crearUsuario', () => {
        it('debe crear un usuario con datos válidos', async () => {
            const nuevoUsuario = {
                nombre: 'Pedro López',
                email: 'pedro@example.com'
            };

            const usuario = await usuariosServicio.crearUsuario(nuevoUsuario);

            expect(usuario.nombre).toBe('Pedro López');
            expect(usuario.email).toBe('pedro@example.com');
            expect(usuario.id).toBeDefined();
            expect(mockBaseDatos.guardarValores).toHaveBeenCalled();
        });

        it('debe lanzar error cuando falta el nombre', async () => {
            const usuarioInvalido = {
                email: 'test@example.com'
            };

            await expect(usuariosServicio.crearUsuario(usuarioInvalido)).rejects.toThrow(
                'El nombre y el email son obligatorios'
            );
        });

        it('debe lanzar error cuando falta el email', async () => {
            const usuarioInvalido = {
                nombre: 'Test User'
            };

            await expect(usuariosServicio.crearUsuario(usuarioInvalido)).rejects.toThrow(
                'El nombre y el email son obligatorios'
            );
        });

        it('debe generar un ID único para cada usuario', async () => {
            const usuario1 = await usuariosServicio.crearUsuario({
                nombre: 'Usuario 1',
                email: 'usuario1@example.com'
            });

            const usuario2 = await usuariosServicio.crearUsuario({
                nombre: 'Usuario 2',
                email: 'usuario2@example.com'
            });

            expect(usuario1.id).not.toBe(usuario2.id);
        });

        it('debe llamar a guardarValores del repositorio', async () => {
            const nuevoUsuario = {
                nombre: 'Test User',
                email: 'test@example.com'
            };

            await usuariosServicio.crearUsuario(nuevoUsuario);

            expect(mockBaseDatos.guardarValores).toHaveBeenCalledWith(
                'usuarios',
                expect.objectContaining({
                    nombre: 'Test User',
                    email: 'test@example.com'
                })
            );
        });

        it('debe validar con UsuariosReglas antes de guardar', async () => {
            const usuarioInvalido = {
                nombre: '',
                email: 'test@example.com'
            };

            try {
                await usuariosServicio.crearUsuario(usuarioInvalido);
            } catch (error) {
                expect(error.message).toContain('obligatorios');
            }

            expect(mockBaseDatos.guardarValores).not.toHaveBeenCalled();
        });
    });

    describe('Flujo completo de integración', () => {
        it('debe crear, obtener y verificar un usuario', async () => {
            // Crear
            const nuevoUsuario = await usuariosServicio.crearUsuario({
                nombre: 'Ana Martínez',
                email: 'ana@example.com'
            });

            expect(nuevoUsuario.id).toBeDefined();

            // Obtener todos
            const todos = await usuariosServicio.obtenerUsuarios();
            const usuarioCreado = todos.find(u => u.id === nuevoUsuario.id);

            expect(usuarioCreado).toEqual(nuevoUsuario);
        });
    });
});
