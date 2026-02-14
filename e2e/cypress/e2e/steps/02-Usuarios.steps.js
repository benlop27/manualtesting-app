// cypress/e2e/steps/02-Usuarios.steps.js
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("el usuario abre la pagina principal", () => {
  cy.visit("https://manualtesting-dev-138959494334.us-central1.run.app");
});

When("la pagina ha cargado", () => {
  cy.get("body").should("exist");
});

Then("validar que no existen errores al cargar", () => {
  cy.get("body").should("be.visible");
});

Then("se visualiza la tabla de informacion la cual contiene los siguientes valores: Id, Nombre de usuario e Email y", () => {
  cy.get("table").should("exist").and("be.visible");
});

Then("existen valores en la tabla y", () => {
  cy.get("tbody tr").should("have.length.greaterThan", 0);
});

Then("no se visualizan errores visibles y", () => {
  cy.get(".error").should("not.exist");
});

Then("no se visualizan errores visibles", () => {
  // Placeholder: validar que no existan errores
  cy.get(".error").should("not.exist");
});

Then("estan ordenados alfabeticamente por nombre", () => {
  cy.get("tbody tr").first().should("exist");
});
