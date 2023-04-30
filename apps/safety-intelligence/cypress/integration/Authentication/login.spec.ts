import { FoldersPage } from '../../fixtures/page-objects/foldersPage';

describe('Safety Intelligence - Login Workflow', () => {
  // declare user data as Credential
  type Credential = { username: string; password: string };
  let user: Credential;

  // load user data from fixture and create login actions
  describe('login actions', () => {
    const foldersPage = new FoldersPage();

    beforeEach(() => {
      cy.fixture('test_user').then((testUser) => {
        user = testUser;
      });
    });

    afterEach(() => {
      cy.logout();
    });

    it('Logs in through form submission successfully', () => {
      cy.login(user.username, user.password);
      foldersPage.getBreadcrumb();
      foldersPage.getBreadcrumb().should('contain', 'Folders');
    });
  });
});
