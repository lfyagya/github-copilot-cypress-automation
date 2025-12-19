class InventoryPage {
  // Selectors
  inventoryContainer = ".inventory_container";
  inventoryItem = ".inventory_item";
  inventoryItemName = ".inventory_item_name";
  inventoryItemPrice = ".inventory_item_price";
  inventoryItemDesc = ".inventory_item_desc";
  inventoryItemImg = ".inventory_item_img";
  addToCartButton = 'button[id^="add-to-cart"]';
  removeButton = 'button[id^="remove"]';
  shoppingCartLink = ".shopping_cart_link";
  shoppingCartBadge = ".shopping_cart_badge";
  productSortContainer = ".product_sort_container";
  inventoryDetailsName = ".inventory_details_name";
  inventoryDetailsPrice = ".inventory_details_price";
  inventoryDetailsDesc = ".inventory_details_desc";
  cartItem = ".cart_item";
  checkoutButton = "#checkout";

  // Navigation methods
  visit() {
    cy.visit("/inventory.html");
  }

  // Verification methods
  verifyInventoryPageLoaded() {
    cy.get(this.inventoryContainer).should("be.visible");
    cy.get(this.inventoryItem).should("have.length.greaterThan", 0);
  }

  verifyProductCount(count) {
    cy.get(this.inventoryItem).should("have.length", count);
  }

  verifyAllProductsHaveNames() {
    cy.get(this.inventoryItemName).should("be.visible");
  }

  verifyAllProductsHavePrices() {
    cy.get(this.inventoryItemPrice).should("be.visible");
  }

  verifyCartBadgeCount(count) {
    cy.get(this.shoppingCartBadge).should("contain", count);
  }

  verifyCartBadgeNotExists() {
    cy.get(this.shoppingCartBadge).should("not.exist");
  }

  verifyProductDetailPageLoaded() {
    cy.url().should("include", "/inventory-item.html");
    cy.get(this.inventoryDetailsName).should("be.visible");
    cy.get(this.inventoryDetailsPrice).should("be.visible");
    cy.get(this.inventoryDetailsDesc).should("be.visible");
  }

  verifyCartPageLoaded(itemCount) {
    cy.url().should("include", "/cart.html");
    cy.get(this.cartItem).should("have.length", itemCount);
    cy.get(this.checkoutButton).should("be.visible");
  }

  // Interaction methods
  addFirstProductToCart() {
    cy.get(this.inventoryItem).first().find("button").click();
  }

  addProductToCartByIndex(index) {
    cy.get(this.inventoryItem).eq(index).find("button").click();
  }

  removeFirstProductFromCart() {
    cy.get(this.inventoryItem).first().find("button").click();
  }

  clickFirstProductName() {
    cy.get(this.inventoryItemName).first().click();
  }

  clickShoppingCart() {
    cy.get(this.shoppingCartLink).click();
  }

  sortProducts(option) {
    cy.get(this.productSortContainer).select(option);
  }

  // Getter methods
  getFirstProductButton() {
    return cy.get(this.inventoryItem).first().find("button");
  }

  getAllPrices() {
    return cy.get(this.inventoryItemPrice);
  }

  getAllProductNames() {
    return cy.get(this.inventoryItemName);
  }

  // Verification helper methods
  verifyPricesSortedAscending() {
    this.getAllPrices().then(($prices) => {
      const prices = [...$prices].map((el) =>
        parseFloat(el.innerText.replace("$", ""))
      );
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sortedPrices);
    });
  }

  verifyNamesSortedDescending() {
    this.getAllProductNames().then(($names) => {
      const names = [...$names].map((el) => el.innerText);
      const sortedNames = [...names].sort().reverse();
      expect(names).to.deep.equal(sortedNames);
    });
  }

  verifyButtonTextChanged(text) {
    this.getFirstProductButton().should("contain", text);
  }
}

export default InventoryPage;
