# GitHub Copilot Cypress Automation - Prompts Library

## Overview
This document contains a comprehensive library of structured prompts designed to leverage GitHub Copilot for generating Cypress automation code. Each prompt follows a 7-component formula to ensure consistency, clarity, and optimal code generation results.

---

## 7-Component Prompt Formula

Each prompt includes the following components:

1. **Role/Context**: Define the role and context for Copilot
2. **Task Description**: Clear description of what needs to be created
3. **Technical Requirements**: Specific technical constraints and libraries
4. **Input/Output Specification**: Expected inputs and outputs
5. **Code Style & Standards**: Coding conventions and best practices
6. **Examples & References**: Related code or patterns to follow
7. **Expected Output Format**: Exact format for the generated code

---

## Prompt 1: BasePage Class

### Role/Context
You are an expert QA automation engineer specializing in Cypress page object model patterns.

### Task Description
Create a BasePage class that serves as the parent class for all page objects in the Cypress automation framework. This base class should provide common methods and utilities that all page objects will inherit.

### Technical Requirements
- Framework: Cypress with JavaScript/ES6
- Pattern: Page Object Model (POM)
- Inheritance: Parent class for all page objects
- Structure: Should include common element operations and wait strategies
- Dependencies: Cypress commands and utilities

### Input/Output Specification
- Input: BasePage class requirements for Cypress automation
- Output: A reusable BasePage class with common methods for element interaction
- Methods to include: visit(), getElement(), clickElement(), fillText(), verifyElementVisible(), verifyElementExist()

### Code Style & Standards
- Use ES6 class syntax
- Follow Cypress best practices
- Use meaningful method names with clear documentation
- Include JSDoc comments for all methods
- Use const for constants, let for variables
- Implement error handling with try-catch where appropriate

### Examples & References
- Follow POM pattern conventions
- Use Cypress selectors effectively
- Implement chainable methods where applicable
- Use explicit waits sparingly (Cypress handles waits automatically)

### Expected Output Format
```javascript
// BasePage.js format with class definition, constructor, and public/private methods
```

---

## Prompt 2: LoginPage Class

### Role/Context
You are a QA automation engineer implementing the Page Object Model pattern in Cypress, focusing on the login page object.

### Task Description
Create a LoginPage class that extends the BasePage class and encapsulates all locators and interactions specific to the login page of the application.

### Technical Requirements
- Framework: Cypress with JavaScript/ES6
- Pattern: Page Object Model extending BasePage
- Selectors: Use meaningful locator strategies (id, data-testid, class, xpath)
- Inheritance: Should extend BasePage class
- Page URL: Include the login page path

### Input/Output Specification
- Input: Login page UI elements and their locators
- Output: LoginPage class with element getters and interaction methods
- Elements: Username input, password input, login button, error message, remember me checkbox, forgot password link
- Methods: navigateToLoginPage(), getUsernameInput(), getPasswordInput(), getLoginButton(), getErrorMessage()

### Code Style & Standards
- Use ES6 class syntax extending BasePage
- Implement getters for page elements
- Use descriptive names for locators
- Include JSDoc comments
- Follow single responsibility principle
- Use const for selectors

### Examples & References
- Extend from BasePage class
- Use Cypress selectors like cy.get(), cy.contains()
- Implement proper encapsulation of selectors
- Follow DRY principle

### Expected Output Format
```javascript
// LoginPage.js extending BasePage with element locators and getter methods
```

---

## Prompt 3: LoginActions Class

### Role/Context
You are a QA automation engineer creating business logic layer for login operations in Cypress automation.

### Task Description
Create a LoginActions class that contains high-level login operations and workflows, abstracting away page interaction details. This class should use the LoginPage class to perform login scenarios.

### Technical Requirements
- Framework: Cypress with JavaScript/ES6
- Pattern: Action/Business Logic Layer
- Dependencies: Should use LoginPage class
- Operations: Login, logout, login with validation, password reset
- Error Handling: Include validation and error scenarios

