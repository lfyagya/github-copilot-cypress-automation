/**
 * BasePage - Base Page Object for Cypress Test Automation
 * Provides common page object functionality including navigation, element interaction,
 * assertions, and utilities for Cypress test automation.
 */

class BasePage {
  /**
   * Navigate to a specific URL
   * @param {string} url - The URL to navigate to
   */
  visit(url) {
    cy.visit(url);
    return this;
  }

  /**
   * Navigate to a specific path relative to base URL
   * @param {string} path - The path to navigate to
   */
  navigateTo(path) {
    cy.visit(path);
    return this;
  }

  /**
   * Get the current URL
   * @returns {Cypress.Chainable<string>} The current URL
   */
  getCurrentUrl() {
    return cy.url();
  }

  /**
   * Go back in browser history
   */
  goBack() {
    cy.go('back');
    return this;
  }

  /**
   * Go forward in browser history
   */
  goForward() {
    cy.go('forward');
    return this;
  }

  /**
   * Reload the current page
   */
  reload() {
    cy.reload();
    return this;
  }

  /**
   * Click on an element
   * @param {string} selector - CSS selector of the element
   * @param {object} options - Cypress click options
   */
  click(selector, options = {}) {
    cy.get(selector).click(options);
    return this;
  }

  /**
   * Double-click on an element
   * @param {string} selector - CSS selector of the element
   * @param {object} options - Cypress dblclick options
   */
  doubleClick(selector, options = {}) {
    cy.get(selector).dblclick(options);
    return this;
  }

  /**
   * Right-click on an element
   * @param {string} selector - CSS selector of the element
   * @param {object} options - Cypress rightclick options
   */
  rightClick(selector, options = {}) {
    cy.get(selector).rightclick(options);
    return this;
  }

  /**
   * Hover over an element
   * @param {string} selector - CSS selector of the element
   */
  hover(selector) {
    cy.get(selector).trigger('mouseover');
    return this;
  }

  /**
   * Type text into an input field
   * @param {string} selector - CSS selector of the input element
   * @param {string} text - Text to type
   * @param {object} options - Cypress type options
   */
  typeText(selector, text, options = {}) {
    cy.get(selector).type(text, options);
    return this;
  }

  /**
   * Clear an input field and type new text
   * @param {string} selector - CSS selector of the input element
   * @param {string} text - Text to type
   */
  clearAndType(selector, text) {
    cy.get(selector).clear().type(text);
    return this;
  }

  /**
   * Clear an input field
   * @param {string} selector - CSS selector of the input element
   */
  clearInput(selector) {
    cy.get(selector).clear();
    return this;
  }

  /**
   * Select an option from a dropdown by value
   * @param {string} selector - CSS selector of the select element
   * @param {string} value - Value of the option to select
   */
  selectDropdownByValue(selector, value) {
    cy.get(selector).select(value);
    return this;
  }

  /**
   * Select an option from a dropdown by visible text
   * @param {string} selector - CSS selector of the select element
   * @param {string} text - Visible text of the option
   */
  selectDropdownByText(selector, text) {
    cy.get(selector).select(text);
    return this;
  }

  /**
   * Check a checkbox
   * @param {string} selector - CSS selector of the checkbox
   */
  checkCheckbox(selector) {
    cy.get(selector).check();
    return this;
  }

  /**
   * Uncheck a checkbox
   * @param {string} selector - CSS selector of the checkbox
   */
  uncheckCheckbox(selector) {
    cy.get(selector).uncheck();
    return this;
  }

  /**
   * Toggle a checkbox
   * @param {string} selector - CSS selector of the checkbox
   */
  toggleCheckbox(selector) {
    cy.get(selector).then(($element) => {
      if ($element.is(':checked')) {
        cy.get(selector).uncheck();
      } else {
        cy.get(selector).check();
      }
    });
    return this;
  }

  /**
   * Get text content of an element
   * @param {string} selector - CSS selector of the element
   * @returns {Cypress.Chainable<string>} Text content
   */
  getText(selector) {
    return cy.get(selector).invoke('text');
  }

