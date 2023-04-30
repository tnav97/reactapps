import { BasePage } from '../../fixtures/page-objects/basePage';
import { NavBar } from '../../fixtures/page-objects/navBar';

describe('Safety Intelligence - Recent Looks context', () => {
  describe('navigate to recent page', () => {
    const navBar = new NavBar();
    const basePage = new BasePage();
    beforeEach(() => {
      cy.fixture('test_user').then((testUser) => {
        cy.login(testUser.username, testUser.password);
      });
      cy.intercept('GET', '**/recent/dashboard').as('getData');
      navBar.clickRecentButton();
      basePage.clickLooksButton();
    });

    afterEach(() => {
      cy.logout();
    });

    it('verify table view is loaded', () => {
      basePage.getLooksTable().should('exist');
      basePage
        .getLooksTable()
        .find('tbody')
        .then((body) => {
          basePage
            .getResultsCount()
            .should('have.text', body.find('tr').length + ' Results');
        });
    });

    it('verify table view has required headers', () => {
      basePage.getLooksTable().contains('th', 'Name');
      basePage.getLooksTable().contains('th', 'Last Viewed');
      basePage.getLooksTable().contains('th', 'Owner');
      basePage.getLooksTable().contains('th', 'Folder');
      basePage.getLooksTable().contains('th', 'Favorite');
    });

    it('verify tile view is loaded', () => {
      basePage.clickTileView();
      cy.wait('@getData').then((xhr) => {
        if (xhr.response.body.length !== 0) {
          basePage.getLooksTile().should('exist');
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
