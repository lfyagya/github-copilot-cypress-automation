# Navigation

- [README](README.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Session Flow](SESSION_FLOW.md)

---

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

Prompt : LoginPage Class
Role/Context
You are a QA automation engineer implementing the Page Object Model pattern in Cypress, focusing on the login page object.

Task Description
Create a LoginPage class that extends the BasePage class and encapsulates all locators and interactions specific to the login page of the application.

Technical Requirements
Framework: Cypress with JavaScript/ES6
Pattern: Page Object Model extending BasePage
Selectors: Use meaningful locator strategies (id, data-testid, class, xpath)
Inheritance: Should extend BasePage class
Page URL: Include the login page path
Input/Output Specification
Input: Login page UI elements and their locators
Output: LoginPage class with element getters and interaction methods
Elements: Username input, password input, login button, error message, remember me checkbox, forgot password link
Methods: navigateToLoginPage(), getUsernameInput(), getPasswordInput(), getLoginButton(), getErrorMessage()
Code Style & Standards
Use ES6 class syntax extending BasePage
Implement getters for page elements
Use descriptive names for locators
Include JSDoc comments
Follow single responsibility principle
Use const for selectors
Examples & References
Extend from BasePage class
Use Cypress selectors like cy.get(), cy.contains()
Implement proper encapsulation of selectors
Follow DRY principle
Expected Output Format
// LoginPage.js extending BasePage with element locators and getter methods

Prompt 3: LoginActions Class
Role/Context
You are a QA automation engineer creating business logic layer for login operations in Cypress automation.

Task Description
Create a LoginActions class that contains high-level login operations and workflows, abstracting away page interaction details. This class should use the LoginPage class to perform login scenarios.

Technical Requirements
Framework: Cypress with JavaScript/ES6
Pattern: Action/Business Logic Layer
Dependencies: Should use LoginPage class
Operations: Login, logout, login with validation, password reset
Error Handling: Include validation and error scenarios
Input/Output Specification
Input: Credentials and test scenarios
Output: Reusable action methods for common login workflows
Methods: login(username, password), logout(), loginAsAdmin(), loginAsUser(), verifyLoginSuccess(), verifyLoginFailure()
Expected behaviors: Validation, error handling, state verification
Code Style & Standards
Use ES6 class syntax
Implement clear, descriptive method names
Include parameter validation
Use JSDoc with examples
Handle both success and failure scenarios
Use explicit assertions in actions
Examples & References
Use LoginPage methods within action methods
Implement chainable patterns
Include logging/debugging capabilities
Follow business logic best practices
Expected Output Format
// LoginActions.js with high-level login operation methods

Prompt 4: Login Tests Suite
Role/Context
You are a QA automation engineer writing comprehensive test cases for login functionality using Cypress.

Task Description
Create a comprehensive test suite for login functionality that covers various scenarios including successful login, failed login, validation errors, and edge cases.

Technical Requirements
Framework: Cypress with Mocha and Chai
Pattern: BDD-style test syntax using describe() and it()
Assertions: Use Cypress assertions and Chai matchers
Page Objects: Use LoginPage and LoginActions classes
Test Data: Include inline test data and fixtures
Input/Output Specification
Input: Login scenarios and expected outcomes
Output: Complete test suite with multiple test cases
Test Cases: Valid credentials, invalid credentials, empty fields, SQL injection attempts, password validation
Expected: All tests should be independent and properly organized
Code Style & Standards
Use describe() blocks for test grouping
Use it() blocks for individual test cases
Include beforeEach() and afterEach() hooks
Use meaningful test names describing the scenario
Include assertions at logical checkpoints
Use const for test data
Examples & References
Follow Cypress testing best practices
Use cy.visit() for navigation
Implement proper cleanup
Use data-driven testing where applicable
Expected Output Format
// login.spec.js with describe blocks, it blocks, and test cases
