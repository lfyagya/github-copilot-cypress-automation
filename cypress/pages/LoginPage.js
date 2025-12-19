class LoginPage {
  // Selectors
  usernameInput = '[data-test="username"]';
  passwordInput = '[data-test="password"]';
  loginButton = '[data-test="login-button"]';
  errorContainer = '[data-test="error"]';
  loginLogo = ".login_logo";

  // Visit login page
  visit() {
    cy.visit("https://www.saucedemo.com/");
  }

  // Enter username
  enterUsername(username) {
    cy.get(this.usernameInput).clear().type(username);
  }

  // Enter password
  enterPassword(password) {
    cy.get(this.passwordInput).clear().type(password);
  }

  // Click login button
  clickLoginButton() {
    cy.get(this.loginButton).click();
  }

  // Perform login with credentials
  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLoginButton();
  }

  // Get error message
  getErrorMessage() {
    return cy.get(this.errorContainer).invoke("text");
  }

  // Verify error message is displayed
  verifyErrorMessageDisplayed() {
    cy.get(this.errorContainer).should("be.visible");
  }

  // Verify login page is loaded
  verifyLoginPageLoaded() {
    cy.get(this.loginLogo).should("be.visible");
    cy.get(this.usernameInput).should("be.visible");
    cy.get(this.passwordInput).should("be.visible");
    cy.get(this.loginButton).should("be.visible");
  }

  // Clear username field
  clearUsername() {
    cy.get(this.usernameInput).clear();
  }

  // Clear password field
  clearPassword() {
    cy.get(this.passwordInput).clear();
  }
}

export default LoginPage;