  /**
   * Get the value of an input element
   * @param {string} selector - CSS selector of the input element
   * @returns {Cypress.Chainable<string>} Value of the input
   */
  getInputValue(selector) {
    return cy.get(selector).invoke('val');
  }

  /**
   * Get an attribute value of an element
   * @param {string} selector - CSS selector of the element
   * @param {string} attribute - Attribute name
   * @returns {Cypress.Chainable<string>} Attribute value
   */
  getAttribute(selector, attribute) {
    return cy.get(selector).invoke('attr', attribute);
  }

  /**
   * Check if element is visible
   * @param {string} selector - CSS selector of the element
   * @returns {Cypress.Chainable<boolean>} True if visible
   */
  isVisible(selector) {
    return cy.get(selector).should('be.visible');
  }

  /**
   * Check if element is hidden
   * @param {string} selector - CSS selector of the element
   * @returns {Cypress.Chainable<boolean>} True if hidden
   */
  isHidden(selector) {
    return cy.get(selector).should('not.be.visible');
  }

  /**
   * Check if element exists in DOM
   * @param {string} selector - CSS selector of the element
   */
  elementExists(selector) {
    cy.get(selector).should('exist');
    return this;
  }

  /**
   * Check if element does not exist in DOM
   * @param {string} selector - CSS selector of the element
   */
  elementDoesNotExist(selector) {
    cy.get(selector).should('not.exist');
    return this;
  }

  /**
   * Wait for an element to be visible
   * @param {string} selector - CSS selector of the element
   * @param {number} timeout - Timeout in milliseconds (default: 4000)
   */
  waitForElement(selector, timeout = 4000) {
    cy.get(selector, { timeout }).should('be.visible');
    return this;
  }

  /**
   * Wait for an element to disappear
   * @param {string} selector - CSS selector of the element
   * @param {number} timeout - Timeout in milliseconds (default: 4000)
   */
  waitForElementToDisappear(selector, timeout = 4000) {
    cy.get(selector, { timeout }).should('not.exist');
    return this;
  }

  /**
   * Wait for a specific time
   * @param {number} milliseconds - Time to wait in milliseconds
   */
  wait(milliseconds) {
    cy.wait(milliseconds);
    return this;
  }

  /**
   * Assert that element has specific text
   * @param {string} selector - CSS selector of the element
   * @param {string} expectedText - Expected text content
   */
  assertTextEquals(selector, expectedText) {
    cy.get(selector).should('have.text', expectedText);
    return this;
  }

  /**
   * Assert that element contains specific text
   * @param {string} selector - CSS selector of the element
   * @param {string} text - Text that should be contained
   */
  assertTextContains(selector, text) {
    cy.get(selector).should('contain.text', text);
    return this;
  }

  /**
   * Assert that element has specific attribute value
   * @param {string} selector - CSS selector of the element
   * @param {string} attribute - Attribute name
   * @param {string} value - Expected attribute value
   */
  assertAttributeEquals(selector, attribute, value) {
    cy.get(selector).should('have.attr', attribute, value);
    return this;
  }

  /**
   * Assert that element has specific class
   * @param {string} selector - CSS selector of the element
   * @param {string} className - Class name
   */
  assertHasClass(selector, className) {
    cy.get(selector).should('have.class', className);
    return this;
  }

  /**
   * Assert that element does not have specific class
   * @param {string} selector - CSS selector of the element
   * @param {string} className - Class name
   */
  assertDoesNotHaveClass(selector, className) {
    cy.get(selector).should('not.have.class', className);
    return this;
  }

  /**
   * Assert that element is disabled
   * @param {string} selector - CSS selector of the element
   */
  assertIsDisabled(selector) {
    cy.get(selector).should('be.disabled');
    return this;
  }

  /**
   * Assert that element is enabled
   * @param {string} selector - CSS selector of the element
   */
  assertIsEnabled(selector) {
    cy.get(selector).should('be.enabled');
    return this;
  }

  /**
   * Assert that element is checked
   * @param {string} selector - CSS selector of the checkbox
   */
  assertIsChecked(selector) {
    cy.get(selector).should('be.checked');
    return this;
  }

