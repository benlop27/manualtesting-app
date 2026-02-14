// cypress/e2e/steps/01-PaginaInicio.steps.js
import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

// Mapeamos: "Dado que abro la página principal de la aplicación"
Given("que abro la página principal de la aplicación", () => {
  // Asegúrate de que tu servidor local (ej. Node/Express) esté corriendo.
  // Ajusta la URL si tu puerto no es el 3000.
  cy.visit("https://manualtesting-dev-138959494334.us-central1.run.app");
});

// Mapeamos: "Entonces debería ver el encabezado principal con el texto {string}"
// Usamos {string} para capturar el texto entre comillas del archivo .feature
Then("debería ver el encabezado principal con el texto {string}", (textoEsperado) => {
  // Buscamos una etiqueta <h1> o <h2> y verificamos su texto y visibilidad
  cy.get('h1, h2').first().should('have.text', textoEsperado).and('be.visible');
});

// Mapeamos: "Y la página debería tener el título correcto en la pestaña del navegador"
Then("la página debería tener el título correcto en la pestaña del navegador", () => {
  // Verifica el <title> en el <head> del HTML
  cy.title().should('include', 'Bienvenido');
});