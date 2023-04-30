import { BasePage } from '../../fixtures/page-objects/basePage';
import { NavBar } from '../../fixtures/page-objects/navBar';

describe('Safety Intelligence - Favorite Dashboards context', () => {
  describe('favorite folder actions', () => {
    const basePage = new BasePage();
    const navBar = new NavBar();
    const testDashboard = 'AutomationLibraryDashboard';

    beforeEach(() => {
      cy.fixture('test_user').then((testUser) => {
        cy.login(testUser.username, testUser.password);
        cy.intercept('POST', '/api/content/favorite').as('post');
        cy.intercept('DELETE', '/api/content/favorite/*').as('delete');
        navBar.clickReportsButton();
        basePage.getTableRowWithTitle(testDashboard).then((row) => {
          if (row.find('.fas.fa-heart').length > 0) {
            basePage.unmarkFavoriteRowByTitle(testDashboard);
            cy.wait('@delete').then(() => {
              basePage.markFavoriteRowByTitle(testDashboard);
              cy.wait('@post').its('response.statusCode').should('equal', 200);
            });
          } else {
            basePage.markFavoriteRowByTitle(testDashboard);
            cy.wait('@post').its('response.statusCode').should('equal', 200);
          }
        });
      });
    });

    afterEach(() => {
      navBar.clickReportsButton();
      basePage.clickTableView();

      basePage.unmarkFavoriteRowByTitle(testDashboard);
      cy.logout();
    });

    it('navigate to favourites using navbar', () => {
      navBar.clickFavoriteButton();
      basePage.getBreadcrumb().should('contain', 'Favorites');
    });

    it('verify favorite table view is loaded', () => {
      navBar.clickFavoriteButton();
      basePage.getBreadcrumb();
      basePage.getDashboardsTable().should('be.visible');
    });

    it('verify favorite table has required headers', () => {
      navBar.clickFavoriteButton();
      basePage.getBreadcrumb();
      basePage.getDashboardsTable().contains('th', 'Name');
      basePage.getDashboardsTable().contains('th', 'Views');
      basePage.getDashboardsTable().contains('th', 'Owner');
      basePage.getDashboardsTable().contains('th', 'Folder');
      basePage.getDashboardsTable().contains('th', 'Favorite');
    });

    it('verify favourite tile view is loaded', () => {
      navBar.clickFavoriteButton();
      basePage.getBreadcrumb();
      basePage.clickTileView();
      basePage.getDashboardsTile().should('be.visible');
    });
  });
});
