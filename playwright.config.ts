/// <reference types="node" />
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined, // 5 works are default.
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html"], ["line"], ["allure-playwright"]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
    video: "on",
    screenshot: "on",
    headless: process.env.CI ? true : false,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chrome",
      use: {
        /* Base URL to use in actions like `await page.goto('')`. */
        // baseURL: 'http://localhost:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        browserName: "chromium",
        trace: "on",
        video: "on",
        headless: false,
        screenshot: "on",
        //viewport: { width: 1024, height: 1000 },//to set windows/screen size
        //...devices["Galaxy S24"],// run on device browsers
        ignoreHTTPSErrors: true, // this is to ignore if connection not secure
        //permissions: ["geolocation"],// this is for accepting geolocation on broweser popup.
      },
    },
    {
      name: "safari",
      use: {
        /* Base URL to use in actions like `await page.goto('')`. */
        // baseURL: 'http://localhost:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

        browserName: "webkit",
        trace: "on",
        video: "on",
        headless: true,
        screenshot: "on",
      },
    },
    {
      name: "firefox",
      use: {
        /* Base URL to use in actions like `await page.goto('')`. */
        // baseURL: 'http://localhost:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

        browserName: "firefox",
        trace: "on",
        video: "on",
        headless: true,
        screenshot: "on",
      },
    },
    {
      name: "device-samsung",
      use: {
        /* Base URL to use in actions like `await page.goto('')`. */
        // baseURL: 'http://localhost:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        browserName: "chromium",
        trace: "on",
        video: "on",
        headless: false,
        screenshot: "on",
        //viewport: { width: 1024, height: 1000 },//to set windows/screen size
        ...devices["Galaxy S24"], // run on device browsers
        ignoreHTTPSErrors: true, // this is to ignore if connection not secure
        //permissions: ["geolocation"],// this is for accepting geolocation on broweser popup.
      },
    },
    {
      name: "device-iphone",
      use: {
        /* Base URL to use in actions like `await page.goto('')`. */
        // baseURL: 'http://localhost:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        browserName: "webkit",
        trace: "on",
        video: "on",
        headless: false,
        screenshot: "on",
        //viewport: { width: 1024, height: 1000 },//to set windows/screen size
        ...devices["iPhone 17 Pro Max"], // run on device browsers
        ignoreHTTPSErrors: true, // this is to ignore if connection not secure
        //permissions: ["geolocation"],// this is for accepting geolocation on broweser popup.
      },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
