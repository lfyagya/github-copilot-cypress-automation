import LoginPage from '../support/pages/LoginPage';

describe('Login E2E Tests', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    // Navigate to the login page before each test
    cy.visit('/login');
    loginPage.verifyLoginPageLoaded();
  });

  describe('Successful Login', () => {
    it('Should successfully login with valid credentials', () => {
      const validEmail = 'user@example.com';
      const validPassword = 'Password123!';

      loginPage.enterEmail(validEmail);
      loginPage.enterPassword(validPassword);
      loginPage.clickLoginButton();

      // Verify user is redirected to dashboard
      cy.url().should('include', '/dashboard');
      cy.contains('Welcome').should('be.visible');
    });

    it('Should successfully login and verify user profile', () => {
      const validEmail = 'testuser@example.com';
      const validPassword = 'SecurePass123!';

      loginPage
        .enterEmail(validEmail)
        .enterPassword(validPassword)
        .clickLoginButton();

      // Verify user profile information
      cy.get('[data-cy="user-profile"]').should('be.visible');
      cy.get('[data-cy="user-name"]').should('contain', 'Test User');
    });

    it('Should remember login credentials when "Remember Me" is checked', () => {
      const validEmail = 'user@example.com';
      const validPassword = 'Password123!';

      loginPage.checkRememberMe();
      loginPage.enterEmail(validEmail);
      loginPage.enterPassword(validPassword);
      loginPage.clickLoginButton();

      // Logout and verify credentials are remembered
      cy.get('[data-cy="logout-button"]').click();
      cy.visit('/login');
      loginPage.getEmailInput().should('have.value', validEmail);
    });
  });

  describe('Failed Login Attempts', () => {
    it('Should display error message with invalid email', () => {
      const invalidEmail = 'invalid-email-format';
      const validPassword = 'Password123!';

      loginPage.enterEmail(invalidEmail);
      loginPage.enterPassword(validPassword);
      loginPage.clickLoginButton();

      loginPage.verifyErrorMessageVisible();
      loginPage.verifyErrorMessageText('Please enter a valid email address');
    });

    it('Should display error message with invalid password', () => {
      const validEmail = 'user@example.com';
      const invalidPassword = 'WrongPassword';

      loginPage.enterEmail(validEmail);
      loginPage.enterPassword(invalidPassword);
      loginPage.clickLoginButton();

      loginPage.verifyErrorMessageVisible();
      loginPage.verifyErrorMessageText('Invalid email or password');
      cy.url().should('include', '/login');
    });

    it('Should display error message when email field is empty', () => {
      const validPassword = 'Password123!';

      loginPage.enterPassword(validPassword);
      loginPage.clickLoginButton();

      loginPage.verifyErrorMessageVisible();
      loginPage.verifyErrorMessageText('Email is required');
    });

    it('Should display error message when password field is empty', () => {
      const validEmail = 'user@example.com';

      loginPage.enterEmail(validEmail);
      loginPage.clickLoginButton();

      loginPage.verifyErrorMessageVisible();
      loginPage.verifyErrorMessageText('Password is required');
    });

    it('Should display error message when both fields are empty', () => {
      loginPage.clickLoginButton();

      loginPage.verifyErrorMessageVisible();
      // Multiple error messages should be displayed
      cy.get('[data-cy="error-message"]').should('have.length.greaterThan', 1);
    });

    it('Should lock account after multiple failed login attempts', () => {
      const validEmail = 'user@example.com';
      const wrongPassword = 'WrongPassword';

      // Attempt login 5 times with wrong password
      for (let i = 0; i < 5; i++) {
        loginPage.enterEmail(validEmail);
        loginPage.enterPassword(wrongPassword);
        loginPage.clickLoginButton();
        cy.wait(500);
      }

      loginPage.verifyErrorMessageText('Account locked due to multiple failed attempts');
    });
  });

  describe('Form Validation', () => {
    it('Should validate email format in real-time', () => {
      loginPage.enterEmail('invalid-email');
      loginPage.getEmailInput().blur();

      cy.get('[data-cy="email-error"]').should('be.visible');
      cy.get('[data-cy="email-error"]').should('contain', 'Invalid email format');
    });

    it('Should validate password requirements', () => {
      loginPage.enterPassword('123');
      loginPage.getPasswordInput().blur();

      cy.get('[data-cy="password-error"]').should('be.visible');
      cy.get('[data-cy="password-error"]').should('contain', 'Password must be at least 8 characters');
    });

    it('Should enable login button only when form is valid', () => {
      loginPage.getLoginButton().should('be.disabled');

      loginPage.enterEmail('user@example.com');
      loginPage.getLoginButton().should('be.disabled');

      loginPage.enterPassword('Password123!');
      loginPage.getLoginButton().should('not.be.disabled');
    });

    it('Should clear error messages when user starts typing', () => {
      loginPage.enterEmail('invalid');
      loginPage.enterPassword('short');
      loginPage.clickLoginButton();

      loginPage.verifyErrorMessageVisible();

      loginPage.enterEmail('user@example.com');
      cy.get('[data-cy="error-message"]').should('not.exist');
    });
  });

  describe('UI/UX Features', () => {
    it('Should toggle password visibility', () => {
      const password = 'Password123!';

      loginPage.enterPassword(password);
      loginPage.getPasswordInput().should('have.attr', 'type', 'password');

      loginPage.clickTogglePasswordVisibility();
      loginPage.getPasswordInput().should('have.attr', 'type', 'text');

      loginPage.clickTogglePasswordVisibility();
      loginPage.getPasswordInput().should('have.attr', 'type', 'password');
    });

    it('Should display "Forgot Password" link', () => {
      loginPage.getForgotPasswordLink().should('be.visible');
      loginPage.getForgotPasswordLink().should('have.attr', 'href', '/forgot-password');
    });

    it('Should display "Sign Up" link for new users', () => {
      loginPage.getSignUpLink().should('be.visible');
      loginPage.getSignUpLink().should('have.attr', 'href', '/signup');
    });

    it('Should maintain form state when navigating back', () => {
      const testEmail = 'user@example.com';

      loginPage.enterEmail(testEmail);
      cy.visit('/forgot-password');
      cy.go('back');

      loginPage.getEmailInput().should('have.value', testEmail);
    });
  });

  describe('Security Features', () => {
    it('Should not expose password in HTML', () => {
      const password = 'Password123!';

      loginPage.enterPassword(password);
      cy.get('[data-cy="password-input"]').should('have.attr', 'type', 'password');
      cy.get('body').should('not.contain', password);
    });

    it('Should have CSRF token for form submission', () => {
      cy.get('[name="csrf_token"]').should('exist');
    });

    it('Should implement rate limiting on login attempts', () => {
      const validEmail = 'user@example.com';
      const wrongPassword = 'WrongPassword';

      // Make rapid login attempts
      for (let i = 0; i < 10; i++) {
        loginPage.enterEmail(validEmail);
        loginPage.enterPassword(wrongPassword);
        loginPage.clickLoginButton();
      }

      // Verify rate limit error is displayed
      loginPage.verifyErrorMessageText('Too many login attempts. Please try again later.');
    });

    it('Should not allow SQL injection in email field', () => {
      const sqlInjection = "' OR '1'='1";

      loginPage.enterEmail(sqlInjection);
      loginPage.enterPassword('Password123!');
      loginPage.clickLoginButton();

      loginPage.verifyErrorMessageVisible();
      cy.url().should('include', '/login');
    });

    it('Should not allow XSS attacks in password field', () => {
      const xssPayload = '<script>alert("XSS")</script>';

      loginPage.enterEmail('user@example.com');
      loginPage.enterPassword(xssPayload);
      loginPage.clickLoginButton();

      loginPage.verifyErrorMessageVisible();
      // Verify script was not executed
      cy.window().then((win) => {
        expect(win.xssExecuted).to.be.undefined;
      });
    });
  });

  describe('Accessibility', () => {
    it('Should have proper labels for form inputs', () => {
      cy.get('label[for="email"]').should('be.visible');
      cy.get('label[for="password"]').should('be.visible');
    });

    it('Should be keyboard navigable', () => {
      cy.get('[data-cy="email-input"]').focus();
      cy.focused().should('have.attr', 'data-cy', 'email-input');

      cy.tab();
      cy.focused().should('have.attr', 'data-cy', 'password-input');

      cy.tab();
      cy.focused().should('have.attr', 'data-cy', 'login-button');
    });

    it('Should have proper ARIA attributes', () => {
      cy.get('[data-cy="error-message"]').should('have.attr', 'role', 'alert');
      cy.get('[data-cy="login-button"]').should('have.attr', 'aria-label');
    });

    it('Should support screen readers', () => {
      loginPage.enterEmail('user@example.com');
      cy.get('[data-cy="password-input"]').should('have.attr', 'aria-describedby');
    });
  });

  describe('Responsive Design', () => {
    it('Should display correctly on mobile devices', () => {
      cy.viewport('iphone-x');
      loginPage.verifyLoginPageLoaded();
      cy.get('[data-cy="email-input"]').should('be.visible');
      cy.get('[data-cy="password-input"]').should('be.visible');
      cy.get('[data-cy="login-button"]').should('be.visible');
    });

    it('Should display correctly on tablet devices', () => {
      cy.viewport('ipad-2');
      loginPage.verifyLoginPageLoaded();
      cy.get('[data-cy="email-input"]').should('be.visible');
      cy.get('[data-cy="password-input"]').should('be.visible');
    });

    it('Should display correctly on desktop', () => {
      cy.viewport('macbook-15');
      loginPage.verifyLoginPageLoaded();
      cy.get('[data-cy="email-input"]').should('be.visible');
      cy.get('[data-cy="password-input"]').should('be.visible');
    });
  });

  describe('Performance', () => {
    it('Should load login page within acceptable time', () => {
      cy.visit('/login', {
        onBeforeLoad: (win) => {
          win.performance.mark('page-load-start');
        },
        onLoad: (win) => {
          win.performance.mark('page-load-end');
          win.performance.measure('page-load', 'page-load-start', 'page-load-end');
          const measure = win.performance.getEntriesByName('page-load')[0];
          expect(measure.duration).to.be.lessThan(3000);
        },
      });
    });

    it('Should submit login form within acceptable time', () => {
      const validEmail = 'user@example.com';
      const validPassword = 'Password123!';

      loginPage.enterEmail(validEmail);
      loginPage.enterPassword(validPassword);

      cy.get('[data-cy="login-button"]').then(($btn) => {
        const startTime = Date.now();
        loginPage.clickLoginButton();

        cy.url().should('include', '/dashboard', { timeout: 5000 }).then(() => {
          const endTime = Date.now();
          const loadTime = endTime - startTime;
          expect(loadTime).to.be.lessThan(5000);
        });
      });
    });
  });
});
