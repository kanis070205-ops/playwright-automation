class PIMPage {
  constructor(page) {
    this.page = page;
    // Locate by text and class together
    const addButton = page.locator('button.oxd-button--secondary', { hasText: 'Add' });

// Wait until it’s visible and enabled

    //this.addButton = page.locator('button:has-text("Save")');
    //this.addButton = page.locator('button:has-text("+ Add")');
    this.employeeTable = page.locator('div[role="rowgroup"]');
  }

 
async isPIMPageDisplayed() {
    const pimSpan = this.page.locator('span.oxd-main-menu-item--name', { hasText: 'PIM' });
    // Wait up to 5 seconds for it to be visible
    try {
        await pimSpan.waitFor({ state: 'visible', timeout: 5000 });
        return true;
    } catch (e) {
        return false;
    }
}
}
module.exports = PIMPage;