class AddEmployeePage {
  constructor(page) {
    this.page = page;

    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');

    this.employeeIdInput = page.locator(
      '//label[text()="Employee Id"]/ancestor::div[contains(@class,"oxd-input-group")]//input'
    );

    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async addEmployee(firstName, lastName) {
    // Fill employee details
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);

    // Capture auto-generated Employee ID BEFORE Save
    const employeeId = await this.employeeIdInput.inputValue();
    if (!employeeId) throw new Error('Employee ID not generated');

    console.log('Captured Employee ID (Before Save):', employeeId);

    // Click Save
    await this.saveButton.click();

    // Wait for Personal Details page
    await this.page.locator('h6:has-text("Personal Details")').waitFor({
      state: 'visible',
      timeout: 20000,
    });

    return employeeId;
  }
}

module.exports = AddEmployeePage;

