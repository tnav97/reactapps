import { BasePage } from '../../fixtures/page-objects/basePage';
import { NavBar } from '../../fixtures/page-objects/navBar';
import { PersonalFolderPage } from '../../fixtures/page-objects/personalFolderPage';

describe('Safety Intelligence - Personal Dashboards context', () => {
  describe('navigate to personal page', () => {
    const navBar = new NavBar();
    const personalPage = new PersonalFolderPage();
    const basePage = new BasePage();
    beforeEach(() => {
      cy.fixture('test_user').then((testUser) => {
        cy.login(testUser.username, testUser.password);
      });
      navBar.clickPersonalFolderButton();
    });

    afterEach(() => {
      cy.logout();
    });

    it('navigate to Personal Folder using navbar', () => {
      cy.fixture('test_user').then((testUser) => {
        personalPage.getBreadcrumb().should('contain', testUser.firstName);
        personalPage.getBreadcrumb().should('contain', testUser.lastName);
      });
    });

    it('verify that personal table view is loaded', () => {
      personalPage.getFolderTable().should('be.visible');
      basePage.clickTileView();
      basePage.clickTableView();
      personalPage.getFolderTable().should('be.visible');
    });

    it('verify that report tile view is loaded', () => {
      basePage.clickTileView();
      basePage.getFolderTile().should('be.visible');
      basePage.getDashboardsTile().should('be.visible');
      basePage.getLooksTile().should('be.visible');
    });
  });
});
