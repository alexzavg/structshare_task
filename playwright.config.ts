import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  projects: [
    {
      name: 'e2e',
      testMatch: ['/tests/E2E/*.spec.ts']
    }
  ],
  timeout: 90000, // 1.5 minutes
  expect: { 
    timeout: 90000 
  },
  globalSetup: 'utils/globalSetup.ts',
  use: {
    actionTimeout: 90000,
    navigationTimeout: 90000,
    screenshot: 'only-on-failure',
    video: {
      mode: 'retain-on-failure',
      size: {
        width: 1920,
        height: 1080
      }
    },
    contextOptions: {
      recordVideo: {
        dir: './test-results/videos/',
        size: {
          width: 1920,
          height: 1080
        }
      },
      colorScheme: 'dark',
      serviceWorkers: 'allow'
    }
  }
};

export default config;