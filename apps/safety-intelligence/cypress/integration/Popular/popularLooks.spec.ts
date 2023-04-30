import { BasePage } from '../../fixtures/page-objects/basePage';
import { NavBar } from '../../fixtures/page-objects/navBar';

describe('Safety Intelligence - Popular Looks context', () => {
  describe('navigate to popular page', () => {
    const navBar = new NavBar();
    const basePage = new BasePage();
    beforeEach(() => {
      cy.fixture('test_user').then((testUser) => {
        cy.login(testUser.username, testUser.password);
      });
      cy.intercept('GET', '**/popular/look').as('getData');
      cy.intercept('GET', '/api/recent/dashboard').as('get');
      cy.intercept('POST', '/api/content/users').as('post');
      navBar.clickPopularButton();
      basePage.clickLooksButton();
    });

    afterEach(() => {
      cy.logout();
    });

    it('verify table view is loaded', () => {
      basePage.getBreadcrumb().should('contain', 'Popular');

      basePage.getLooksTable().should('exist');
      basePage
        .getLooksTable()
        .find('tbody')
        .then(($body) => {
          basePage
            .getResultsCount()
            .should('have.text', $body.find('tr').length + ' Results');
        });
    });

    it('verify table view has required headers', () => {
      basePage.getBreadcrumb().should('contain', 'Popular');
      basePage.getLooksTable().contains('th', 'Name').should('be.visible');
      basePage
        .getLooksTable()
        .contains('th', 'Popularity')
        .should('be.visible');
      basePage.getLooksTable().contains('th', 'Views').should('be.visible');
      basePage.getLooksTable().contains('th', 'Owner').should('be.visible');
      basePage.getLooksTable().contains('th', 'Folder').should('be.visible');
      basePage.getLooksTable().contains('th', 'Favorite').should('be.visible');
    });

    it('verify tile view is loaded', () => {
      basePage.clickTileView();
      cy.wait('@getData').then((xhr) => {
        if (xhr.response.body.length !== 0) {
          basePage.getLooksTile().should('exist');
          cy.get('.MuiCard-root').then((tiles) => {
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
