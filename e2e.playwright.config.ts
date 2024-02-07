import { PlaywrightTestConfig } from '@playwright/test';
import base from './playwright.config';

const config: PlaywrightTestConfig = {
  ...base,
  fullyParallel: true,
  timeout: 90000,
  workers: 1,
  retries: 0,
  reporter: [
    ['list'],
    ['playwright-html', { 
      testFolder: 'tests',
      title: 'Playwright HTML Report',
      embedAssets: true,
      embedAttachments: true,
      outputFolder: 'html-report',
      minifyAssets: true,
      startServer: false,
      consoleLog: true,
      consoleError: true
    }]
  ],
  use: {
    ...base.use,
    headless: false,
    viewport: null, //{ width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    launchOptions: {
      slowMo: 500,
      channel: 'chrome',
      args: [
        '--start-maximized',
        '--disable-extensions',
        '--incognito',
        '--test-type=browser',
        '--disable-dev-shm-usage'
      ]
    }
  },
};
export default config;