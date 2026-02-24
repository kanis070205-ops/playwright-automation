const DashboardPage = require('../pages/DashboardPage');
const PIMPage = require('../pages/PIMPage');
const AddEmployeePage = require('../pages/AddEmployeePage');

class EmployeeActions {
  constructor(page) {
    this.dashboard = new DashboardPage(page);
    this.pim = new PIMPage(page);
    this.addEmployeePage = new AddEmployeePage(page);
    this.page = page;

    this.lastAddedEmployeeId = null;
  }

  async addNewEmployee(firstName, lastName) {
    // Open Add Employee tab
    const addEmployeeTab = this.page.locator('a.oxd-topbar-body-nav-tab-item', { hasText: 'Add Employee' });
    await addEmployeeTab.waitFor({ state: 'visible', timeout: 5000 });
    await addEmployeeTab.click();
    await this.page.waitForLoadState('networkidle');

    // Fill employee details and get the auto-generated Employee ID
    const empId = await this.addEmployeePage.addEmployee(firstName, lastName);

    this.lastAddedEmployeeId = empId;

    return empId;
  }

  getLastAddedEmployeeId() {
    return this.lastAddedEmployeeId || this.addEmployeePage.getLastAddedEmployeeId();
  }

  async validateEmployeeById(employeeId) {
    const idToCheck = employeeId || this.getLastAddedEmployeeId();
    if (!idToCheck) throw new Error('Cannot validate: Employee ID is empty');

    // Go to Employee List tab
    const employeeListTab = this.page.locator('a.oxd-topbar-body-nav-tab-item', { hasText: 'Employee List' });
    await employeeListTab.click();
    await this.page.waitForLoadState('networkidle');

    // Wait for table to appear
    const tableContainer = this.page.locator('div.orangehrm-employee-list');
    await tableContainer.waitFor({ state: 'visible', timeout: 15000 });

    // SPA-safe: find the row containing the Employee ID
    const row = tableContainer.locator(`div[role="row"]:has(div.data:has-text("${idToCheck}"))`);
    return (await row.count()) > 0;
 
  }

  async navigateToPIM() {
    const pimTab = this.page.locator('a.oxd-topbar-body-nav-tab-item', { hasText: 'PIM' });
    await pimTab.waitFor({ state: 'visible', timeout: 5000 });
    await pimTab.click();
    await this.page.waitForLoadState('networkidle');
}
}

module.exports = EmployeeActions;