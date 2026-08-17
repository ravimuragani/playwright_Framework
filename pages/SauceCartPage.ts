import { Page, Locator } from "@playwright/test";

export class SauceCartPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly cartItems: Locator;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = this.page.locator("a.shopping_cart_link");
    this.cartItems = this.page.locator(".cart_item");
    this.checkoutBtn = this.page.locator("#checkout");
  }

  async openCart() {
    await this.cartLink.click();
    await this.page.waitForLoadState("networkidle");
  }

  async isProductInCart(name: string): Promise<boolean> {
    const count = await this.cartItems.count();
    for (let i = 0; i < count; i++) {
      const title =
        (await this.cartItems
          .nth(i)
          .locator(".inventory_item_name")
          .textContent()) ?? "";
      if (title.trim() === name) return true;
    }
    return false;
  }

  async clickCheckout() {
    await this.checkoutBtn.click();
    await this.page.waitForLoadState("networkidle");
  }
}
