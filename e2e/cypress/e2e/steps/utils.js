/**
 * Funciones Reutilizables para Steps BDD en Cypress
 * Simplifica la escritura de steps al proporcionar utilidades generales
 */

/**
 * Navega a una URL específica
 * @param {string} url - La URL a visitar
 * @example
 * visitarPagina('https://manualtesting-dev-138959494334.us-central1.run.app')
 * visitarPagina('https://manualtesting-dev-138959494334.us-central1.run.app/usuarios')
 */
export const visitarPagina = (url) => {
  cy.visit(url);
};

/**
 * Obtiene un elemento por selector y verifica que sea visible
 * @param {string} selector - Selector CSS del elemento
 * @returns {Cypress.Chainable} - Elemento de Cypress
 * @example
 * obtenerElementoVisible('h1')
 * obtenerElementoVisible('.btn-primary')
 */
export const obtenerElementoVisible = (selector) => {
  return cy.get(selector).should('be.visible');
};

/**
 * Verifica que un elemento contenga un texto específico
 * @param {string} selector - Selector CSS del elemento
 * @param {string} texto - Texto esperado
 * @example
 * verificarTexto('h1', 'Bienvenido')
 * verificarTexto('.mensaje', 'Error al guardar')
 */
export const verificarTexto = (selector, texto) => {
  cy.get(selector).should('have.text', texto);
};

/**
 * Verifica que un elemento contenga parcialmente un texto
 * @param {string} selector - Selector CSS del elemento
 * @param {string} texto - Texto que debe incluir
 * @example
 * verificarTextoIncluye('.error', 'Email inválido')
 */
export const verificarTextoIncluye = (selector, texto) => {
  cy.get(selector).should('include.text', texto);
};

/**
 * Verifica que un elemento sea visible y contenga un texto
 * @param {string} selector - Selector CSS del elemento
 * @param {string} texto - Texto esperado
 * @example
 * verificarElementoConTexto('h1', 'Bienvenido a la aplicación')
 */
export const verificarElementoConTexto = (selector, texto) => {
  cy.get(selector)
    .should('be.visible')
    .and('have.text', texto);
};

/**
 * Verifica que un elemento sea visible
 * @param {string} selector - Selector CSS del elemento
 * @example
 * verificarVisibilidad('.navbar')
 * verificarVisibilidad('#loginForm')
 */
export const verificarVisibilidad = (selector) => {
  cy.get(selector).should('be.visible');
};

/**
 * Verifica que un elemento NO sea visible
 * @param {string} selector - Selector CSS del elemento
 * @example
 * verificarNoVisibilidad('.modal')
 */
export const verificarNoVisibilidad = (selector) => {
  cy.get(selector).should('not.be.visible');
};

/**
 * Verifica que un elemento exista en el DOM
 * @param {string} selector - Selector CSS del elemento
 * @example
 * verificarExistencia('.btn-guardar')
 */
export const verificarExistencia = (selector) => {
  cy.get(selector).should('exist');
};

/**
 * Verifica que un elemento NO exista en el DOM
 * @param {string} selector - Selector CSS del elemento
 * @example
 * verificarNoExistencia('.error-mensaje')
 */
export const verificarNoExistencia = (selector) => {
  cy.get(selector).should('not.exist');
};

/**
 * Haz click en un elemento
 * @param {string} selector - Selector CSS del elemento
 * @example
 * hacerClick('.btn-enviar')
 * hacerClick('a[href="/usuarios"]')
 */
export const hacerClick = (selector) => {
  cy.get(selector).click();
};

/**
 * Completa un input con un valor
 * @param {string} selector - Selector CSS del input
 * @param {string} valor - Valor a escribir
 * @example
 * completarInput('input[name="email"]', 'usuario@example.com')
 * completarInput('#password', 'miPassword123')
 */
export const completarInput = (selector, valor) => {
  cy.get(selector).type(valor);
};

