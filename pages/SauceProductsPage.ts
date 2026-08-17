import { Page, Locator } from "@playwright/test";

export class SauceProductsPage {
  readonly page: Page;
  readonly products: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = this.page.locator(".inventory_item");
  }

  async getFirstProductName(): Promise<string> {
    return (
      (await this.products
        .first()
        .locator(".inventory_item_name")
        .textContent()) ?? ""
    );
  }

  async addToCartByName(name: string) {
    const count = await this.products.count();
    for (let i = 0; i < count; i++) {
      const title =
        (await this.products
          .nth(i)
          .locator(".inventory_item_name")
          .textContent()) ?? "";
      if (title.trim() === name) {
        await this.products.nth(i).locator("button").click();
        return;
      }
    }
    throw new Error(`Product not found: ${name}`);
  }
}
