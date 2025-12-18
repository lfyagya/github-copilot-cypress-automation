// DashboardPage.js - Page Object Model for Dashboard page
// This file contains selectors and methods for interacting with the Dashboard page

class DashboardPage {
  // Selectors
  get dashboardTitle() {
    return cy.get('[data-testid="dashboard-title"]');
  }

  get mainContent() {
    return cy.get('[data-testid="main-content"]');
  }

  // Methods
  visitDashboard() {
    cy.visit('/dashboard');
  }

  verifyDashboardLoaded() {
    this.dashboardTitle.should('be.visible');
  }
}

export default new DashboardPage();
