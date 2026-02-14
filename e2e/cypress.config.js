const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  projectId: "nngagv",
  e2e: {
    // Buscar archivos .feature en cualquier lugar
    specPattern: "**/*.feature",
    // Especificar explícitamente dónde están los step definitions
    stepDefinitions: ["cypress/e2e/steps/**/*.js"],

    // Configuramos los eventos de Node para procesar Gherkin
    async setupNodeEvents(on, config) {
      // Agregamos el plugin de Cucumber
      await preprocessor.addCucumberPreprocessorPlugin(on, config);

      // Configuramos Esbuild para que traduzca el código rápidamente
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      );

      return config;
    },
  },
});
