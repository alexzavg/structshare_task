import { test } from "@playwright/test";
import { SignInPage } from "../../Services/SignInPage";
import { ProductPage } from "../../Services/ProductPage";
import { CheckoutPage } from "../../Services/CheckoutPage";
import { testData } from "../../data/testData";


test.describe('Etsy.com E2E Tests', () => {

  test('User sign in with valid credentials', async ({page}) => {
    const signInPage = new SignInPage(page);
    await signInPage.signIn(testData.email, testData.password);
    await signInPage.verifySignIn();
  });

  test('User sign in with invalid password', async ({page}) => {
    const signInPage = new SignInPage(page);
    await signInPage.signIn(testData.email, testData.invalidPassword);
    await signInPage.verifyErrorMessage(testData.passwordErrMsg);
  });

  test('Guest user checkout process', async ({page}) => {
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);
    await productPage.searchProduct(testData.searchQuery);
    await productPage.addProductToCart(testData.productName);
    await checkoutPage.validateCart(testData.productName, testData.sumAmount);
    await checkoutPage.enterShippingAddress(
      testData.shippingEmail,
      testData.country,
      testData.name,
      testData.address,
      testData.city,
      testData.zip
    );
    await checkoutPage.completeCheckout(
      testData.name,
      testData.cardNumber,
      testData.cardExpMonth,
      testData.cardExpYear,
      testData.cardSecurityCode
    );
  });

});