### Input/Output Specification
- Input: Credentials and test scenarios
- Output: Reusable action methods for common login workflows
- Methods: login(username, password), logout(), loginAsAdmin(), loginAsUser(), verifyLoginSuccess(), verifyLoginFailure()
- Expected behaviors: Validation, error handling, state verification

### Code Style & Standards
- Use ES6 class syntax
- Implement clear, descriptive method names
- Include parameter validation
- Use JSDoc with examples
- Handle both success and failure scenarios
- Use explicit assertions in actions

### Examples & References
- Use LoginPage methods within action methods
- Implement chainable patterns
- Include logging/debugging capabilities
- Follow business logic best practices

### Expected Output Format
```javascript
// LoginActions.js with high-level login operation methods
```

---

## Prompt 4: Login Tests Suite

### Role/Context
You are a QA automation engineer writing comprehensive test cases for login functionality using Cypress.

### Task Description
Create a comprehensive test suite for login functionality that covers various scenarios including successful login, failed login, validation errors, and edge cases.

### Technical Requirements
- Framework: Cypress with Mocha and Chai
- Pattern: BDD-style test syntax using describe() and it()
- Assertions: Use Cypress assertions and Chai matchers
- Page Objects: Use LoginPage and LoginActions classes
- Test Data: Include inline test data and fixtures

### Input/Output Specification
- Input: Login scenarios and expected outcomes
- Output: Complete test suite with multiple test cases
- Test Cases: Valid credentials, invalid credentials, empty fields, SQL injection attempts, password validation
- Expected: All tests should be independent and properly organized

### Code Style & Standards
- Use describe() blocks for test grouping
- Use it() blocks for individual test cases
- Include beforeEach() and afterEach() hooks
- Use meaningful test names describing the scenario
- Include assertions at logical checkpoints
- Use const for test data

### Examples & References
- Follow Cypress testing best practices
- Use cy.visit() for navigation
- Implement proper cleanup
- Use data-driven testing where applicable

### Expected Output Format
```javascript
// login.spec.js with describe blocks, it blocks, and test cases
```

---

## Prompt 5: Custom Commands

### Role/Context
You are a Cypress automation engineer creating reusable custom commands to extend Cypress functionality for common operations.

### Task Description
Create custom Cypress commands that extend built-in functionality and provide shortcuts for frequently used operations in the automation framework.

### Technical Requirements
- Framework: Cypress custom commands API
- File Location: cypress/support/commands.js
- Scope: Global reusable commands
- Operations: Login, logout, set user state, database operations, UI interactions
- Syntax: Use Cypress.Commands.add()

### Input/Output Specification
- Input: Commonly repeated operations in tests
- Output: Custom command definitions
- Commands: cy.login(), cy.logout(), cy.selectDropdown(), cy.uploadFile(), cy.verifyAPI(), cy.setUserState()
- Parameters: Accept parameters where needed

### Code Style & Standards
- Use Cypress.Commands.add() syntax
- Include detailed comments explaining command usage
- Add JSDoc comments with example usage
- Use proper error handling
- Make commands chainable where applicable
- Avoid hardcoding values

### Examples & References
- Follow Cypress custom commands best practices
- Chain with cy.then() and cy.should()
- Include logging for debugging
- Document expected parameters

### Expected Output Format
```javascript
// commands.js with Cypress.Commands.add() definitions for custom commands
```

---

## Prompt 6: Fixtures

### Role/Context
You are a QA automation engineer managing test data and configuration in Cypress through fixtures.

### Task Description
Create fixture files that contain test data used across the test suite, including user credentials, test URLs, API endpoints, and test scenarios.

### Technical Requirements
- Framework: Cypress fixtures (JSON format)
- Location: cypress/fixtures/ directory
- Content: Test data, configuration, credentials, API data
- Format: JSON structure with organized data sections
- Accessibility: Load via cy.fixture() command

