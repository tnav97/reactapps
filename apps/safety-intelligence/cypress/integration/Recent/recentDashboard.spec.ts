import { BasePage } from '../../fixtures/page-objects/basePage';
import { NavBar } from '../../fixtures/page-objects/navBar';
import { RecentPage } from '../../fixtures/page-objects/recentPage';

describe('Safety Intelligence - Recent Dashboards context', () => {
  describe('navigate to recent page', () => {
    const recentPage = new RecentPage();
    const navBar = new NavBar();
    const basePage = new BasePage();
    beforeEach(() => {
      cy.fixture('test_user').then((testUser) => {
        cy.login(testUser.username, testUser.password);
      });
      cy.intercept('GET', '**/recent/dashboard').as('getData');
      navBar.clickRecentButton();
    });

    afterEach(() => {
      cy.logout();
    });
    it('navigate to recent using navbar', () => {
      recentPage.getBreadcrumb().should('contain', 'Recent');
    });

    it('verify table view is loaded', () => {
      basePage.getDashboardsTable().should('exist');
      basePage
        .getDashboardsTable()
        .find('tbody')
        .then((body) => {
          const count = body.find('tr').length;
          basePage.getResultsCount().should('have.text', count + ' Results');
        });
    });

    it('verify table view has required headers', () => {
      basePage.getDashboardsTable().contains('th', 'Name');
      basePage.getDashboardsTable().contains('th', 'Last Viewed');
      basePage.getDashboardsTable().contains('th', 'Owner');
      basePage.getDashboardsTable().contains('th', 'Folder');
      basePage.getDashboardsTable().contains('th', 'Favorite');
    });

    it('verify tile view is loaded', () => {
      basePage.clickTileView();
      cy.wait('@getData').then((xhr) => {
        if (xhr.response.body.length !== 0) {
          basePage.getDashboardsTile().should('exist');
          basePage.getAllTiles().then((tiles) => {
            const count = Cypress.$(tiles).length;
            basePage.getResultsCount().should('have.text', count + ' Results');
          });
        } else {
          basePage.getResultsCount().should('have.text', '0 Results');
        }
      });
    });
  });
});
