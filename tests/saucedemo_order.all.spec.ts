import { test, expect } from "@playwright/test";
import { loadSauceData } from "../utils/dataProvider";
import { SaucePOManager } from "../pages/SaucePOManager";

const datasets = loadSauceData();

datasets.forEach((d, idx) => {
  test(`SauceDemo E2E - ${d.name || "dataset"} - ${idx}`, async ({ page }) => {
    const po = new SaucePOManager(page);
    await po.getLoginPage().goTo();
    await po.getLoginPage().login(d.username, d.password);

    const productName =
      d.productName ?? (await po.getProductsPage().getFirstProductName());
    await po.getProductsPage().addToCartByName(productName);

    await po.getCartPage().openCart();
    const inCart = await po.getCartPage().isProductInCart(productName);
    expect(inCart).toBeTruthy();

    await po.getCartPage().clickCheckout();
    await po
      .getCheckoutPage()
      .fillCustomerDetails(d.firstName, d.lastName, d.postalCode);
    await po.getCheckoutPage().finishOrder();

    const confirmation = await po.getCheckoutPage().getConfirmationText();
    expect(confirmation.trim().toUpperCase()).toContain(
      "THANK YOU FOR YOUR ORDER",
    );
  });
});
