const { test, expect } = require('@playwright/test');
const LoginActions = require('../actions/LoginActions');
const EmployeeActions = require('../actions/EmployeeActions');

test('Add Employee and Validate in Table', async ({ page }) => {
  const login = new LoginActions(page);
  const employeeActions = new EmployeeActions(page);

  // Navigate and screenshot login page
  await login.loginPage.goto();
  await page.screenshot({ path: 'login-page.png' });

  // Login
  await login.login('Admin', 'admin123');

  // Navigate to PIM and validate
  await employeeActions.navigateToPIM();
  expect(await employeeActions.isPIMPageDisplayed()).toBeTruthy();

  // Add new employee
  const empId = await employeeActions.addNewEmployee('John', 'Doe');

  // Validate employee in table
  const exists = await employeeActions.validateEmployeeById(empId);
  expect(exists).toBeTruthy();
});

