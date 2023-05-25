const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    failOnStatusCode: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here

    },
  },
});