### Input/Output Specification
- Input: Test data requirements and configuration
- Output: Well-organized JSON fixture files
- Fixtures: users.json, testdata.json, api-responses.json, configuration.json
- Data structure: Organized by feature/scenario

### Code Style & Standards
- Use valid JSON syntax
- Organize data hierarchically
- Use meaningful key names
- Include comments where clarification needed (note: JSON comments should be avoided or use special format)
- Separate concerns (users, products, test scenarios)
- Use consistent naming conventions

### Examples & References
- Follow JSON best practices
- Organize by feature/domain
- Include various data scenarios (valid, invalid, edge cases)
- Structure for easy access in tests

### Expected Output Format
```json
// Fixture files with organized test data in JSON format
```

---

## Prompt 7: ProductsPage Class

### Role/Context
You are a QA automation engineer implementing the Page Object Model for a products page in a Cypress test framework.

### Task Description
Create a ProductsPage class that extends BasePage and encapsulates all elements, locators, and basic interactions specific to the products/catalog page of the application.

### Technical Requirements
- Framework: Cypress with JavaScript/ES6
- Pattern: Page Object Model extending BasePage
- Elements: Product list, product items, filters, sorting options, pagination, add to cart buttons
- Inheritance: Should extend BasePage class
- Features: Filtering, sorting, searching, pagination support

### Input/Output Specification
- Input: Products page UI structure and elements
- Output: ProductsPage class with element getters and navigation methods
- Elements: Product cards, filters sidebar, sort dropdown, search box, pagination controls
- Methods: navigateToProducts(), getProductByName(), getProductList(), applyFilter(), sortBy(), searchProducts()

### Code Style & Standards
- Use ES6 class syntax extending BasePage
- Implement getters for all page elements
- Use descriptive selector names
- Include JSDoc comments
- Follow encapsulation principles
- Use meaningful method names

### Examples & References
- Extend from BasePage class
- Use Cypress selectors effectively
- Implement utility methods for common operations
- Consider reusability and maintainability

### Expected Output Format
```javascript
// ProductsPage.js extending BasePage with product-specific elements and methods
```

---

## Prompt 8: ProductActions Class

### Role/Context
You are a QA automation engineer creating business logic for product operations in Cypress test automation.

### Task Description
Create a ProductActions class that encapsulates high-level product operations and workflows, including filtering, searching, sorting, and adding products to cart.

### Technical Requirements
- Framework: Cypress with JavaScript/ES6
- Pattern: Action/Business Logic Layer
- Dependencies: Uses ProductsPage class
- Operations: Filter products, search, sort, view product details, add to cart, compare products
- Assertions: Include validation of operations

### Input/Output Specification
- Input: Product operations and search criteria
- Output: High-level methods for product interactions
- Methods: filterByCategory(), filterByPrice(), searchProduct(), sortBy(), addProductToCart(), verifyProductsDisplayed()
- Return values: Product data or confirmation of actions

### Code Style & Standards
- Use ES6 class syntax
- Implement clear, business-focused method names
- Include parameter validation
- Use JSDoc with example usage
- Handle both success and edge cases
- Include relevant assertions

### Examples & References
- Use ProductsPage methods internally
- Implement chainable patterns
- Consider multiple filtering scenarios
- Follow DRY principle

### Expected Output Format
```javascript
// ProductActions.js with high-level product operation methods
```

---

## Prompt 9: Products Tests Suite

### Role/Context
You are a QA automation engineer creating comprehensive test cases for product catalog functionality.

### Task Description
Create a complete test suite covering product catalog features including browsing, filtering, searching, sorting, and product selection.

### Technical Requirements
- Framework: Cypress with Mocha and Chai
- Pattern: BDD-style using describe() and it()
- Assertions: Use Cypress assertions and Chai matchers
- Page Objects: Use ProductsPage and ProductActions classes
- Test Data: Use fixtures for test data

