const AddEmployeePage = require('../pageObjects/AddEmployeePageObject');
const { expect } = require('@playwright/test');
class EmployeeActions {
  constructor(page) {
    this.page = page;
    this.addEmployeePage = new AddEmployeePage(page);
    this.lastAddedEmployeeId = null;
  }

  async navigateToPIM() {
    await this.page.getByRole('link', { name: 'PIM' }).click();
  }

  async addEmployee(firstName, lastName) {
    await this.page.getByRole('link', { name: 'Add Employee' }).click();

    await this.page.locator('h6:has-text("Add Employee")').waitFor({
      state: 'visible',
      timeout: 10000,
    });

    // Delegate to Page Object
    await this.addEmployeePage.firstNameInput.fill(firstName);
    await this.addEmployeePage.lastNameInput.fill(lastName);
    await this.addEmployeePage.saveButton.click();
    
    this.employeeId = this.page
  .locator('label:has-text("Employee Id")')
  .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]//input');
    const employeeId = await this.employeeId.inputValue();
    console.log('=================================');
    console.log('Employee Created Successfully');
    console.log('Captured Employee ID:', employeeId);
    console.log('=================================');

    this.lastAddedEmployeeId = employeeId;

    return employeeId;
  }


async validateEmployeeById(id) {

  if (!id) throw new Error('Employee ID is empty');
  await this.navigateToPIM();
  const employeeIdSearchInput = this.page
    .locator('label:has-text("Employee Id")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]//input');

  // Enter Employee ID
  await employeeIdSearchInput.fill(id);

  // Click Search
  await this.page.getByRole('button', { name: 'Search' }).click();

  // Wait for loader to disappear
  await this.page.locator('.oxd-form-loader').waitFor({
    state: 'hidden'
  });

  // Validate employee appears in table
  const row = this.page.locator('.oxd-table-row', {
    hasText: id
  });

  await expect(row).toBeVisible({ timeout: 20000 });

  console.log('Employee ID Found in Table:', id);
  return true;
}
}

module.exports = EmployeeActions;