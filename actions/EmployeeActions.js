const AddEmployeePage = require('../pages/AddEmployeePage');
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

  // ✅ Only ONE method to add employee
  async addEmployee(firstName, lastName) {
    // Open Add Employee page
    await this.page.getByRole('link', { name: 'Add Employee' }).click();

    await this.page.locator('h6:has-text("Add Employee")').waitFor({
      state: 'visible',
      timeout: 10000,
    });

    // Delegate to Page Object
    const employeeId = await this.addEmployeePage.addEmployee(
      firstName,
      lastName
    );

    console.log('=================================');
    console.log('Employee Created Successfully');
    console.log('Captured Employee ID:', employeeId);
    console.log('=================================');

    this.lastAddedEmployeeId = employeeId;

    return employeeId;
  }



async validateEmployeeById(id) {
  if (!id) throw new Error('Employee ID is empty');

  await this.page.goto(
    '../web/index.php/pim/viewEmployeeList'
  );

  await this.page.locator('h5:has-text("Employee Information")').waitFor();

  const tableBody = this.page.locator('.oxd-table-body');

  const row = tableBody.locator('.oxd-table-row', {
    has: this.page.locator('.oxd-table-cell', { hasText: id }),
  });

  await expect(row).toBeVisible({ timeout: 15000 });

  console.log('Employee ID Found in Desktop Table:', id);

  return true;
}
}



module.exports = EmployeeActions;