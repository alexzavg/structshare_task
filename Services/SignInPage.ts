import { Page, test } from '@playwright/test';
import { PageActions } from '../Pages/PageActions';


export class SignInPage extends PageActions {

  page: Page;
  baseUrl: string;
  signInHeaderBtn: string;
  userEmail: string;
  userPassword: string;
  emailField: string;
  passwordField: string;
  signInBtn: string;
  userAvatarHeader: string;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.baseUrl = process.env.BASE_URL;
    this.signInHeaderBtn = '.signin-header-action';
    this.emailField = '#join_neu_email_field';
    this.passwordField = '#join_neu_password_field';
    this.signInBtn = 'button[name="submit_attempt"]';
    this.userAvatarHeader = '[data-selector="you-menu-tooltip"]';
  };

  public async signIn(email: string, password: string) {
    await test.step(`Sign In`, async () => {
      await this.openUrl(this.baseUrl);
      await this.clickElement(this.signInHeaderBtn);
      await this.fillElement(this.emailField, email);
      await this.fillElement(this.passwordField, password);
      await this.clickElement(this.signInBtn);
    });
  };

  public async verifySignIn() {
    await test.step(`Verify user is signed in`, async () => {
      await this.waitForElement(this.userAvatarHeader);
    });
  };

  public async verifyErrorMessage(errMsg: string) {
    await test.step(`Verify sign in error message`, async () => {
      await this.waitForElement(`#aria-join_neu_password_field-error:has-text("${errMsg}")`);
    });
  };
  
};