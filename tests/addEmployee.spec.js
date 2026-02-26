const { test, expect } = require('@playwright/test');
const LoginActions = require('../pageActions/LoginActions');
const EmployeeActions = require('../pageActions/EmployeeActions');

test('Add Employee and Validate in Table', async ({ page }) => {
  const login = new LoginActions(page);
  const employeeActions = new EmployeeActions(page);

  // Navigate and screenshot login page
  await login.goto();
  await page.locator('input[name="username"]').waitFor({ state: 'visible' });
  await page.screenshot({ path: 'login-page.png' });

  // Login
  await login.login('Admin', 'admin123');
  await page.locator('h6:has-text("Dashboard")').waitFor();

// OR wait for loader to disappear
await page.locator('.oxd-form-loader').waitFor({ state: 'hidden' }).catch(() => {});
  await page.screenshot({ path: 'home-page.png' });
  // Navigate to PIM and validate
  await employeeActions.navigateToPIM();

  const empId = await employeeActions.addEmployee('kani', 'Doe');

  // Validate employee in table
  const exists = await employeeActions.validateEmployeeById(empId);
  expect(exists).toBeTruthy();
});