### Input/Output Specification
- Input: Product page scenarios and expected outcomes
- Output: Comprehensive test suite
- Test Cases: Browse products, filter by category, filter by price, search functionality, sorting options, pagination, add to cart
- Organization: Grouped by feature

### Code Style & Standards
- Use describe() blocks for feature grouping
- Use it() blocks for test cases
- Include beforeEach() and afterEach() hooks
- Use meaningful test descriptions
- Include multiple assertions where appropriate
- Use data-driven testing

### Examples & References
- Follow Cypress best practices
- Implement proper test isolation
- Use hooks for common setup/teardown
- Consider edge cases and negative scenarios

### Expected Output Format
```javascript
// products.spec.js with organized test suites for product functionality
```

---

## Usage Guide

### How to Use These Prompts

1. **Copy the entire prompt** including all 7 components
2. **Paste into GitHub Copilot** chat or inline editor
3. **Review the generated code** for completeness and accuracy
4. **Adjust as needed** based on your specific application requirements
5. **Test the generated code** before committing to the repository

### Integration Steps

1. Start with Prompt 1 (BasePage) as the foundation
2. Create Prompt 2 (LoginPage) extending BasePage
3. Create Prompt 3 (LoginActions) using LoginPage
4. Create Prompt 4 (Login Tests) using LoginActions
5. Create Prompts 6 (Fixtures) for test data
6. Create Prompts 5 (Custom Commands) for reusable operations
7. Create Prompt 7 (ProductsPage) extending BasePage
8. Create Prompt 8 (ProductActions) using ProductsPage
9. Create Prompt 9 (Products Tests) using ProductActions

### Best Practices

- **Review Generated Code**: Always review Copilot-generated code for quality and security
- **Iterate**: Don't hesitate to refine prompts if results aren't satisfactory
- **Maintain Consistency**: Ensure all generated code follows the same patterns
- **Document Changes**: Keep track of modifications made to generated code
- **Version Control**: Commit each component with clear commit messages
- **Test Coverage**: Ensure generated tests provide adequate coverage

### Tips for Better Results

1. **Be Specific**: The more detailed your prompt, the better the result
2. **Provide Context**: Include application-specific details in prompts
3. **Reference Standards**: Link to coding standards and guidelines
4. **Include Examples**: Provide code examples of the expected style
5. **Iterate**: If results aren't perfect, refine and try again
6. **Use All Components**: Don't skip the 7 components for better results

---

## Project Structure

Expected directory structure after using these prompts:

```
project-root/
├── cypress/
│   ├── e2e/
│   │   ├── login.spec.js
│   │   └── products.spec.js
│   ├── fixtures/
│   │   ├── users.json
│   │   ├── testdata.json
│   │   ├── api-responses.json
│   │   └── configuration.json
│   ├── support/
│   │   ├── commands.js
│   │   └── e2e.js
│   └── pageObjects/
│       ├── BasePage.js
│       ├── LoginPage.js
│       ├── ProductsPage.js
│       ├── actions/
│       │   ├── LoginActions.js
│       │   └── ProductActions.js
├── PROMPTS.md (this file)
└── package.json
```

---

## Notes

- **Document Created**: 2025-12-18 20:05:20 UTC
- **Repository**: lfyagya/github-copilot-cypress-automation
- **Framework**: Cypress with JavaScript/ES6
- **Pattern**: Page Object Model with Action Layer
- **Last Updated**: 2025-12-18 20:05:20 UTC

---

## Additional Resources

### Cypress Documentation
- [Cypress Official Documentation](https://docs.cypress.io)
- [Page Object Model Best Practices](https://docs.cypress.io/guides/core-concepts/best-practices)
- [Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)

### Testing Standards
- [ISTQB Testing Fundamentals](https://www.istqb.org/)
- [Agile Testing Practices](https://www.agiletestingfellowship.com/)

### Code Quality
- [ES6 JavaScript Best Practices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Cypress Code Examples](https://docs.cypress.io/examples/examples/recipes)

---

**End of Document**
