import { Page, expect, test } from "@playwright/test";

export class PageActions {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  };

  public async openUrl(url: string) {
    await test.step(`Navigate to URL: '${url}'`, async () => {
      await this.page.goto(url);
    });
  };

  public async waitForElement(locator: string) {
    await test.step(`Wait until element: '${locator}' is visible`, async () => {
      await this.page.waitForSelector(locator);
    });
  };

  public async waitForElementInvisible(locator: string) {
    await test.step(`Wait until element: '${locator}' is invisible`, async () => {
      await expect(this.page.locator(locator)).not.toBeVisible();
    });
  };

  public async clickElement(locator: string) {
    await test.step(`Click element locator: '${locator}'`, async () => {
      await this.page.locator(locator).click();
    });
  };

  public async fillElement(locator: string, text: string) {
    await test.step(`Fill element locator: '${locator}' with text: '${text}'`, async () => {
      const selector = this.page.locator(locator);
      await selector.fill(text);
    });
  };

  public async selectDropdownOption(locator: string, option: string) {
    await test.step(`Select '${option}' from dropdown with locator '${locator}'`, async () => {
      await this.page.locator(locator).selectOption(option);
    });
  };

  public async isElementChecked(locator: string) {
    await test.step(`Check element with locator '${locator}'`, async () => {
      await expect(this.page.locator(locator)).toBeChecked();
    });
  };

};