  /**
   * Assert that element is not checked
   * @param {string} selector - CSS selector of the checkbox
   */
  assertIsNotChecked(selector) {
    cy.get(selector).should('not.be.checked');
    return this;
  }

  /**
   * Assert that URL contains specific text
   * @param {string} text - Text that should be in URL
   */
  assertUrlContains(text) {
    cy.url().should('include', text);
    return this;
  }

  /**
   * Assert that URL equals specific value
   * @param {string} url - Expected URL
   */
  assertUrlEquals(url) {
    cy.url().should('eq', url);
    return this;
  }

  /**
   * Assert element count equals expected value
   * @param {string} selector - CSS selector of the elements
   * @param {number} count - Expected number of elements
   */
  assertElementCount(selector, count) {
    cy.get(selector).should('have.length', count);
    return this;
  }

  /**
   * Get the count of elements matching selector
   * @param {string} selector - CSS selector of the elements
   * @returns {Cypress.Chainable<number>} Count of elements
   */
  getElementCount(selector) {
    return cy.get(selector).then(($elements) => $elements.length);
  }

  /**
   * Scroll to an element
   * @param {string} selector - CSS selector of the element
   */
  scrollToElement(selector) {
    cy.get(selector).scrollIntoView();
    return this;
  }

  /**
   * Scroll to top of page
   */
  scrollToTop() {
    cy.window().then((win) => {
      win.scrollTo(0, 0);
    });
    return this;
  }

  /**
   * Scroll to bottom of page
   */
  scrollToBottom() {
    cy.window().then((win) => {
      win.scrollTo(0, win.document.body.scrollHeight);
    });
    return this;
  }

  /**
   * Switch to iframe
   * @param {string} frameSelector - CSS selector of the iframe
   * @returns {object} This object for chaining
   */
  switchToFrame(frameSelector) {
    cy.get(frameSelector).then(($iframe) => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body);
    });
    return this;
  }

  /**
   * Execute JavaScript code
   * @param {string} script - JavaScript code to execute
   * @returns {Cypress.Chainable<any>} Result of script execution
   */
  executeScript(script) {
    return cy.window().then((win) => win.eval(script));
  }

  /**
   * Upload a file
   * @param {string} selector - CSS selector of the file input
   * @param {string} fileName - File name to upload
   * @param {string} mimeType - MIME type of the file
   */
  uploadFile(selector, fileName, mimeType = '') {
    cy.get(selector).selectFile(fileName);
    return this;
  }

  /**
   * Get CSS property value of an element
   * @param {string} selector - CSS selector of the element
   * @param {string} property - CSS property name
   * @returns {Cypress.Chainable<string>} CSS property value
   */
  getCSSProperty(selector, property) {
    return cy.get(selector).then(($element) => {
      return window.getComputedStyle($element[0]).getPropertyValue(property);
    });
  }

  /**
   * Press keyboard key
   * @param {string} key - Key to press (e.g., 'Enter', 'Escape', 'Tab')
   */
  pressKey(key) {
    cy.focused().type(`{${key}}`);
    return this;
  }

  /**
   * Focus on an element
   * @param {string} selector - CSS selector of the element
   */
  focus(selector) {
    cy.get(selector).focus();
    return this;
  }

  /**
   * Blur an element
   * @param {string} selector - CSS selector of the element
   */
  blur(selector) {
    cy.get(selector).blur();
    return this;
  }

  /**
   * Get window object
   * @returns {Cypress.Chainable<Window>} Window object
   */
  getWindow() {
    return cy.window();
  }

  /**
   * Get document object
   * @returns {Cypress.Chainable<Document>} Document object
   */
  getDocument() {
    return cy.document();
  }

  /**
   * Take a screenshot
   * @param {string} fileName - Screenshot file name
   */
  takeScreenshot(fileName) {
    cy.screenshot(fileName);
    return this;
  }

  /**
   * Log a message to Cypress log
   * @param {string} message - Message to log
   */
  log(message) {
    cy.log(message);
    return this;
  }
}

module.exports = BasePage;
