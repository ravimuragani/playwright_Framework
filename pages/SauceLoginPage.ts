import { Page, Locator } from "@playwright/test";

export class SauceLoginPage {
  readonly page: Page;
  readonly inputUserName: Locator;
  readonly inputPassword: Locator;
  readonly btnLogin: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputUserName = this.page.locator("#user-name");
    this.inputPassword = this.page.locator("#password");
    this.btnLogin = this.page.locator("#login-button");
  }

  async login(user: string, pass: string) {
    await this.inputUserName.fill(user);
    await this.inputPassword.fill(pass);
    await this.btnLogin.click();
    await this.page.waitForLoadState("networkidle");
  }

  async goTo() {
    await this.page.goto("https://www.saucedemo.com/");
  }
}
