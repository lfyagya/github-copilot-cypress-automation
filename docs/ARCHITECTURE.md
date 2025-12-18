# Three-Layer POM Architecture Pattern

## Overview

This project implements a **three-layer Page Object Model (POM)** architecture that separates concerns and promotes maintainability, reusability, and scalability in end-to-end testing with Cypress. The architecture consists of three distinct layers: **Presentation Layer**, **Business Logic Layer**, and **Test Layer**.

## Architecture Layers

### 1. Presentation Layer (Page Objects)

The presentation layer contains all **page object classes** that encapsulate the UI elements and their interactions with specific pages or components of the application.

#### Responsibilities:
- Define selectors/locators for UI elements on a page
- Provide methods to interact with these elements (click, type, select, etc.)
- Handle element visibility and state checks
- Encapsulate the technical details of element interactions

#### Key Characteristics:
- **Low-level interactions**: Direct Cypress commands (`.click()`, `.type()`, etc.)
- **Single page responsibility**: Each page object represents one page or logical component
- **Selector management**: Centralized location for all UI element selectors
- **No business logic**: Pure UI interaction methods

#### Example Structure:
```
pageObjects/
├── LoginPage.js
├── DashboardPage.js
├── ProductPage.js
└── CheckoutPage.js
```

#### Example Page Object:
```javascript
// pageObjects/LoginPage.js
export class LoginPage {
  // Selectors
  usernameInput = 'input[name="username"]';
  passwordInput = 'input[name="password"]';
  loginButton = 'button[type="submit"]';
  errorMessage = '.error-message';

  // Methods
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

### 2. Business Logic Layer (Actions)

The business logic layer contains **action/service classes** that orchestrate multiple page object interactions to perform higher-level business operations.

#### Responsibilities:
- Combine multiple low-level page interactions into meaningful business workflows
- Implement test data setup and teardown operations
- Handle complex user journeys and scenarios
- Provide a clear, semantic interface for tests
- Manage test preconditions and state

#### Key Characteristics:
- **High-level workflows**: Combine multiple page object methods
- **Business-focused**: Methods represent actual user actions (e.g., "login", "addItemToCart")
- **No page-specific details**: Delegates to page objects, returns results
- **Reusable across tests**: Common operations available to multiple test suites
- **Supports test data management**: Setup, cleanup, and data fixtures

#### Example Structure:
```
actions/
├── AuthenticationActions.js
├── ProductActions.js
├── CartActions.js
└── CheckoutActions.js
```

#### Example Action Class:
```javascript
// actions/AuthenticationActions.js
import { LoginPage } from '../pageObjects/LoginPage';

export class AuthenticationActions {
  constructor() {
    this.loginPage = new LoginPage();
  }

  // High-level business operation
  loginWithValidCredentials(username, password) {
    this.loginPage.enterUsername(username);
    this.loginPage.enterPassword(password);
    this.loginPage.clickLoginButton();
    // Implicit or explicit wait for navigation
    cy.url().should('include', '/dashboard');
  }

  // Handle error scenario
  attemptLoginWithInvalidCredentials(username, password) {
    this.loginPage.enterUsername(username);
    this.loginPage.enterPassword(password);
    this.loginPage.clickLoginButton();
    this.loginPage.getErrorMessage().should('be.visible');
  }

  // Complex workflow
  loginAndNavigateToProducts(username, password) {
    this.loginWithValidCredentials(username, password);
    // Additional actions after login
  }
}
```

### 3. Test Layer (E2E Tests)

The test layer contains **end-to-end test specifications** that validate complete user journeys and business requirements.

#### Responsibilities:
- Define test scenarios and acceptance criteria
- Use action classes to perform workflows
- Make assertions on outcomes
- Organize tests into logical suites
- Maintain clear, readable test descriptions

#### Key Characteristics:
- **High-level, business-focused**: Tests read like test cases
- **No page object details**: No direct selectors or `.click()` commands
- **Assertion-driven**: Verify expected behaviors and outcomes
- **Organized by feature**: Grouped into meaningful test suites
- **Clear intent**: Anyone can understand what is being tested

#### Example Structure:
```
cypress/e2e/
├── authentication/
│   ├── login.spec.js
│   ├── logout.spec.js
│   └── passwordReset.spec.js
├── shopping/
│   ├── browseProducts.spec.js
│   └── checkout.spec.js
└── account/
    └── profileManagement.spec.js
```

#### Example Test File:
```javascript
// cypress/e2e/authentication/login.spec.js
import { AuthenticationActions } from '../../actions/AuthenticationActions';

