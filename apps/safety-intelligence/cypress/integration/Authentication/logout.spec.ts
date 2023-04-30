import { NavBar } from '../../fixtures/page-objects/navBar';

describe('Safety Intelligence - logout workflow', () => {
  describe('users can logout successfully', () => {
    beforeEach(() => {
      cy.fixture('test_user').then((testUser) => {
        cy.login(testUser.username, testUser.password);
      });
    });

    it('users are directed to portal login', () => {
      const navBar = new NavBar();
      cy.get('[data-testid="SkeletonLoading"]')
        .should('not.exist')
        .then(() => {
          navBar.clickUserMenu();
          navBar.clickLogout();
        });
      cy.url().should('include', '/login');
    });

    it('login url has callback parameters', () => {
      const navBar = new NavBar();
      cy.get('[data-testid="SkeletonLoading"]')
        .should('not.exist')
        .then(() => {
          navBar.clickUserMenu();
          navBar.clickLogout();
        });
      cy.url().should('include', '/login'); // wait for url to redirect
      cy.url().should('include', 'safetyIntelligence');
    });
  });
});
