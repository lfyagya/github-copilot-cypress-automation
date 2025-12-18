# GitHub Copilot Cypress Automation

A comprehensive automation framework leveraging GitHub Copilot and Cypress for intelligent, AI-powered end-to-end testing.

## 📋 Table of Contents

- [Overview](#overview)
- [Three-Layer Architecture](#three-layer-architecture)
- [Documentation Links](#documentation-links)
- [Quick Start Guide](#quick-start-guide)
- [Features](#features)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

This repository demonstrates how to integrate GitHub Copilot with Cypress to create intelligent, maintainable test automation. The framework uses AI assistance to generate test cases, suggest best practices, and streamline test development workflows.

## Three-Layer Architecture

The framework follows a modern three-layer architecture pattern for clean separation of concerns:

### 1. **Presentation Layer (UI Interactions)**
   - Direct interaction with web elements using Cypress selectors
   - Page Object Model (POM) implementation for UI component management
   - Encapsulation of DOM element selectors and basic interactions
   - **Files**: `cypress/pages/*` - Contains page object classes for different application screens
   - **Responsibilities**: 
     - Element selection and localization
     - Low-level click, type, and visibility operations
     - Page state validation through element properties

### 2. **Business Logic Layer (Test Actions)**
   - Higher-level test operations that combine UI interactions
   - Reusable action methods that represent user workflows
   - Implementation of common test scenarios and user journeys
   - **Files**: `cypress/actions/*` - Contains action classes that orchestrate UI operations
   - **Responsibilities**:
     - Complex user workflows (e.g., login flow, form submission)
     - Data setup and teardown operations
     - Business domain-specific operations
     - Validation of business logic outcomes

### 3. **Test Specification Layer (Test Cases)**
   - Actual test specifications and assertions
   - Test scenarios written in Gherkin-like or traditional Cypress format
   - End-to-end test flows that utilize business actions
   - **Files**: `cypress/e2e/*` - Contains actual test files
   - **Responsibilities**:
     - Test scenario definition and orchestration
     - High-level business flow verification
     - Reporting and result tracking
     - Integration with CI/CD pipelines

### Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│         Test Specifications (E2E Tests)             │
│  - Test cases using business actions                │
│  - Scenario orchestration                           │
│  - Assertions and reporting                         │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│    Business Logic Layer (Actions)                   │
│  - User journey workflows                           │
│  - Complex interactions coordination                │
│  - Data validation and verification                 │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│   Presentation Layer (Page Objects)                 │
│  - Element selectors and locators                   │
│  - Low-level UI interactions                        │
│  - Element state management                         │
└─────────────────────────────────────────────────────┘
```

## Documentation Links

### Primary Documentation
- **[SESSION_FLOW](./SESSION_FLOW.md)** - Detailed session workflow and execution flow documentation
- **[PROMPTS](./PROMPTS.md)** - GitHub Copilot prompts and AI assistance strategies
- **[docs/](./docs)** - Complete documentation directory with detailed guides

### Additional Resources
- [Cypress Documentation](https://docs.cypress.io)
- [GitHub Copilot Guide](https://github.com/features/copilot)
- [Testing Best Practices](./docs/best-practices.md)

## Quick Start Guide

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **Git**
- **GitHub Copilot** (optional but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lfyagya/github-copilot-cypress-automation.git
   cd github-copilot-cypress-automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Cypress** (if not included in dependencies)
   ```bash
   npx cypress install
   ```

### Configuration

1. **Environment Setup**
   - Copy the example environment file (if exists)
   ```bash
   cp .env.example .env
   ```
   - Update `.env` with your configuration values:
   ```
   BASE_URL=https://your-app-url.com
   API_BASE_URL=https://api.your-app-url.com
   ```

2. **Cypress Configuration**
   - Review `cypress.config.js` for configuration options
   - Adjust timeouts, viewport, and other settings as needed

### Running Tests

#### Open Cypress in Interactive Mode
```bash
npm run cypress:open
```
This opens the Cypress Test Runner where you can:
- View available test files
- Run individual tests
- Debug tests in real-time
- Record test execution

#### Run All Tests Headless
```bash
npm run cypress:run
```

#### Run Specific Test File
```bash
npm run cypress:run -- --spec cypress/e2e/login.spec.js
```

#### Run Tests with Specific Browser
```bash
npm run cypress:run -- --browser chrome
npm run cypress:run -- --browser firefox
```

#### Run Tests in Headed Mode
```bash
npm run cypress:run -- --headed
```

### Project Structure

```
github-copilot-cypress-automation/
├── cypress/
│   ├── pages/                 # Page Object Models
│   │   ├── BasePage.js
│   │   ├── LoginPage.js
│   │   └── DashboardPage.js
│   ├── actions/               # Business Logic Layer
│   │   ├── AuthActions.js
│   │   └── UserActions.js
│   ├── e2e/                   # Test Specifications
│   │   ├── login.spec.js
│   │   └── user-workflow.spec.js
│   ├── fixtures/              # Test Data
│   │   └── users.json
│   ├── support/               # Support Files
│   │   ├── commands.js
│   │   └── e2e.js
│   └── plugins/               # Cypress Plugins
├── docs/                      # Documentation
│   ├── architecture.md
│   ├── best-practices.md
│   └── troubleshooting.md
├── cypress.config.js          # Cypress Configuration
├── package.json               # Project Dependencies
├── .env.example               # Environment Variables Template
├── SESSION_FLOW.md            # Session Flow Documentation
├── PROMPTS.md                 # Copilot Prompts
└── README.md                  # This File
```

### Writing Your First Test

1. **Create a Page Object** (`cypress/pages/MyPage.js`)
   ```javascript
   class MyPage {
     getLoginButton() {
       return cy.get('[data-testid="login-btn"]');
     }

     clickLogin() {
       this.getLoginButton().click();
     }
   }

   module.exports = new MyPage();
   ```

2. **Create an Action Class** (`cypress/actions/MyAction.js`)
   ```javascript
   const myPage = require('../pages/MyPage');

   class MyAction {
     performLogin() {
       myPage.clickLogin();
     }
   }

   module.exports = new MyAction();
   ```

3. **Write a Test** (`cypress/e2e/my-test.spec.js`)
   ```javascript
   const myAction = require('../actions/MyAction');

   describe('My Test Suite', () => {
     it('should perform login successfully', () => {
       myAction.performLogin();
       cy.url().should('include', '/dashboard');
     });
   });
   ```

### Using GitHub Copilot

GitHub Copilot can accelerate test development:

1. **In VS Code**: Start typing a test case and use `Ctrl+Enter` for suggestions
2. **Prompt Examples**:
   - "Write a Page Object for the login form"
   - "Create a test for user registration workflow"
   - "Generate fixtures for user test data"

See [PROMPTS.md](./PROMPTS.md) for more AI prompt strategies.

### Debugging Tests

#### Using Cypress Debugger
```bash
npm run cypress:run -- --headed --debug
```

#### Adding Breakpoints in Your Tests
```javascript
it('should perform an action', () => {
  cy.pause(); // Execution pauses here
  // Your test code
});
```

#### Viewing Command Log
- Open Cypress Test Runner
- All executed commands appear in the Command Log panel
- Click on any command to see the state at that point

## Features

- ✨ **AI-Powered Development** - GitHub Copilot integration for faster test creation
- 🏗️ **Three-Layer Architecture** - Clean separation of concerns
- 📄 **Page Object Model** - Maintainable and scalable test code
- 🔄 **Reusable Actions** - DRY principle implementation
- 📊 **Detailed Reporting** - Comprehensive test execution reports
- 🌐 **Cross-Browser Testing** - Support for Chrome, Firefox, Safari, and Edge
- ⚡ **Fast Execution** - Optimized for quick feedback
- 🛠️ **Easy Debugging** - Built-in Cypress debugging tools

## Common Commands

```bash
# Open Cypress Test Runner
npm run cypress:open

# Run all tests headless
npm run cypress:run

# Run tests with reporter
npm run cypress:run -- --reporter junit

# Generate coverage report
npm run cypress:coverage

# Lint test files
npm run lint

# Format code
npm run format
```

## Best Practices

1. **Use Page Objects** - Keep selectors centralized and maintainable
2. **Follow DRY Principle** - Create reusable action methods
3. **Meaningful Test Names** - Write descriptive test cases
4. **Proper Waits** - Use Cypress implicit waits effectively
5. **Test Isolation** - Ensure tests are independent
6. **Data Management** - Use fixtures for test data
7. **Error Handling** - Add proper error handling in actions

For more details, see [docs/best-practices.md](./docs/best-practices.md)

## Troubleshooting

Common issues and solutions:

| Issue | Solution |
|-------|----------|
| Tests timing out | Increase timeout in `cypress.config.js` |
| Element not found | Verify selector in browser DevTools |
| Tests failing intermittently | Check for race conditions, add waits |
| Screenshot/video not saving | Verify `screenshotOnRunFailure` in config |

See [docs/troubleshooting.md](./docs/troubleshooting.md) for more help.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Code Style

- Use ESLint for code consistency
- Follow the existing naming conventions
- Write descriptive comments for complex logic
- Ensure all tests pass before submitting a PR

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Contact & Support

- **Issues**: [GitHub Issues](https://github.com/lfyagya/github-copilot-cypress-automation/issues)
- **Discussions**: [GitHub Discussions](https://github.com/lfyagya/github-copilot-cypress-automation/discussions)
- **Author**: [lfyagya](https://github.com/lfyagya)

---

## Additional Resources

- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Page Object Model Pattern](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements)
- [GitHub Copilot Tips & Tricks](https://github.blog/2023-06-20-how-to-write-better-prompts-for-github-copilot/)
- [Test Automation Pyramid](https://martinfowler.com/bliki/TestPyramid.html)

---

**Last Updated**: 2025-12-18  
**Status**: Active Development
