import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import type { PlaywrightTestConfig } from '@playwright/test';

dotenv.config();

const uiBaseConfig: PlaywrightTestConfig = {
  testDir: './tests/ui',
  use: { baseURL: process.env.UI_BASE_URL },
};

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'API Tests',
      testDir: './tests/api',
      use: { baseURL: 'https://petstore.swagger.io' },
    },
    {
      name: 'UI-Chrome',
      ...uiBaseConfig,
      use: {
        ...uiBaseConfig.use,
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'UI-Firefox',
      ...uiBaseConfig,
      use: {
        ...uiBaseConfig.use,
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'UI-WebKit',
      ...uiBaseConfig,
      use: {
        ...uiBaseConfig.use,
        ...devices['Desktop Safari'],
      },
    },
  ],
});
