const LoginPage = require('../pageObjects/LoginPageObject');

class LoginActions {
  constructor(page) {
    this.loginPage = new LoginPage(page);
    this.page = page;
  }

  async login(username, password) {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await this.loginPage.usernameInput.fill(username);
    await this.loginPage.passwordInput.fill(password);
    await this.loginPage.loginButton.click();
  }

  async goto() {
  await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
}


  async isVisible() {
    return await this.loginPage.loginButton.isVisible();
  }
}

module.exports = LoginActions;