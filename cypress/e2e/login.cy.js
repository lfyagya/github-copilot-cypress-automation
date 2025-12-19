import LoginPage from "../pages/LoginPage";

describe("Login E2E Tests", () => {
  let loginPage;

  before(() => {
    loginPage = new LoginPage();
  });

  beforeEach(() => {
    loginPage.visit();
    loginPage.verifyLoginPageLoaded();
  });

  it("Should successfully login with valid credentials", () => {
    cy.fixture("users").then((users) => {
      loginPage.login(users.validUser.username, users.validUser.password);

      // Verify user is redirected to inventory page
      cy.url().should("include", "/inventory.html");
      cy.get(".inventory_item").should("have.length.greaterThan", 0);
      cy.get(".shopping_cart_link").should("be.visible");
    });
  });

  it("Should display error with invalid credentials", () => {
    cy.fixture("users").then((users) => {
      loginPage.login(users.invalidUser.username, users.invalidUser.password);

      loginPage.verifyErrorMessageDisplayed();
      loginPage
        .getErrorMessage()
        .should("contain", "Username and password do not match");
    });
  });

  it("Should display error when username is empty", () => {
    loginPage.enterPassword("some_password");
    loginPage.clickLoginButton();

    loginPage.verifyErrorMessageDisplayed();
    loginPage.getErrorMessage().should("contain", "Username is required");
  });

  it("Should display error when password is empty", () => {
    loginPage.enterUsername("standard_user");
    loginPage.clickLoginButton();

    loginPage.verifyErrorMessageDisplayed();
    loginPage.getErrorMessage().should("contain", "Password is required");
  });

  it("Should handle locked out user", () => {
    loginPage.enterUsername("locked_out_user");
    loginPage.enterPassword("secret_sauce");
    loginPage.clickLoginButton();

    loginPage.verifyErrorMessageDisplayed();
    loginPage
      .getErrorMessage()
      .should("contain", "Sorry, this user has been locked out");
  });

  it("Should allow clearing input fields", () => {
    loginPage.enterUsername("test_user");
    loginPage.enterPassword("test_password");

    loginPage.clearUsername();
    loginPage.clearPassword();

    cy.get("[data-test='username']").should("have.value", "");
    cy.get("[data-test='password']").should("have.value", "");
  });

  it("Should not expose password in HTML", () => {
    loginPage.enterPassword("secret_sauce");
    cy.get("[data-test='password']").should("have.attr", "type", "password");
  });

  it("Should have all login form elements visible", () => {
    cy.get(".login_logo").should("be.visible").and("contain", "Swag Labs");
    cy.get("[data-test='username']").should("be.visible");
    cy.get("[data-test='password']").should("be.visible");
    cy.get("[data-test='login-button']").should("be.visible");
  });
});
