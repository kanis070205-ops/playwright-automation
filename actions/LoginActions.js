const LoginPage = require('../pages/LoginPage');

class LoginActions {
  constructor(page) {
    this.loginPage = new LoginPage(page);
  }

  async login(username, password) {
    await this.loginPage.goto();
    await this.loginPage.login(username, password);
  }
}

module.exports = LoginActions;