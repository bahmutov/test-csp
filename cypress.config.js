const { defineConfig } = require('cypress')

module.exports = defineConfig({
  experimentalNetworkStubbing: true,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // nothing
    },
    baseUrl: 'http://localhost:3003',
  },
})
