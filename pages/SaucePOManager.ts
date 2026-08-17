import { Page } from "@playwright/test";
import { SauceLoginPage } from "./SauceLoginPage";
import { SauceProductsPage } from "./SauceProductsPage";
import { SauceCartPage } from "./SauceCartPage";
import { SauceCheckoutPage } from "./SauceCheckoutPage";

export class SaucePOManager {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getLoginPage(): SauceLoginPage {
    return new SauceLoginPage(this.page);
  }

  getProductsPage(): SauceProductsPage {
    return new SauceProductsPage(this.page);
  }

  getCartPage(): SauceCartPage {
    return new SauceCartPage(this.page);
  }

  getCheckoutPage(): SauceCheckoutPage {
    return new SauceCheckoutPage(this.page);
  }
}
