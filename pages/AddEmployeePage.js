class AddEmployeePage {
  constructor(page) {
    this.page = page;

    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');

    // Employee ID is auto-generated
    this.employeeIdInput = page.locator('(//input[@class="oxd-input oxd-input--active"])[2]');
    this.saveButton = page.locator('button.oxd-button--secondary', { hasText: 'Save' });

    // Store the last added Employee ID internally
    this.lastAddedEmployeeId = null;
  }

  async addEmployee(firstName, lastName) {
    // Fill first and last name
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);

    // Capture the system-generated Employee ID BEFORE clicking Save
    const employeeId = await this.employeeIdInput.inputValue();
    if (!employeeId) throw new Error("Employee ID not found before Save");

    this.lastAddedEmployeeId = employeeId;

    // Click Save
    await this.saveButton.scrollIntoViewIfNeeded();
    await this.saveButton.click();

    // Wait for Personal Details page to load (SPA-safe)
    await this.page.locator('h6:has-text("Personal Details")').waitFor({
      state: 'visible',
      timeout: 20000
    });

    await this.page.waitForLoadState('networkidle');

    return employeeId;
  }

  getLastAddedEmployeeId() {
    return this.lastAddedEmployeeId;
  }
}

module.exports = AddEmployeePage;