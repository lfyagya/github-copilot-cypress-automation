# Cypress Framework Architecture - Three-Layer POM Pattern

## Overview

This document outlines the architecture of the Cypress automation framework, emphasizing the **Three-Layer Page Object Model (POM)** pattern as the core design principle for maintaining scalable, maintainable, and robust test automation.

## Table of Contents

1. [Three-Layer Architecture](#three-layer-architecture)
2. [Project Structure](#project-structure)
3. [Key Components](#key-components)
4. [Best Practices](#best-practices)
5. [Implementation Guidelines](#implementation-guidelines)

## Three-Layer Architecture

### What is the Three-Layer POM?

This framework implements a **three-layer Page Object Model** architecture that separates concerns across:

1. **Presentation Layer (Page Objects)** - UI element interactions
2. **Business Logic Layer (Actions)** - Workflow orchestration
3. **Test Layer (E2E Tests)** - Test scenarios and assertions

### Benefits of Three-Layer POM

- **Maintainability**: Clear separation of concerns with single responsibility per layer
- **Reusability**: Business workflows centralized and reusable across tests
- **Readability**: Tests read like business requirements, not technical implementations
- **Scalability**: Easy to extend without affecting existing tests
- **Reduced Duplication**: Business logic lives in one place (Actions layer)

## Project Structure

```
cypress-automation/
├── cypress/
│   ├── e2e/                          # End-to-end test files (Layer 3)
│   │   ├── authentication/
│   │   │   └── login.spec.js
│   │   ├── shopping/
│   │   │   └── checkout.spec.js
│   │   └── account/
│   │       └── profileManagement.spec.js
│   ├── support/
│   │   ├── actions/                  # Business Logic Layer (Layer 2)
│   │   │   ├── AuthenticationActions.js
│   │   │   ├── ProductActions.js
│   │   │   └── CartActions.js
│   │   ├── pageObjects/              # Presentation Layer (Layer 1)
│   │   │   ├── LoginPage.js
│   │   │   ├── DashboardPage.js
│   │   │   └── ProductPage.js
│   │   ├── commands.js               # Custom Cypress commands
│   │   └── e2e.js                    # Global test hooks
│   └── fixtures/                     # Test data
│       ├── users.json
│       └── products.json
├── cypress.config.js                 # Cypress configuration
├── package.json
└── README.md
```

## Key Components

### Layer 1: Presentation Layer (Page Objects)

Page objects encapsulate UI elements and their low-level interactions:

```javascript
// pageObjects/LoginPage.js
export class LoginPage {
  // Selectors
  usernameInput = 'input[name="username"]';
  passwordInput = 'input[name="password"]';
  loginButton = 'button[type="submit"]';
  errorMessage = ".error-message";

  // Low-level interaction methods
  enterUsername(username) {
    cy.get(this.usernameInput).type(username);
  }

  enterPassword(password) {
    cy.get(this.passwordInput).type(password);
  }

  clickLoginButton() {
    cy.get(this.loginButton).click();
  }

  getErrorMessage() {
    return cy.get(this.errorMessage);
  }
}
```

**Key Points:**

- Define selectors for UI elements
- Provide methods for direct element interactions
- No business logic or assertions
- Single responsibility: UI interaction only

### Layer 2: Business Logic Layer (Actions)

Actions orchestrate page objects to perform business workflows:

```javascript
// actions/AuthenticationActions.js
import { LoginPage } from "../pageObjects/LoginPage";

export class AuthenticationActions {
  constructor() {
    this.loginPage = new LoginPage();
  }

  // High-level business operation
  loginWithValidCredentials(username, password) {
    this.loginPage.enterUsername(username);
    this.loginPage.enterPassword(password);
    this.loginPage.clickLoginButton();
    cy.url().should("include", "/dashboard");
  }

  // Handle error scenarios
  attemptLoginWithInvalidCredentials(username, password) {
    this.loginPage.enterUsername(username);
    this.loginPage.enterPassword(password);
    this.loginPage.clickLoginButton();
    this.loginPage.getErrorMessage().should("be.visible");
  }
}
```

**Key Points:**

- Combine multiple page object methods
- Represent business operations (e.g., "login", "checkout")
- Handle navigation and waits
- Reusable across multiple tests

### Layer 3: Test Layer (E2E Tests)

Tests validate business requirements using action classes:

```javascript
// cypress/e2e/authentication/login.spec.js
import { AuthenticationActions } from "../../support/actions/AuthenticationActions";

describe("Authentication - Login Functionality", () => {
  let authActions;

  beforeEach(() => {
    authActions = new AuthenticationActions();
    cy.visit("/login");
  });

  it("should successfully log in with valid credentials", () => {
    // Arrange
    const testUser = {
      username: "validuser@example.com",
      password: "SecurePassword123",
    };

    // Act
    authActions.loginWithValidCredentials(testUser.username, testUser.password);

    // Assert
    cy.url().should("include", "/dashboard");
    cy.get(".welcome-message").should("contain", "Welcome");
  });

  it("should display error message with invalid credentials", () => {
    // Arrange
    const invalidUser = {
      username: "invaliduser@example.com",
      password: "WrongPassword",
    };

    // Act
    authActions.attemptLoginWithInvalidCredentials(
      invalidUser.username,
      invalidUser.password
    );

    // Assert
    cy.get(".error-message")
      .should("be.visible")
      .and("contain", "Invalid credentials");
  });
});
```

**Key Points:**

- Use action classes (no direct page object calls)
- Follow Arrange-Act-Assert pattern
- Read like business requirements
- Focus on assertions and outcomes

## Best Practices

### Layer 1: Page Objects

- ✅ Use descriptive selector names (e.g., `loginButton`, `emailInput`)
- ✅ Keep methods focused and single-purpose
- ✅ Return `cy` chains for method chaining
- ❌ Avoid assertions in page objects
- ❌ Don't mix multiple page concerns in one class

**Selector Strategy** (in order of preference):

1. `data-testid` attributes
2. ID attributes
3. Class names
4. CSS selectors
5. XPath (last resort)

```javascript
// Good
this.loginButton = '[data-testid="login-submit"]';

// Acceptable
this.loginButton = "#loginBtn";

// Avoid
this.loginButton = "body > div > form > button:nth-child(3)";
```

### Layer 2: Actions

- ✅ Name methods after business operations (e.g., `loginUser`, `addItemToCart`)
- ✅ Combine related page object methods logically
- ✅ Handle waits and navigation implicitly
- ✅ Provide semantic interfaces for tests
- ❌ Avoid making assertions (reserved for tests)
- ❌ Don't create overly granular action methods

```javascript
// Good: Business-focused method
loginWithValidCredentials(username, password) {
  this.loginPage.enterUsername(username);
  this.loginPage.enterPassword(password);
  this.loginPage.clickLoginButton();
  cy.url().should('include', '/dashboard');
}

// Avoid: Too granular (this belongs in page object)
clickLoginButton() {
  this.loginPage.clickLoginButton();
}
```

### Layer 3: Tests

- ✅ Use Arrange-Act-Assert (AAA) pattern
- ✅ Write one logical assertion per test
- ✅ Use meaningful test descriptions
- ✅ Group related tests using `describe` blocks
- ❌ Avoid direct page object calls in tests (use actions)
- ❌ Don't create tests with multiple independent scenarios

```javascript
// Good: Uses action class
authActions.loginWithValidCredentials(user.username, user.password);

// Avoid: Direct page object calls in tests
loginPage.enterUsername(user.username);
loginPage.enterPassword(user.password);
loginPage.clickLoginButton();
```

### General Principles

- **Separation of Concerns**: Each layer has a single responsibility
- **DRY Principle**: Centralize business workflows in actions
- **Readability**: Tests should read like business requirements

## Implementation Guidelines

### Creating a New Page Object (Layer 1)

1. **Create a new class with selectors**:
   ```javascript
   // pageObjects/NewPage.js
   export class NewPage {
     // Define selectors
     element1 = '[data-testid="element1"]';
     element2 = ".element2-class";

     // Low-level interaction methods
     clickElement1() {
       cy.get(this.element1).click();
     }

     typeInElement2(text) {
       cy.get(this.element2).type(text);
     }
   }
   ```

### Creating an Action Class (Layer 2)

1. **Import page objects and create business workflows**:

   ```javascript
   // actions/NewPageActions.js
   import { NewPage } from "../pageObjects/NewPage";

   export class NewPageActions {
     constructor() {
       this.newPage = new NewPage();
     }

     // Business operation combining multiple page interactions
     performCompleteWorkflow(data) {
       this.newPage.typeInElement2(data);
       this.newPage.clickElement1();
       // Handle navigation, waits, etc.
       cy.url().should("include", "/success");
     }
   }
   ```

### Writing Tests (Layer 3)

1. **Import action class and write test specs**:

   ```javascript
   // cypress/e2e/feature/test.spec.js
   import { NewPageActions } from "../../support/actions/NewPageActions";

   describe("Feature Suite", () => {
     let actions;

     beforeEach(() => {
       actions = new NewPageActions();
       cy.visit("/page");
     });

     it("should complete workflow successfully", () => {
       // Arrange
       const testData = { value: "test" };

       // Act
       actions.performCompleteWorkflow(testData);

       // Assert
       cy.get(".success-message").should("be.visible");
     });
   });
   ```

## Data Flow

```
┌─────────────────────────────────────────────────────────┐
│         Layer 3: Test Layer (E2E Tests)                 │
│  - Orchestrates test scenarios                          │
│  - Makes assertions on outcomes                         │
│  - Reads like business requirements                     │
└────────────────────┬────────────────────────────────────┘
                     │ Uses Actions
                     ▼
┌─────────────────────────────────────────────────────────┐
│    Layer 2: Business Logic Layer (Actions)              │
│  - Combines multiple page interactions                  │
│  - Implements business workflows                        │
│  - Provides semantic interfaces                         │
└────────────────────┬────────────────────────────────────┘
                     │ Uses Page Objects
                     ▼
┌─────────────────────────────────────────────────────────┐
│    Layer 1: Presentation Layer (Page Objects)           │
│  - Direct UI element interactions                       │
│  - Manages selectors and locators                       │
│  - Encapsulates Cypress commands                        │
└─────────────────────────────────────────────────────────┘
```

## Maintenance and Updates

### When Selectors Change

1. Update the selector in the **page object** class only
2. No changes needed in actions or tests
3. All tests automatically use the new selector

### When Business Logic Changes

1. Update the relevant **action** method
2. Tests remain unchanged if the interface is the same
3. Page objects remain unchanged

### Adding New Features

1. Create new **page object** for new UI elements
2. Create **action** methods to orchestrate workflows
3. Write **tests** using the action methods

## Conclusion

The Three-Layer Page Object Model pattern provides superior maintainability and scalability over traditional approaches. By maintaining clear separation between presentation (page objects), business logic (actions), and test specifications (tests), you create a robust framework that's easy to maintain and extend.

**Key Takeaway**: Tests should never directly call page objects. Always use action classes to maintain proper separation of concerns.

---

_Last Updated: 2025-12-19_
