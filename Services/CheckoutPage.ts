import { Page, expect, test } from '@playwright/test';
import { PageActions } from '../Pages/PageActions';


export class CheckoutPage extends PageActions {

  page: Page;
  baseUrl: string;
  cartWithItem: string;
  oneItemInCartText: string;
  creditCardRadioBtn: string;
  orderSummary: string;
  proceedToCheckoutBtn: string;
  continueAsGuestBtn: string;
  emailField: string;
  confirmEmailField: string;
  countryDropdown: string;
  fullNameField: string;
  addressField: string;
  cityField: string;
  zipField: string;
  continueToPaymentBtn: string;
  continueAsGuestPopupBtn: string;
  creditCardPaymentRadioBtn: string;
  cardNameField: string;
  cardNumberField: string;
  cardExpMonthDropdown: string;
  cardExpYearDropdown: string;
  securityCodeField: string;
  reviewOrderBtn: string;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.baseUrl = process.env.BASE_URL;
    this.cartWithItem = '[aria-label="Cart with 1 item"]';
    this.oneItemInCartText = '.wt-text-heading:has-text("1 item in your cart")';
    this.creditCardRadioBtn = '[id*="credit_card"]';
    this.orderSummary = '[summary*="order summary"]';
    this.proceedToCheckoutBtn = '.proceed-to-checkout';
    this.continueAsGuestBtn = 'button:has-text("Continue as a guest")';
    this.emailField = '#shipping-form-email-input';
    this.confirmEmailField = '#shipping-form-email-confirmation';
    this.countryDropdown = '#shipping-address-form [name="country_id"]';
    this.fullNameField = '#shipping-address-form [name="name"]';
    this.addressField = '#shipping-address-form [name="first_line"]';
    this.cityField = '#shipping-address-form [name="city"]';
    this.zipField = '#shipping-address-form [name="zip"]';
    this.continueToPaymentBtn = 'button:has-text("Continue to payment")';
    this.continueAsGuestPopupBtn = '#join-neu-form button[data-link-close]';
    this.creditCardPaymentRadioBtn = '[for="cc-radio--paymentstep"]';
    this.cardNameField = '#cc-name--paymentstep';
    this.cardNumberField = '#cc-num--paymentstep';
    this.cardExpMonthDropdown = '#cc-panel--paymentstep [name="card[exp_mon]"]';
    this.cardExpYearDropdown = '#cc-panel--paymentstep [name="card[exp_year]"]';
    this.securityCodeField = '#cc-ccv--paymentstep';
    this.reviewOrderBtn = '#cc-panel--paymentstep button:has-text("Review your order")';
  };

  public async validateCart(productName: string, sumAmount: string) {
    await test.step(`complete checkout`, async () => {
      await this.waitForElement(this.cartWithItem);
      await this.waitForElement(this.oneItemInCartText);
      await expect(this.page.locator('.cart-list-items .wt-list-unstyled', {hasText: `${productName}`})).toBeVisible();
      await this.isElementChecked(this.creditCardRadioBtn);
      await expect(this.page.locator(this.orderSummary)).toContainText(sumAmount);
      await this.clickElement(this.proceedToCheckoutBtn);
      await this.clickElement(this.continueAsGuestBtn);
    });
  };

  public async enterShippingAddress(
    email: string,
    country: string,
    name: string,
    address: string,
    city: string,
    zip: string
  ) {
    await test.step(`enter shipping address`, async () => {
      await this.selectDropdownOption(this.countryDropdown, country);
      await this.fillElement(this.emailField, email);
      await this.fillElement(this.confirmEmailField, email);
      await this.fillElement(this.fullNameField, name);
      await this.fillElement(this.addressField, address);
      await this.fillElement(this.cityField, city);
      await this.fillElement(this.zipField, zip);
      await this.page.locator(this.continueToPaymentBtn).first().click();
    });
  };

  public async completeCheckout(
    name: string,
    cardNumber: string,
    expMonth: string,
    expYear: string,
    securityCode: string
  ) {
    await test.step(`complete checkout`, async () => {
      await this.clickElement(this.continueAsGuestPopupBtn);
      await this.waitForElementInvisible(this.continueAsGuestPopupBtn);
      await this.clickElement(this.creditCardPaymentRadioBtn);
      await this.fillElement(this.cardNameField, name);
      await this.fillElement(this.cardNumberField, cardNumber);
      await this.selectDropdownOption(this.cardExpMonthDropdown, expMonth);
      await this.selectDropdownOption(this.cardExpYearDropdown, expYear);
      await this.fillElement(this.securityCodeField, securityCode);
      await this.waitForElement(this.reviewOrderBtn);
      //! after this user completes purchase, skipping because it's a real payment ;)
    });
  };
  
};