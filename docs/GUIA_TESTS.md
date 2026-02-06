# Guía: Ejecutar y Entender los Tests

## 📖 Tabla de Contenidos
- [Ejecución Rápida](#ejecución-rápida)
- [Tests en Detalle](#tests-en-detalle)
- [Interpretación de Resultados](#interpretación-de-resultados)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Ejecución Rápida

### Ver todos los tests
```bash
npm test
```

### Ver tests de un archivo específico
```bash
# Reglas de negocio
npm test -- src/Reglas/tests/Usuarios.test.js

# Servicios
npm test -- src/Servicios/tests/Usuarios.integracion.test.js

# Controlador API
npm test -- src/Presentacion/API/Controladores/Usuarios/tests/index.integracion.test.js
```

### Modo watch (recarga automática)
```bash
npm test -- --watch
```

### Ver coverage de código
```bash
npm test -- --coverage
```

---

## 🧪 Tests en Detalle

### 1. Reglas de Negocio (`src/Reglas/tests/Usuarios.test.js`)

**¿Qué prueba?**
- Lógica pura de validación de usuarios

**Pruebas incluidas:**
```
✓ debe crear un usuario válido
✓ debe rechazar usuario sin nombre
✓ debe rechazar usuario sin email
✓ debe aceptar usuario autorizado (Activo)
✓ debe aceptar usuario autorizado (Pendiente)
✓ debe rechazar usuario con estado inválido
...y más
```

**Cómo leerlo:**
```javascript
it('debe rechazar usuario sin nombre', () => {
    expect(() => UsuariosReglas.esUsuarioValido({ email: 'test@email.com' }))
        .toThrow('El nombre y el email son obligatorios');
});
```

---

### 2. Servicios (`src/Servicios/tests/Usuarios.integracion.test.js`)

**¿Qué prueba?**
- Orquestación de servicios
- Integración con repositorio (simulado)

**Pruebas incluidas:**
```
✓ obtenerUsuarios debe retornar array
✓ obtenerUsuarioPorId debe retornar usuario específico
✓ crearUsuario debe generar UUID
✓ crearUsuario debe validar con UsuariosReglas
✓ debe manejar errores del repositorio
...y más
```

**Cómo leerlo:**
```javascript
it('crearUsuario debe generar UUID', async () => {
    const usuario = { nombre: 'Test', email: 'test@email.com' };
    const resultado = await usuariosServicio.crearUsuario(usuario);
    
    expect(resultado.id).toBeDefined();
    expect(resultado.id.length).toBeGreaterThan(0);
});
```

---

### 3. Controlador API (`src/Presentacion/API/Controladores/Usuarios/tests/index.integracion.test.js`)

**¿Qué prueba?**
- Rutas HTTP y responses
- Status codes correctos
- Validación de estructura de respuestas

**Pruebas por endpoint:**

#### GET /usuarios
```
✓ debe retornar lista de usuarios con status 200
✓ debe retornar usuarios con estructura correcta
✓ debe retornar Content-Type application/json
✓ debe retornar un array válido
```

#### GET /usuarios/:id
```
✓ debe retornar JSON para rutas con ID
✓ debe intentar recuperar un usuario con ID válido
✓ debe retornar JSON en respuesta
```

#### POST /usuarios
```
✓ debe retornar error 400 cuando falta el nombre
✓ debe retornar error 400 cuando falta el email
✓ debe retornar error 400 cuando el body está vacío
✓ debe crear un usuario con datos válidos
✓ debe retornar Content-Type application/json
✓ debe rechazar email con formato incorrecto
✓ debe validar estructura de nombres
```

#### PUT /usuarios/:id
```
✓ debe aceptar solicitud PUT válida
✓ debe retornar error cuando el body está vacío
✓ debe retornar JSON en respuesta
```

#### DELETE /usuarios/:id
```
✓ debe aceptar solicitud DELETE
✓ debe retornar JSON en respuesta
✓ debe manejar IDs inexistentes
```

---

## 📊 Interpretación de Resultados

### Output Típico
```
Test Suites: 3 passed, 3 total
Tests:       58 passed, 58 total
Snapshots:   0 total
Time:        0.361 s, estimated 1 s
```

**¿Qué significa?**
- `Test Suites: 3 passed, 3 total` → 3 archivos de test, todos pasaron
- `Tests: 58 passed, 58 total` → 58 tests individuales, todos pasaron
- `Time: 0.361 s` → Tardó 361ms en ejecutar todo

### Interpretación de Tests Específicos

#### ✅ Test Pasado
```
✓ debe retornar lista de usuarios con status 200
```
- El test ejecutó correctamente
- Todas las assertions pasaron
- El tiempo se muestra en ms

#### ❌ Test Fallido
```
✕ debe retornar error cuando el body está vacío
  Expected value: 200
  Received: 201
```
- Una o más assertions fallaron
- Muestra qué se esperaba vs qué se recibió
- Incluye line number donde falló

---

## 🔍 Entender los Assertions

### Assertions Comunes en los Tests

#### En Reglas (Unit Tests)
```javascript
// Debe lanzar error
expect(() => function())
    .toThrow('mensaje de error');

// Debe retornar true
expect(resultado).toBe(true);

// Debe existir
expect(valor).toBeDefined();
```

#### En Servicios (Mocks)
```javascript
// Mock debe haber sido llamado
expect(mockRepositorio.obtenerValores).toHaveBeenCalled();

// Mock debe haber sido llamado con parámetros específicos
expect(mockRepositorio.guardarValores)
    .toHaveBeenCalledWith(expect.any(Object));

// Resultado debe tener propiedad
expect(resultado).toHaveProperty('id');
```

#### En API (Supertest)
```javascript
// Status code
.expect(200)
.expect(response => { expect([200, 404]).toContain(response.status); })

// Content-Type
.expect('Content-Type', /json/)

// Propiedades en respuesta
expect(response.body).toHaveProperty('usuarios');
expect(Array.isArray(response.body.usuarios)).toBe(true);
```

---

## 🛠️ Troubleshooting

### "Tests no corren"
```bash
# Asegurate de estar en la carpeta correcta
cd /Users/benlop27/Documents/manualPruebas/4-IntegrationTest

# Instala dependencias si es necesario
npm install

# Intenta correr tests
npm test
```

### "Cannot find module"
```bash
# Si falta supertest
npm install -D supertest

# Si falta jest
npm install -D jest
```

### "Port already in use"
Los tests usan un Express mock (no levanta servidor real), así que no debería haber conflicto de puertos.

### "console.error messages"
Es normal ver mensajes como:
```
console.error
    Error: Error: El usuario no existe
```
Estos son los errores que el código está throweando durante los tests (comportamiento esperado).

Para suprimirlos temporalmente:
```bash
npm test -- --silent
```

---

## 📈 Mejorar la Cobertura

### Ver qué code no está siendo testeado
```bash
npm test -- --coverage
```

Genera un reporte tipo:
```
File          | % Stmts | % Branch | % Funcs | % Lines
---|---|---|---|---
Usuarios.js   | 100    | 100      | 100     | 100
```

### Objetivos recomendados:
- Statements: > 80%
- Branches: > 75%
- Functions: > 80%
- Lines: > 80%

---

## 🚀 Tips y Tricks

### Ejecutar un test específico
```bash
npm test -- --testNamePattern="debe retornar"
```

### Ejecutar hasta el primer fallo
```bash
npm test -- --bail
```

### Cambiar el reporter
```bash
npm test -- --verbose
```

### Debug con node inspector
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

Luego abre `chrome://inspect` en Chrome.

---

## 📚 Recursos Adicionales

- [Jest Documentation](https://jestjs.io/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

