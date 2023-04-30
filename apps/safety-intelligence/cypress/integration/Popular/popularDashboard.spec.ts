import { BasePage } from '../../fixtures/page-objects/basePage';
import { NavBar } from '../../fixtures/page-objects/navBar';

describe('Safety Intelligence - Popular Dashboards context', () => {
  describe('navigate to popular page', () => {
    const navBar = new NavBar();
    const basePage = new BasePage();
    beforeEach(() => {
      cy.fixture('test_user').then((testUser) => {
        cy.login(testUser.username, testUser.password);
      });
      cy.intercept('GET', '**/popular/dashboard').as('getData');
      navBar.clickPopularButton();
    });

    afterEach(() => {
      cy.logout();
    });

    it('navigate to popular using navbar', () => {
      cy.wait('@getData').then(() => {
        basePage.getBreadcrumb().should('contain', 'Popular');
      });
    });

    it('verify table view is loaded', () => {
      cy.wait('@getData').then(() => {
        basePage.getBreadcrumb().should('contain', 'Popular');
      });
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
      cy.wait('@getData').then(() => {
        basePage.getBreadcrumb().should('contain', 'Popular');
      });
      basePage.getDashboardsTable().contains('th', 'Name').should('be.visible');
      basePage
        .getDashboardsTable()
        .contains('th', 'Popularity')
        .should('be.visible');
      basePage
        .getDashboardsTable()
        .contains('th', 'Views')
        .should('be.visible');
      basePage
        .getDashboardsTable()
        .contains('th', 'Owner')
        .should('be.visible');
      basePage
        .getDashboardsTable()
        .contains('th', 'Folder')
        .should('be.visible');
      basePage
        .getDashboardsTable()
        .contains('th', 'Favorite')
        .should('be.visible');
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
