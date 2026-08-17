import { Page, Locator } from "@playwright/test";

export class SauceCheckoutPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueBtn: Locator;
  readonly finishBtn: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = this.page.locator("#first-name");
    this.lastName = this.page.locator("#last-name");
    this.postalCode = this.page.locator("#postal-code");
    this.continueBtn = this.page.locator("#continue");
    this.finishBtn = this.page.locator("#finish");
    this.completeHeader = this.page.locator(".complete-header");
  }

  async fillCustomerDetails(first: string, last: string, postal: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(postal);
    await this.continueBtn.click();
  }

  async finishOrder() {
    await this.finishBtn.click();
    await this.page.waitForLoadState("networkidle");
  }

  async getConfirmationText(): Promise<string> {
    return (await this.completeHeader.textContent()) ?? "";
  }
}
