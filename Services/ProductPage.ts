import { Page, test } from '@playwright/test';
import { PageActions } from '../Pages/PageActions';


export class ProductPage extends PageActions {

  page: Page;
  baseUrl: string;
  searchField: string;
  submitSearchBtn: string;
  addToCartBtn: string;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.baseUrl = process.env.BASE_URL;
    this.searchField = '#global-enhancements-search-query';
    this.submitSearchBtn = '[data-id="gnav-search-submit-button"]';
    this.addToCartBtn = '[data-shop-id="48579572"] [type="submit"]';
  };

  public async searchProduct(searchQuery: string) {
    await test.step(`search a product`, async () => {
      await this.openUrl(this.baseUrl);
      await this.fillElement(this.searchField, searchQuery);
      await this.clickElement(this.submitSearchBtn);
    });
  };

  public async addProductToCart(productName: string) {
    await test.step(`add product to cart`, async () => {
      await this.clickElement(this.addToCartBtn);
    });
  };
  
};