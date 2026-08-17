import { test, expect } from "./fixtures";

test("SauceDemo end-to-end purchase flow", async ({ po, sauceData, page }) => {
  await po.getLoginPage().goTo();
  await po.getLoginPage().login(sauceData.username, sauceData.password);

  const productName = sauceData.productName ?? (await po.getProductsPage().getFirstProductName());
  await po.getProductsPage().addToCartByName(productName);

  await po.getCartPage().openCart();
  const inCart = await po.getCartPage().isProductInCart(productName);
  expect(inCart).toBeTruthy();

  await po.getCartPage().clickCheckout();
  await po
    .getCheckoutPage()
    .fillCustomerDetails(
      sauceData.firstName,
      sauceData.lastName,
      sauceData.postalCode,
    );
  await po.getCheckoutPage().finishOrder();

  const confirmation = await po.getCheckoutPage().getConfirmationText();
  expect(confirmation.trim().toUpperCase()).toContain(
    "THANK YOU FOR YOUR ORDER",
  );

  // Verify cart is emptied after purchase
  const badge = await page.locator(".shopping_cart_badge");
  expect(await badge.count()).toBe(0);
});
