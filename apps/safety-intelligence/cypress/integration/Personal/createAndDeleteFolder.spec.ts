import { BasePage } from '../../fixtures/page-objects/basePage';
import { NavBar } from '../../fixtures/page-objects/navBar';
import { PersonalFolderPage } from '../../fixtures/page-objects/personalFolderPage';
import { ModalWindow } from '../../fixtures/page-objects/modalWindow';

describe('Safety Intelligence - Personal Folders context', () => {
  describe('navigate to personal page', () => {
    const navBar = new NavBar();
    const personalPage = new PersonalFolderPage();
    const basePage = new BasePage();
    const modalWindow = new ModalWindow();
    let fullName;
    beforeEach(() => {
      cy.fixture('test_user').then((testUser) => {
        cy.login(testUser.username, testUser.password);
        fullName = testUser.firstName + ' ' + testUser.lastName;
      });
      navBar.clickPersonalFolderButton();
    });

    afterEach(() => {
      cy.logout();
    });

    it('create and delete a new folder', () => {
      // folder tree selector throws ResizeObserver error.
      // common concensus is to ignore error: https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
      cy.on('uncaught:exception', () => {
        return false;
      });
      const folderName = Math.random().toString(15).slice(2);
      personalPage.clickCreateFolder();
      modalWindow.getTitleSelector().type(folderName);
      modalWindow.clickFolderSelector();
      modalWindow.selectFolder(fullName);
      modalWindow.clickSubmitButton();
      cy.wait(3000); // wait for redirect to finish
      navBar.clickPersonalFolderButton();
      cy.xpath('//*[text()="' + folderName + '"]').should('be.visible');
      basePage.clickReportKebabMenu(folderName);
      cy.get('[data-testid="Delete"]').click();
      modalWindow.getDeleteButton().should('be.disabled');
      modalWindow.clickAcknowledgeCheckbox();
      modalWindow.clickDeleteButton();
      cy.xpath('//*[text()="' + folderName + '"]').should('not.exist');
    });
  });
});
