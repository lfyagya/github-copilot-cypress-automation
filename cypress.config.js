const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Project ID for Cypress Dashboard (optional)
  projectId: "your_project_id",

  // Timeouts
  defaultCommandTimeout: 5000,
  requestTimeout: 5000,
  responseTimeout: 5000,
  pageLoadTimeout: 30000,
  execTimeout: 60000,
  taskTimeout: 60000,

  // Test configuration
  numTestsKeptInMemory: 25,

  // Viewport configuration
  viewportWidth: 1280,
  viewportHeight: 720,

  // Retries
  retries: {
    runMode: 2,
    openMode: 0,
  },

  // Video and screenshot settings
  video: true,
  videoCompression: 32,
  videoUploadOnPasses: false,
  screenshotOnRunFailure: true,
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",

  // Download folder
  downloadsFolder: "cypress/downloads",

  // Reporter configuration
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: false,
    html: true,
    json: true,
    timestamp: "yyyy-mm-dd_HH-MM-ss",
  },

  // Environment variables
  env: {
    baseUrl: "http://localhost:3000",
    apiUrl: "http://localhost:3000/api",
    apiTimeout: 10000,
    hideCredentials: true,
  },

  // Browser configuration
  browser: "chrome",
  chromeWebSecurity: false,

  // Only affects headless mode
  headless: true,

  // Node version
  nodeVersion: "default",

  // Waiting for animations/transitions
  animationDistanceThreshold: 5,
  waitForAnimations: true,

  // User agent
  userAgent: null,

  // Ignore uncaught exceptions
  uncaught: false,

  // Ignore uncaught promise rejections
  unhandledRejection: true,

  // Scroll behavior
  scrollBehavior: "top",

  // Component testing configuration (if needed)
  component: {
    testIsolation: true,
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/component.js",
  },

  // E2E testing configuration
  e2e: {
    testIsolation: true,
    baseUrl: "https://www.saucedemo.com",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    excludeSpecPattern: "*.hot-update.js",

    // Setup node events
    setupNodeEvents(on, config) {
      // Example: Register plugins here
      // on('task', {
      //   log(message) {
      //     console.log(message);
      //     return null;
      //   }
      // });

      // Return the modified config
      return config;
    },
  },

  // Logging
  logging: true,
  logLevel: "info",

  // Request/Response handling
  responseTimeout: 5000,

  // Tracing (Chromium only)
  tracing: false,
  tracingOptions: {
    screenshots: true,
    snapshots: true,
  },
});
