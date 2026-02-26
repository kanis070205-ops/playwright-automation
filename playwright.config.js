
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'on',
    trace: 'on',
    baseURL: 'https://opensource-demo.orangehrmlive.com',
  viewport: { width: 1920, height: 1080 },
  },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  
});