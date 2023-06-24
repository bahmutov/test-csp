const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // https://on.cypress.io/experiments
  // https://github.com/cypress-io/cypress/issues/1030
  experimentalCspAllowList: ['default-src', 'script-src'],
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // nothing
    },
    baseUrl: 'http://localhost:3003',
  },
})
