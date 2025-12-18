import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';

describe('Product Tests', () => {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.login('standard_user', 'secret_sauce');
    DashboardPage.verifyDashboardLoaded();
  });

  describe('Product Listing', () => {
    it('should display product list', () => {
      DashboardPage.verifyProductListVisible();
      DashboardPage.verifyProductCountGreaterThan(0);
    });

    it('should display product info', () => {
      DashboardPage.verifyFirstProductHasName();
      DashboardPage.verifyFirstProductHasPrice();
      DashboardPage.verifyFirstProductHasDescription();
    });

    it('should display product images', () => {
      DashboardPage.verifyFirstProductImageVisible();
    });
  });

  describe('Product Sorting', () => {
    it('should sort by price ascending', () => {
      DashboardPage.sortByPriceAscending();
      DashboardPage.verifySortedByPriceAscending();
    });

    it('should sort by price descending', () => {
      DashboardPage.sortByPriceDescending();
      DashboardPage.verifySortedByPriceDescending();
    });

    it('should sort by name alphabetically', () => {
      DashboardPage.sortByNameAscending();
      DashboardPage.verifySortedByNameAscending();
    });
  });

  describe('Add to Cart', () => {
    it('should add product to cart', () => {
      DashboardPage.addFirstProductToCart();
      DashboardPage.verifyCartNotificationVisible();
    });

    it('should update cart count', () => {
      const count = DashboardPage.getCartCount();
      DashboardPage.addFirstProductToCart();
      DashboardPage.verifyCartCountIncremented(count);
    });
  });

  describe('Product Details', () => {
    it('should navigate to product detail', () => {
      DashboardPage.clickFirstProduct();
      DashboardPage.verifyProductDetailPageLoaded();
    });

    it('should display complete info', () => {
      DashboardPage.clickFirstProduct();
      DashboardPage.verifyProductNameVisible();
      DashboardPage.verifyProductPriceVisible();
    });
  });

  describe('Product Filtering', () => {
    it('should filter by search term', () => {
      DashboardPage.searchForProduct('backpack');
      DashboardPage.verifyProductsContainSearchTerm('backpack');
    });
  });

  describe('Product Availability', () => {
    it('should disable out of stock products', () => {
      DashboardPage.verifyOutOfStockProductsDisabled();
    });

    it('should enable in stock products', () => {
      DashboardPage.verifyInStockProductsEnabled();
    });
  });

  describe('Error Handling', () => {
    it('should show error if load fails', () => {
      DashboardPage.interceptProductsWithError(500);
      DashboardPage.reloadPage();
      DashboardPage.verifyErrorMessageVisible();
    });
  });
});
