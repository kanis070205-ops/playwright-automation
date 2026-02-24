// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'on',
    trace: 'on',
  },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
});