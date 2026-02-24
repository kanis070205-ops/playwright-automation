class DashboardPage {
  constructor(page) {
    this.page = page;
    this.pimMenu = page.locator('a[href="/web/index.php/pim/viewPimModule"]');
  }

  async clickPIM() {
    await this.pimMenu.click();
  }
}

module.exports = DashboardPage;