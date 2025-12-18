// Custom commands
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('logout', () => {
  cy.get('#react-burger-menu-btn').click();
  cy.get('#logout_sidebar_link').click();
});

Cypress.Commands.add('addToCart', (productName) => {
  cy.get('.inventory_item')
    .contains('.inventory_item_name', productName)
    .closest('.inventory_item')
    .find('[data-test="add-to-cart"]')
    .click();
});

Cypress.Commands.add('verifyText', (selector, expectedText) => {
  cy.get(selector).should('contain', expectedText);
});

Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-test="${testId}"]`);
});

Cypress.Commands.add('verifyVisible', (selector) => {
  cy.get(selector).should('be.visible');
});

Cypress.Commands.add('verifyUrlContains', (urlText) => {
  cy.url().should('include', urlText);
});