/**
 * Completa un input limpiando el contenido previo
 * @param {string} selector - Selector CSS del input
 * @param {string} valor - Valor a escribir
 * @example
 * completarInputLimpio('input[name="email"]', 'nuevo@example.com')
 */
export const completarInputLimpio = (selector, valor) => {
  cy.get(selector).clear().type(valor);
};

/**
 * Verifica que un input tenga un valor específico
 * @param {string} selector - Selector CSS del input
 * @param {string} valor - Valor esperado
 * @example
 * verificarValorInput('input[name="email"]', 'usuario@example.com')
 */
export const verificarValorInput = (selector, valor) => {
  cy.get(selector).should('have.value', valor);
};

/**
 * Verifica que un atributo de un elemento tenga un valor específico
 * @param {string} selector - Selector CSS del elemento
 * @param {string} atributo - Nombre del atributo
 * @param {string} valor - Valor esperado
 * @example
 * verificarAtributo('img', 'src', 'logo.png')
 * verificarAtributo('[type="button"]', 'disabled', 'disabled')
 */
export const verificarAtributo = (selector, atributo, valor) => {
  cy.get(selector).should('have.attr', atributo, valor);
};

/**
 * Verifica que el título de la pestaña sea correcto
 * @param {string} tituloEsperado - Texto esperado en el título
 * @example
 * verificarTituloPestana('Bienvenido - Mi App')
 */
export const verificarTituloPestana = (tituloEsperado) => {
  cy.title().should('include', tituloEsperado);
};

/**
 * Espera a que un elemento esté presente antes de continuar
 * @param {string} selector - Selector CSS del elemento
 * @param {number} timeout - Tiempo máximo en ms (default: 4000)
 * @example
 * esperarElemento('.loading-complete')
 * esperarElemento('.modal', 5000)
 */
export const esperarElemento = (selector, timeout = 4000) => {
  cy.get(selector, { timeout }).should('exist');
};

/**
 * Selecciona una opción de un dropdown/select
 * @param {string} selector - Selector CSS del select
 * @param {string} valor - Valor de la opción a seleccionar
 * @example
 * seleccionarOpcion('select[name="pais"]', 'Colombia')
 * seleccionarOpcion('#tipoUsuario', 'Admin')
 */
export const seleccionarOpcion = (selector, valor) => {
  cy.get(selector).select(valor);
};

/**
 * Verifica que un elemento contenga una clase CSS
 * @param {string} selector - Selector CSS del elemento
 * @param {string} clase - Clase CSS a verificar
 * @example
 * verificarClase('.btn', 'btn-primary')
 * verificarClase('.mensaje', 'error')
 */
export const verificarClase = (selector, clase) => {
  cy.get(selector).should('have.class', clase);
};

/**
 * Verifica que un elemento NO contenga una clase CSS
 * @param {string} selector - Selector CSS del elemento
 * @param {string} clase - Clase CSS a verificar
 * @example
 * verificarNoClase('.btn', 'disabled')
 */
export const verificarNoClase = (selector, clase) => {
  cy.get(selector).should('not.have.class', clase);
};

/**
 * Obtiene el texto de un elemento
 * @param {string} selector - Selector CSS del elemento
 * @returns {Cypress.Chainable<string>} - Texto del elemento
 * @example
 * obtenerTexto('h1').then(texto => cy.log(texto))
 */
export const obtenerTexto = (selector) => {
  return cy.get(selector).invoke('text');
};

/**
 * Verifica que un elemento esté disabled
 * @param {string} selector - Selector CSS del elemento
 * @example
 * verificarDeshabilitado('.btn-enviar')
 * verificarDeshabilitado('input[name="email"]')
 */
export const verificarDeshabilitado = (selector) => {
  cy.get(selector).should('be.disabled');
};

/**
 * Verifica que un elemento esté habilitado
 * @param {string} selector - Selector CSS del elemento
 * @example
 * verificarHabilitado('.btn-enviar')
 */
export const verificarHabilitado = (selector) => {
  cy.get(selector).should('not.be.disabled');
};

