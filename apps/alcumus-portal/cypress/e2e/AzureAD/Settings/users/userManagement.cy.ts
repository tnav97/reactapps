import { Portal } from '../../../../fixtures/page-objects/portal';
import { describeWhenEnabled } from '../../../../support/e2e';
import { UserManagementPage } from '../../../../fixtures/page-objects/settings/users/UserManagementPage';
import { LeftHandPan } from '../../../../fixtures/page-objects/Components/leftHandPan';
import standardUser from '../../../../fixtures/users/Standard_User.json';
import clientAdmin from '../../../../fixtures/users/Client_Admin_User.json';

describeWhenEnabled(
  'Alcumus Portal - Users Management Tests',
  'FEATURE_TOGGLE_USE_AZURE_AD',
  () => {
    describe('When starting from Portal page ', () => {
      const portal = new Portal();
      const leftHandPane = new LeftHandPan();
      const userManagementPage = new UserManagementPage();

      it('C31599 Verify basic user cannot access User Management Page', () => {
        cy.loginWithAzureAd(standardUser.userEmail, standardUser.password);
        portal.clickSettingsLink();
        leftHandPane.getUserManagementlink().should('not.exist');
        portal.clickLogoutLink();
      });

      it('C31600 Verify admins can navigate successfully to User Management page', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
      });

      it('C31601 Verify User Management on load page elements state', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane
          .getUserManagementlink()
          .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
          .should('be.visible');
        leftHandPane.clickOnUserManagement();
        leftHandPane
          .getUserManagementlink()
          .should('have.css', 'background-color', 'rgb(234, 240, 253)')
          .should('be.visible');
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.getUserCount().contains(/\d+ results/);
        userManagementPage.getUserCount().contains(/\d+ results/);
        userManagementPage.getAddUserButton().should('be.visible');
        userManagementPage.getInvitedUsersButton().should('be.visible');
        userManagementPage
          .getSearchUserInput()
          .should('be.disabled')
          .should('be.visible')
          .invoke('attr', 'placeholder')
          .should('eq', 'Search by name, email...');

        userManagementPage
          .getPermissionList()
          .should('be.visible')
          .should('contain', 'All')
          .invoke('attr', 'aria-disabled')
          .should('eq', 'true');
        userManagementPage
          .getStatusList()
          .should('be.visible')
          .should('contain', 'All');
      });
    });
  }
);
