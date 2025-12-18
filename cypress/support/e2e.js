// Support file for E2E tests
import './commands';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

beforeEach(() => {
  cy.clearCookies();
  cy.viewport(1280, 720);
});

afterEach(() => {
  if (Cypress.currentTest.state === 'failed') {
    cy.screenshot(`failed-${Cypress.currentTest.title}`);
  }
});