# Pruebas de Integración - UsuariosServicio

## ¿Qué son las pruebas de integración?

Las pruebas de integración verifican que múltiples componentes trabajen correctamente juntos. A diferencia de las pruebas unitarias que prueban componentes aislados, las pruebas de integración simulan cómo interactúan:

- **Servicio** (lógica de negocio)
- **Reglas** (validaciones)
- **Repositorio** (acceso a datos)

## Estructura del Archivo

```
src/Servicios/tests/Usuarios.integracion.test.js
```

### Ubicación en la Arquitectura

```
Controlador
    ↓
Servicio ← (Pruebas aquí)
    ↓ ↓
Reglas + Repositorio (Mock)
```

## Mock de BaseDeDatos

### ¿Por qué un Mock?

Un **mock** es una copia simulada del repositorio real. Usamos mocks porque:

1. **Velocidad**: Las pruebas no escriben archivos reales
2. **Aislamiento**: Las pruebas no interfieren entre sí
3. **Control**: Podemos simular errores fácilmente
4. **Limpieza**: No necesitamos limpiar datos después

### Estructura del Mock

```javascript
const crearMockBaseDatos = () => {
    let datosEnMemoria = {
        usuarios: [
            { id: '1', nombre: 'Juan Pérez', email: 'juan@example.com' },
            { id: '2', nombre: 'María García', email: 'maria@example.com' },
        ]
    };

    return {
        obtenerValores: jest.fn(...),
        obtenerPorId: jest.fn(...),
        guardarValores: jest.fn(...),
        editarValor: jest.fn(...),
        eliminarValor: jest.fn(...),
    };
};
```

**Características:**

- **Datos en memoria**: Simula archivos JSON sin escribir en disco
- **jest.fn()**: Registra cada llamada para verificarla
- **Comportamiento real**: Mezcla datos como el repositorio real

## Grupos de Pruebas

### 1. `obtenerUsuarios`

Verifica que el servicio recupere la lista completa de usuarios.

```javascript
describe('obtenerUsuarios', () => {
    it('debe retornar la lista completa de usuarios', async () => {
        const usuarios = await usuariosServicio.obtenerUsuarios();
        expect(usuarios).toHaveLength(2);
    });
});
```

**Pruebas:**
- ✓ Retorna lista completa
- ✓ Retorna array vacío si no hay datos
- ✓ Verifica que se llama al repositorio

### 2. `obtenerUsuarioPorId`

Verifica la búsqueda de un usuario específico con validaciones.

```javascript
describe('obtenerUsuarioPorId', () => {
    it('debe retornar un usuario específico por ID', async () => {
        const usuario = await usuariosServicio.obtenerUsuarioPorId('1');
        expect(usuario.nombre).toBe('Juan Pérez');
    });

    it('debe lanzar error cuando el usuario no existe', async () => {
        await expect(
            usuariosServicio.obtenerUsuarioPorId('999')
        ).rejects.toThrow(ErroresUsuario.USUARIO_NO_EXISTE);
    });
});
```

**Pruebas:**
- ✓ Obtiene usuario por ID
- ✓ Error cuando no existe
- ✓ Error con ID vacío/null
- ✓ Verifica llamada al repositorio

### 3. `crearUsuario`

Verifica la creación con validación de reglas.

```javascript
describe('crearUsuario', () => {
    it('debe crear un usuario con datos válidos', async () => {
        const nuevoUsuario = {
            nombre: 'Pedro López',
            email: 'pedro@example.com'
        };
        const usuario = await usuariosServicio.crearUsuario(nuevoUsuario);
        expect(usuario.id).toBeDefined();
    });

    it('debe lanzar error cuando falta el nombre', async () => {
        await expect(
            usuariosServicio.crearUsuario({ email: 'test@example.com' })
        ).rejects.toThrow('El nombre y el email son obligatorios');
    });
});
```

**Pruebas:**
- ✓ Crea usuario con datos válidos
- ✓ Genera ID único (UUID)
- ✓ Error sin nombre
- ✓ Error sin email
- ✓ Valida antes de guardar
- ✓ Verifica llamada al repositorio

### 4. Flujo Completo de Integración

Verifica un escenario realista end-to-end.

```javascript
describe('Flujo completo de integración', () => {
    it('debe crear, obtener y verificar un usuario', async () => {
        // Crear
        const nuevoUsuario = await usuariosServicio.crearUsuario({
            nombre: 'Ana Martínez',
            email: 'ana@example.com'
        });

        // Obtener todos
        const todos = await usuariosServicio.obtenerUsuarios();
        const usuarioCreado = todos.find(u => u.id === nuevoUsuario.id);

        expect(usuarioCreado).toEqual(nuevoUsuario);
    });
});
```

## Flujo de Ejecución de una Prueba

```
1. beforeEach() → Crea nuevo mock y servicio limpio
   ↓
2. Ejecuta la prueba (ej: crear usuario)
   ↓
3. Servicio valida con UsuariosReglas
   ↓
4. Servicio guarda con BaseDeDatos (mock)
   ↓
5. Mock actualiza datos en memoria
   ↓
6. expect() verifica resultados
   ↓
7. jest.fn() verifica que se llamaron los métodos
```

## Verificación de Llamadas

Con `jest.fn()` podemos verificar que los métodos del repositorio se llamaron correctamente:

```javascript
// Verificar que se llamó
expect(mockBaseDatos.obtenerValores).toHaveBeenCalledWith('usuarios');

// Verificar que se llamó con objeto específico
expect(mockBaseDatos.guardarValores).toHaveBeenCalledWith(
    'usuarios',
    expect.objectContaining({
        nombre: 'Test User',
        email: 'test@example.com'
    })
);
```

## Cómo Ejecutar

### Solo pruebas de integración del servicio

```bash
npm test -- src/Servicios/tests/Usuarios.integracion.test.js
```

### Solo un grupo de pruebas

```bash
npm test -- src/Servicios/tests/Usuarios.integracion.test.js -t "crearUsuario"
```

### Todas las pruebas del proyecto

```bash
npm test
```

### Ver cobertura

```bash
npm test -- --coverage
```

## Beneficios de estas Pruebas

| Aspecto | Beneficio |
|--------|----------|
| **Confianza** | Verificas que el flujo completo funciona |
| **Rapidez** | Mocks evitan I/O de disco |
| **Mantenibilidad** | Los mocks aíslan cambios |
| **Documentación** | Las pruebas documentan cómo se usa |
| **Refactoring** | Detectas rompimientos temprano |

## Datos de Prueba

El mock inicia con 2 usuarios:

```javascript
{
    id: '1',
    nombre: 'Juan Pérez',
    email: 'juan@example.com'
},
{
    id: '2',
    nombre: 'María García',
    email: 'maria@example.com'
}
```

Se pueden agregar más en `crearMockBaseDatos()` antes de ejecutar las pruebas.

## Próximos Pasos

1. Agregar pruebas para **controladores** (con mock del servicio)
2. Agregar pruebas para **manejo de errores** (simular fallos del repositorio)
3. Agregar pruebas **e2e** (sin mocks, con datos reales)
4. Medir **cobertura de código**

## Referencias

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [Mock Functions](https://jestjs.io/docs/mock-functions)
