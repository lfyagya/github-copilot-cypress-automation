import LoginPage from "../pages/LoginPage";
import InventoryPage from "../pages/InventoryPage";

describe("Product E2E Tests", () => {
  let loginPage;
  let inventoryPage;

  before(() => {
    loginPage = new LoginPage();
    inventoryPage = new InventoryPage();
  });

  beforeEach(() => {
    loginPage.visit();
    cy.fixture("users").then((users) => {
      loginPage.login(users.validUser.username, users.validUser.password);
    });
    inventoryPage.verifyInventoryPageLoaded();
  });

  it("Should display all products on inventory page", () => {
    inventoryPage.verifyProductCount(6);
    inventoryPage.verifyAllProductsHaveNames();
    inventoryPage.verifyAllProductsHavePrices();
  });

  it("Should add product to cart and update cart badge", () => {
    inventoryPage.verifyCartBadgeNotExists();

    inventoryPage.addFirstProductToCart();

    inventoryPage.verifyCartBadgeCount("1");
    inventoryPage.verifyButtonTextChanged("Remove");
  });

  it("Should navigate to product details page", () => {
    inventoryPage.clickFirstProductName();

    inventoryPage.verifyProductDetailPageLoaded();
  });

  it("Should sort products by price low to high", () => {
    inventoryPage.sortProducts("lohi");

    inventoryPage.verifyPricesSortedAscending();
  });

  it("Should sort products by name Z to A", () => {
    inventoryPage.sortProducts("za");

    inventoryPage.verifyNamesSortedDescending();
  });

  it("Should add multiple products to cart", () => {
    inventoryPage.addProductToCartByIndex(0);
    inventoryPage.addProductToCartByIndex(1);
    inventoryPage.addProductToCartByIndex(2);

    inventoryPage.verifyCartBadgeCount("3");
  });

  it("Should remove product from cart on inventory page", () => {
    inventoryPage.addFirstProductToCart();
    inventoryPage.verifyCartBadgeCount("1");

    inventoryPage.removeFirstProductFromCart();

    inventoryPage.verifyCartBadgeNotExists();
    inventoryPage.verifyButtonTextChanged("Add to cart");
  });

  it("Should navigate to cart page with added products", () => {
    inventoryPage.addProductToCartByIndex(0);
    inventoryPage.addProductToCartByIndex(1);

    inventoryPage.clickShoppingCart();

    inventoryPage.verifyCartPageLoaded(2);
  });
});