/**
 * Realiza scroll en la página hacia un elemento
 * @param {string} selector - Selector CSS del elemento
 * @example
 * scrollHaciaElemento('.footer')
 * scrollHaciaElemento('#seccion-contacto')
 */
export const scrollHaciaElemento = (selector) => {
  cy.get(selector).scrollIntoView();
};

/**
 * Pausa la ejecución por un tiempo específico (usar con cuidado)
 * @param {number} milisegundos - Tiempo en ms
 * @example
 * esperar(500)
 */
export const esperar = (milisegundos) => {
  cy.wait(milisegundos);
};

/**
 * Verifica que la URL actual incluya un texto específico
 * @param {string} urlParcial - Parte de la URL a verificar
 * @example
 * verificarURL('/usuarios')
 * verificarURL('https://manualtesting-dev-138959494334.us-central1.run.app/dashboard')
 */
export const verificarURL = (urlParcial) => {
  cy.url().should('include', urlParcial);
};

/**
 * Navega hacia atrás en el historial del navegador
 * @example
 * irAtras()
 */
export const irAtras = () => {
  cy.go('back');
};

/**
 * Navega hacia adelante en el historial del navegador
 * @example
 * irAdelante()
 */
export const irAdelante = () => {
  cy.go('forward');
};

/**
 * Realiza una acción de envío de formulario (click en botón submit o envío de formulario)
 * @param {string} selector - Selector CSS del botón o formulario
 * @example
 * enviarFormulario('.btn-submit')
 * enviarFormulario('form')
 */
export const enviarFormulario = (selector) => {
  cy.get(selector).submit();
};

/**
 * Verifica que un elemento sea editable (no tenga atributo readonly)
 * @param {string} selector - Selector CSS del elemento
 * @example
 * verificarEditable('input[name="email"]')
 */
export const verificarEditable = (selector) => {
  cy.get(selector).should('not.have.attr', 'readonly');
};

/**
 * Verifica que un elemento sea de solo lectura
 * @param {string} selector - Selector CSS del elemento
 * @example
 * verificarSoloLectura('input[name="createdAt"]')
 */
export const verificarSoloLectura = (selector) => {
  cy.get(selector).should('have.attr', 'readonly');
};

/**
 * Obtiene el número de elementos que coinciden con un selector
 * @param {string} selector - Selector CSS
 * @returns {Cypress.Chainable<number>} - Cantidad de elementos
 * @example
 * obtenerCantidadElementos('.fila').then(cantidad => cy.log(`Hay ${cantidad} filas`))
 */
export const obtenerCantidadElementos = (selector) => {
  return cy.get(selector).then(($elementos) => $elementos.length);
};

/**
 * Verifica que exista una cantidad específica de elementos
 * @param {string} selector - Selector CSS
 * @param {number} cantidad - Cantidad esperada
 * @example
 * verificarCantidadElementos('table tbody tr', 5)
 */
export const verificarCantidadElementos = (selector, cantidad) => {
  cy.get(selector).should('have.length', cantidad);
};

/**
 * Limpia un campo de input
 * @param {string} selector - Selector CSS del input
 * @example
 * limpiarInput('input[name="busqueda"]')
 */
export const limpiarInput = (selector) => {
  cy.get(selector).clear();
};

/**
 * Presiona una tecla específica (Enter, Escape, etc.)
 * @param {string} selector - Selector CSS del elemento
 * @param {string} tecla - Tecla a presionar (enter, esc, tab, etc.)
 * @example
 * presionarTecla('input[name="email"]', 'enter')
 * presionarTecla('.modal', 'esc')
 */
export const presionarTecla = (selector, tecla) => {
  cy.get(selector).type(`{${tecla}}`);
};

/**
 * Verifica que un elemento esté en el viewport (visible en la pantalla)
 * @param {string} selector - Selector CSS del elemento
 * @example
 * verificarEnViewport('.navegacion')
 */
export const verificarEnViewport = (selector) => {
  cy.get(selector).should('be.inViewport');
};
