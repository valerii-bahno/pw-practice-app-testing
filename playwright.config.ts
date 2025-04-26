import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig<TestOptions>({
  timeout: 40000,
  // globalTimeout: 60000,
  expect: {
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never' }]],

  use: {
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4201/'
          : process.env.STAGING == '1' ? 'http://localhost:4202/'
          : 'http://localhost:4200/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    headless: true,
    video: {
      mode: 'off',
      size: { width: 1920, height: 1080 }
    },
    actionTimeout: 60000,
    navigationTimeout: 60000
  },

  projects: [
    {
      name: 'chromium',
      use: {
        headless: false
      }
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox'
      },
    },

    {
      name: 'pageObjectFullScreen',
      testMatch: 'usePageObjects.spec.ts',
      use: {
        viewport: { width: 1920, height: 1080 }
      },
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: { 
        ...devices['iPhone 15 Pro Max'] 
      }
    }
  ],

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200/'
  }
});
