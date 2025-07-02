import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import type { PlaywrightTestConfig } from '@playwright/test';

// Read from default ".env" file.
dotenv.config();

// Define a base configuration for UI tests to avoid repetition
const uiBaseConfig: PlaywrightTestConfig = {
  testDir: './tests/ui',
  use: { baseURL: process.env.UI_BASE_URL },
};

export default defineConfig({
  // Look for test files in the "tests" directory, recursively.
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'API Tests',
      testDir: './tests/api',
      use: {
        baseURL: process.env.API_BASE_URL,
        // Sets the Authorization header for all API requests in this project
        extraHTTPHeaders: {
          'Authorization': `Bearer ${process.env.API_TOKEN}`,
        },
      },
    },
    // UI Tests - One project for each browser
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
