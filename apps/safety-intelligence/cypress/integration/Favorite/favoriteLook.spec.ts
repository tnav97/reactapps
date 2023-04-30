import { BasePage } from '../../fixtures/page-objects/basePage';
import { NavBar } from '../../fixtures/page-objects/navBar';

describe('Safety Intelligence - Favorite Looks context', () => {
  describe('navigate to favorite page', () => {
    const navBar = new NavBar();
    const basePage = new BasePage();
    const testLook = 'AutomationLibraryLook';

    beforeEach(() => {
      cy.fixture('test_user').then((testUser) => {
        cy.login(testUser.username, testUser.password);
        cy.intercept('POST', '/api/content/favorite').as('post');
        cy.intercept('DELETE', '/api/content/favorite/*').as('delete');
        navBar.clickReportsButton();
        basePage.clickLooksButton();

        basePage.getTableRowWithTitle(testLook).then((row) => {
          if (row.find('.fas.fa-heart').length > 0) {
            basePage.unmarkFavoriteRowByTitle(testLook);
            cy.wait('@delete').then(() => {
              basePage.markFavoriteRowByTitle(testLook);
              cy.wait('@post').its('response.statusCode').should('equal', 200);
            });
          } else {
            basePage.markFavoriteRowByTitle(testLook);
            cy.wait('@post').its('response.statusCode').should('equal', 200);
          }
        });

        navBar.clickFavoriteButton();
        basePage.clickLooksButton();
      });
    });

    afterEach(() => {
      navBar.clickReportsButton();
      basePage.clickLooksButton();
      basePage.clickTableView();
      basePage.unmarkFavoriteRowByTitle(testLook);
      cy.logout();
    });

    it('verify table view is loaded', () => {
      basePage.getBreadcrumb().should('contain', 'Favorites');
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
      basePage.getBreadcrumb().should('contain', 'Favorite');
      basePage.getLooksTable().contains('th', 'Name');
      basePage.getLooksTable().contains('th', 'Views');
      basePage.getLooksTable().contains('th', 'Owner');
      basePage.getLooksTable().contains('th', 'Folder');
      basePage.getLooksTable().contains('th', 'Favorite');
    });

    it('verify tile view is loaded', () => {
      basePage.getBreadcrumb().should('contain', 'Favorites');
      basePage.clickTileView();
      basePage.getResultsCount().should('have.text', '1 Results');
    });
  });
});
