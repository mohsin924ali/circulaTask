import { Page, Locator, expect } from "@playwright/test";

export class signupPage {
  private page: Page;
  private consentPopup: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private termsCheckbox: Locator;
  private tryForFreeButton: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private contactNumberInput: Locator;
  private nextStepButton: Locator;
  private companyNameInput: Locator;
  private countryNameInput: Locator;
  private countryList: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.consentPopup = page.getByTestId("uc-accept-all-button");
    this.emailInput = page.getByRole("textbox", { name: "Work email" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.termsCheckbox = page.locator(
      '//label//div[contains(text(), "I agree to the")]'
    );
    this.tryForFreeButton = page.getByRole("button", { name: "Try for free" });
    this.firstNameInput = page.getByRole("textbox", { name: "First name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last name" });
    this.contactNumberInput = page.locator('input[name="phoneNumber"]');
    this.nextStepButton = page.getByRole("button", { name: "Next step" });
    this.companyNameInput = page.locator('input[name="organizationName"]');
    this.countryNameInput = page.locator('//input[@id="downshift-:r4:-input"]');
    this.countryList = page.locator("//li[@role='option']").nth(1);
  }

  // Actions

  async acceptConsent() {
    await this.consentPopup.click();
  }

  async signUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    contactNumber: string
  ) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.termsCheckbox.click({ position: { x: 10, y: 10 } });
    await this.tryForFreeButton.click({ force: true });
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.contactNumberInput.fill(contactNumber);
    await this.nextStepButton.click();
  }

  async addCountry(companyName: string, index: number) {
    await this.companyNameInput.fill(companyName);
    await this.countryNameInput.click();
    await this.page
      .locator("//li[@role='option']")
      .nth(index)
      .click({ force: true });
    await expect(this.countryNameInput).toHaveValue("Sweden");
  }

  async searchCountry(countryName: string, searchIndex: number) {
    await this.countryNameInput.press("Control+A");
    await this.countryNameInput.press("Control+A");
    await this.countryNameInput.fill(countryName);
    await this.page
      .locator("//li[@role='option']")
      .nth(searchIndex)
      .click({ force: true });
    await expect(this.countryNameInput).toHaveValue("Sweden");
  }
}