describe('Authentication - Login Functionality', () => {
  let authActions;

  beforeEach(() => {
    authActions = new AuthenticationActions();
    cy.visit('/login');
  });

  it('should successfully log in with valid credentials', () => {
    // Arrange
    const testUser = {
      username: 'validuser@example.com',
      password: 'SecurePassword123'
    };

    // Act
    authActions.loginWithValidCredentials(testUser.username, testUser.password);

    // Assert
    cy.url().should('include', '/dashboard');
    cy.get('.welcome-message').should('contain', 'Welcome');
  });

  it('should display error message with invalid credentials', () => {
    // Arrange
    const invalidUser = {
      username: 'invaliduser@example.com',
      password: 'WrongPassword'
    };

    // Act
    authActions.attemptLoginWithInvalidCredentials(invalidUser.username, invalidUser.password);

    // Assert
    cy.get('.error-message').should('be.visible')
      .and('contain', 'Invalid credentials');
  });
});
```

## Architecture Benefits

### Maintainability
- **Selector changes**: Update only in page objects, not in tests
- **Clear separation of concerns**: Each layer has a single responsibility
- **Reduced duplication**: Business workflows are centralized in action classes

### Scalability
- **Easy to extend**: Add new page objects and actions without affecting tests
- **Component reuse**: Page objects and actions used across multiple tests
- **Consistent patterns**: Uniform structure makes the codebase predictable

### Readability
- **Self-documenting code**: Test files read like business requirements
- **Clear intent**: Readers understand what is being tested without diving into implementation
- **Lower learning curve**: New team members understand the structure quickly

### Testability
- **Isolated concerns**: Easy to test each layer independently
- **Flexible mocking**: Can mock page objects or actions for specific tests
- **Reduced test maintenance**: Changes to UI only require updates in page objects

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Test Layer (E2E Tests)                   │
│  - Orchestrates test scenarios using business terminology   │
│  - Makes assertions on outcomes                             │
│  - Reads like test documentation                            │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│            Business Logic Layer (Actions)                   │
│  - Combines multiple page interactions                      │
│  - Implements business workflows                            │
│  - Provides semantic interfaces                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│          Presentation Layer (Page Objects)                  │
│  - Direct UI element interactions                           │
│  - Manages selectors and locators                           │
│  - Encapsulates Cypress commands                            │
└─────────────────────────────────────────────────────────────┘
```

## Best Practices

### Page Objects
- ✅ Use descriptive selector names
- ✅ Return `cy` chains for method chaining
- ✅ Keep methods focused and single-purpose
- ❌ Avoid assertions in page objects
- ❌ Don't mix multiple page objects in one class

### Actions
- ✅ Name methods after business operations (e.g., `loginUser`, `addItemToCart`)
- ✅ Combine related page object methods logically
- ✅ Handle waits and navigation implicitly
- ❌ Avoid making assertions (reserved for tests)
- ❌ Don't create overly granular action methods

### Tests
- ✅ Use Arrange-Act-Assert (AAA) pattern
- ✅ Write one logical assertion per test
- ✅ Use meaningful test descriptions
- ✅ Group related tests using `describe` blocks
- ❌ Avoid direct page object calls in tests
- ❌ Don't create tests with multiple independent scenarios

## File Structure Example

```
github-copilot-cypress-automation/
├── cypress/
│   ├── e2e/
│   │   ├── authentication/
│   │   │   └── login.spec.js
│   │   ├── shopping/
│   │   │   └── checkout.spec.js
│   │   └── account/
│   │       └── profileManagement.spec.js
│   ├── support/
│   │   ├── pageObjects/
│   │   │   ├── LoginPage.js
│   │   │   ├── DashboardPage.js
│   │   │   └── ProductPage.js
│   │   ├── actions/
│   │   │   ├── AuthenticationActions.js
│   │   │   ├── ProductActions.js
│   │   │   └── CartActions.js
│   │   ├── commands.js
│   │   └── e2e.js
│   └── cypress.config.js
├── docs/
│   └── ARCHITECTURE.md (this file)
└── package.json
```

## Getting Started

1. **Create a page object** for a new page:
   ```javascript
   export class NewPage {
     // Selectors
     // Methods
   }
   ```

2. **Create an action class** that uses page objects:
   ```javascript
   import { NewPage } from '../pageObjects/NewPage';
   
   export class NewPageActions {
     // Business logic methods
   }
   ```

3. **Write tests** using action classes:
   ```javascript
   import { NewPageActions } from '../../actions/NewPageActions';
   
   describe('Feature Suite', () => {
     // Test specs
   });
   ```

## Conclusion

The three-layer POM architecture provides a robust foundation for maintainable, scalable, and readable test automation. By maintaining clear separation of concerns across the presentation, business logic, and test layers, this architecture supports long-term test suite growth and team collaboration.
