import { test, expect } from "@playwright/test";
import { signupPage } from "../pageObject/signupPage";
import * as fs from "fs";

test.describe("DropDown Test", () => {
  let SignupPage: signupPage;
  let testData = JSON.parse(fs.readFileSync("./testData/data.json", "utf-8"));
  test.beforeEach(async ({ page }) => {
    SignupPage = new signupPage(page);
    await page.goto("sign_up");
  });

  test("Verify that user can select Sweden as Country", async () => {
    await SignupPage.acceptConsent();
    await SignupPage.signUp(
      testData.email,
      testData.password,
      testData.firstName,
      testData.lastName,
      testData.contactNumber
    );
    await SignupPage.addCountry(testData.companyName, testData.countryIndex);
  });

  test("Verify that user can search and select Sweden as country", async () => {
    await SignupPage.acceptConsent();
    await SignupPage.signUp(
      testData.email,
      testData.password,
      testData.firstName,
      testData.lastName,
      testData.contactNumber
    );
    await SignupPage.searchCountry(testData.countryName, testData.searchIndex);
  });
});
