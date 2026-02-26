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


}

module.exports = AddEmployeePage;

