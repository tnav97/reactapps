import { Portal } from '../../../../fixtures/page-objects/portal';
import { describeWhenEnabled } from '../../../../support/e2e';
import { InviteUserPage } from '../../../../fixtures/page-objects/settings/users/InviteUserPage';
import { UserManagementPage } from '../../../../fixtures/page-objects/settings/users/UserManagementPage';
import { LeftHandPan } from '../../../../fixtures/page-objects/Components/leftHandPan';
import clientAdmin from '../../../../fixtures/users/Client_Admin_User.json';

describeWhenEnabled(
  'Alcumus Portal - Users Management Tests- Invite User',
  'FEATURE_TOGGLE_USE_AZURE_AD',
  () => {
    describe('When starting from Portal page ', () => {
      const portal = new Portal();
      const leftHandPane = new LeftHandPan();
      const userManagementPage = new UserManagementPage();
      const inviteUserPage = new InviteUserPage();

      it('C31756 Verify Invite User page element state', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.clickInviteUsersButton();
        inviteUserPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Invite new users');
        inviteUserPage
          .getUserInfo()
          .invoke('text')
          .should(
            'eq',
            'Users will receive an email invitation with instructions to sign up. To invite more than 5 users, use the bulk import feature.'
          );
        inviteUserPage
          .getEmailText()
          .should('be.visible')
          .invoke('text')
          .should('eq', '');
        inviteUserPage
          .getRole()
          .should('be.visible')
          .invoke('text')
          .should('contain', 'User');
        inviteUserPage
          .getApplicationAccess()
          .should('be.visible')
          .invoke('text')
          .should('contain', 'Select application');
        inviteUserPage.getCancelButton().should('be.enabled');
        inviteUserPage
          .getSendInviteButton()
          .should('not.be.enabled')
          .should('have.css', 'background-color', 'rgba(0, 108, 181, 0.3)');
        inviteUserPage.getAddAnotherUserIcon().should('be.visible');
        inviteUserPage.getAddAnotherUser().should('be.visible');
      });

      it('C31757 Verify close button works', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.clickInviteUsersButton();
        inviteUserPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Invite new users');
        inviteUserPage.clickCloseButton();
        inviteUserPage.getPageHeading().should('not.exist');
      });

      it('C31758 Verify cancel button works', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.clickInviteUsersButton();
        inviteUserPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Invite new users');
        inviteUserPage.clickCancelButton();
        inviteUserPage.getPageHeading().should('not.exist');
      });

      it('C31759 Verify Send invite button remain disabled when invalid email entered', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.clickInviteUsersButton();
        inviteUserPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Invite new users');
        inviteUserPage.getEmailText().clear().type(' ');
        inviteUserPage.getSendInviteButton().should('not.be.enabled');
        inviteUserPage.getEmailText().clear().type('a');
        inviteUserPage.getSendInviteButton().should('not.be.enabled');
        inviteUserPage
          .getEmailErrorMessage()
          .invoke('text')
          .should('eq', 'Not valid email.');
        inviteUserPage.getEmailText().clear().type('@example.com');
        inviteUserPage.getSendInviteButton().should('not.be.enabled');
        inviteUserPage
          .getEmailErrorMessage()
          .invoke('text')
          .should('eq', 'Not valid email.');
        inviteUserPage.getEmailText().clear().type('@example.uk');
        inviteUserPage.getSendInviteButton().should('not.be.enabled');
        inviteUserPage
          .getEmailErrorMessage()
          .invoke('text')
          .should('eq', 'Not valid email.');
        inviteUserPage.getEmailText().clear().type('a@example.uk');
        inviteUserPage.getSendInviteButton().should('be.enabled');
        inviteUserPage.getEmailErrorMessage().should('not.exist');
      });

      it('C31760 Verify Role list box should contain values', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.clickInviteUsersButton();
        inviteUserPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Invite new users');
        inviteUserPage.getRole().click();
        inviteUserPage
          .getRoleList()
          .invoke('text')
          .should('contain', 'Client Admin');
      });

      it('C31761 Verify Add another user button add another record on page with delete icons', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.clickInviteUsersButton();
        inviteUserPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Invite new users');
        inviteUserPage.getDeleteButton().should('not.exist');
        inviteUserPage.clickAddAnotherUserButton();
        inviteUserPage.getDeleteButton().eq(0).should('exist');
        inviteUserPage.getDeleteButton().eq(1).should('exist');
      });

      it('C31762 Verify only five user are allowed to add', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.clickInviteUsersButton();
        inviteUserPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Invite new users');
        inviteUserPage.getDeleteButton().should('not.exist');
        for (let i = 0; i < 4; i++) {
          inviteUserPage.clickAddAnotherUserButton();
          inviteUserPage.getDeleteButton().eq(i).should('exist');
          inviteUserPage.getEmailText().eq(i).should('exist');
          inviteUserPage.getRole().eq(i).should('exist');
          inviteUserPage.getApplicationAccess().eq(i).should('exist');
        }
        inviteUserPage.getAddAnotherUser().should('not.exist');
      });

      it('C31763 Verify delete user button remove one record at a time', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.clickInviteUsersButton();
        inviteUserPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Invite new users');
        inviteUserPage.getDeleteButton().should('not.exist');
        for (let i = 0; i < 4; i++) {
          inviteUserPage.clickAddAnotherUserButton();
          inviteUserPage.getDeleteButton().eq(i).should('exist');
          inviteUserPage.getEmailText().eq(i).should('exist');
          inviteUserPage.getRole().eq(i).should('exist');
          inviteUserPage.getApplicationAccess().eq(i).should('exist');
        }
        inviteUserPage.getAddAnotherUser().should('not.exist');
        inviteUserPage.getDeleteButton().eq(0).click();
        inviteUserPage.getAddAnotherUser().should('exist');
      });

      it('C31764 Verify Discard changes popup is appearing', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.clickInviteUsersButton();
        inviteUserPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Invite new users');
        inviteUserPage.getEmailText().clear().type('a');
        inviteUserPage.clickCancelButton();
        inviteUserPage
          .getDiscardChangesHeader()
          .should('be.visible')
          .invoke('text')
          .should('eq', 'Discard changes?');
        inviteUserPage
          .getDiscardChangesMessage()
          .invoke('text')
          .should('eq', 'You have unsaved changes.');
        inviteUserPage
          .getDiscardChangesCancelButton()
          .should('be.visible')
          .should('not.be.disabled')
          .invoke('text')
          .should('eq', 'Cancel');
        inviteUserPage
          .getDiscardChangesDiscardButton()
          .should('be.visible')
          .should('not.be.disabled')
          .should('have.css', 'background-color', 'rgb(197, 0, 0)')
          .invoke('text')
          .should('eq', 'Discard');
      });

      it('C31765 Verify Discard changes popup Close button works', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.clickInviteUsersButton();
        inviteUserPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Invite new users');
        inviteUserPage.getEmailText().clear().type('a');
        inviteUserPage.clickCancelButton();
        inviteUserPage.getDiscardChangesHeader().should('be.visible');
        inviteUserPage.clickDiscardChangesCloseButton();
        inviteUserPage.getDiscardChangesHeader().should('not.exist');
      });

      it('C31766 Verify Discard changes popup Cancel button works', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.clickInviteUsersButton();
        inviteUserPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Invite new users');
        inviteUserPage.getEmailText().clear().type('a');
        inviteUserPage.clickCancelButton();
        inviteUserPage.getDiscardChangesHeader().should('be.visible');
        inviteUserPage.clickDiscardChangesCancelButton();
        inviteUserPage.getDiscardChangesHeader().should('not.exist');
      });

      it('C31767 Verify Discard changes popup Discard button works', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.clickInviteUsersButton();
        inviteUserPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Invite new users');
        inviteUserPage.getEmailText().clear().type('a');
        inviteUserPage.clickCancelButton();
        inviteUserPage.getDiscardChangesHeader().should('be.visible');
        inviteUserPage.clickDiscardChangesDiscardButton();
        inviteUserPage.getPageHeading().should('not.exist');
        inviteUserPage.getPageHeading().should('not.exist');
      });
    });
  }
);
