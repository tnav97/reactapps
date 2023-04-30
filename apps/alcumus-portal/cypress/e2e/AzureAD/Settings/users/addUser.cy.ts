import { Portal } from '../../../../fixtures/page-objects/portal';
import { describeWhenEnabled } from '../../../../support/e2e';
import { AddUserPage } from '../../../../fixtures/page-objects/settings/users/AddUserPage';
import { UserManagementPage } from '../../../../fixtures/page-objects/settings/users/UserManagementPage';
import { LeftHandPan } from '../../../../fixtures/page-objects/Components/leftHandPan';
import { Generators } from '../../../../fixtures/common/generators';
import clientAdmin from '../../../../fixtures/users/Client_Admin_User.json';

describeWhenEnabled(
  'Alcumus Portal - Users Management Tests- Add User',
  'FEATURE_TOGGLE_USE_AZURE_AD',
  () => {
    describe('When starting from Portal page ', () => {
      const portal = new Portal();
      const leftHandPane = new LeftHandPan();
      const userManagementPage = new UserManagementPage();
      const addUserPage = new AddUserPage();

      it('C31803 Verify Add User page element state', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.clickAddUserButton();
        addUserPage.getPageHeading().invoke('text').should('eq', 'Add User');
        addUserPage
          .getFirstName()
          .should('be.visible')
          .should('be.enabled')
          .invoke('text')
          .should('eq', '');
        addUserPage
          .getLastName()
          .should('be.visible')
          .should('be.enabled')
          .invoke('text')
          .should('eq', '');
        addUserPage
          .getEmail()
          .should('be.visible')
          .should('be.enabled')
          .invoke('text')
          .should('eq', '');
        addUserPage
          .getPhoneNumber()
          .should('be.visible')
          .should('be.enabled')
          .invoke('attr', 'placeholder')
          .should('eq', '+1 2223334444');
        addUserPage
          .getRole()
          .should('be.visible')
          .invoke('text')
          .should('contain', 'User');
        addUserPage.getApplicationAccess().should('be.visible');
        addUserPage.getCancelButton().should('be.enabled');
        addUserPage
          .getSaveAndAddNewButton()
          .should('not.be.enabled')
          .should('be.visible')
          .should('have.css', 'background-color', 'rgba(0, 108, 181, 0.3)');
        addUserPage
          .getSaveButton()
          .should('not.be.enabled')
          .should('be.visible')
          .should('have.css', 'background-color', 'rgba(0, 108, 181, 0.3)');
        addUserPage.getSendInviteCheckBox().should('be.checked');
        addUserPage
          .getSendInviteHint()
          .invoke('text')
          .should('eq', 'Send email invitation when saving');
        addUserPage
          .getAddUserProcessHint()
          .invoke('text')
          .should('contain', 'A user must login to activate their account.');
        addUserPage
          .getAddUserProcessHint()
          .invoke('text')
          .should(
            'contain',
            'Users who are sent an invitation will be marked as  invited.'
          );
        addUserPage
          .getAddUserProcessHint()
          .invoke('text')
          .should(
            'contain',
            'Users who are created, but not invited, will be marked as  Pending invite.'
          );
      });

      it('C31804 Verify close button works', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.clickAddUserButton();
        addUserPage.getPageHeading().invoke('text').should('eq', 'Add User');
        addUserPage.clickCloseButton();
        addUserPage.getPageHeading().should('not.exist');
      });

      it('C31805 Verify cancel button works', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.clickAddUserButton();
        addUserPage.getPageHeading().invoke('text').should('eq', 'Add User');
        addUserPage.clickCancelButton();
        addUserPage.getPageHeading().should('not.exist');
      });

      it('C31806 Verify Role list box should contain values', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.clickAddUserButton();
        addUserPage.getPageHeading().invoke('text').should('eq', 'Add User');
        addUserPage.getRole().click();
        addUserPage
          .getRoleList()
          .invoke('text')
          .should('contain', 'Client Admin');
      });

      it('C31807 verify Valid email create an individual account', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.clickAddUserButton();
        addUserPage.getPageHeading().invoke('text').should('eq', 'Add User');
        addUserPage.getEmail().clear().type(Generators.email());
        addUserPage
          .getEmailHint()
          .invoke('text')
          .should('eq', 'An individual account will be created', {
            timeout: 2000,
          });
      });

      it('C33696 verify email address validation works correctly', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.clickAddUserButton();
        addUserPage.getPageHeading().invoke('text').should('eq', 'Add User');
        // clear email field
        addUserPage.getEmail().clear();
        addUserPage.getSaveAndAddNewButton().should('not.be.enabled');
        addUserPage.getSaveButton().should('not.be.enabled');
        addUserPage
          .getEmailHint()
          .should('exist')
          .invoke('text')
          .should('eq', 'Use an organization email');
        // Enter blank space in Email field
        addUserPage.getEmail().clear().type(' ');
        addUserPage.getSaveAndAddNewButton().should('not.be.enabled');
        addUserPage.getSaveButton().should('not.be.enabled');
        addUserPage
          .getEmailHint()
          .should('exist')
          .invoke('text')
          .should('eq', 'Use an organization email');

        // Enter special char in Email field
        addUserPage.getEmail().clear().type('*');
        addUserPage.getSaveAndAddNewButton().should('not.be.enabled');
        addUserPage.getSaveButton().should('not.be.enabled');
        addUserPage
          .getEmailHint()
          .should('exist')
          .invoke('text')
          .should('eq', 'A valid email address is required.');
        // Enter invalid Email @gmail.com
        addUserPage.getEmail().clear().type('@gmail.com');
        addUserPage.getSaveAndAddNewButton().should('not.be.enabled');
        addUserPage.getSaveButton().should('not.be.enabled');
        addUserPage
          .getEmailHint()
          .should('exist')
          .invoke('text')
          .should('eq', 'A valid email address is required.');

        // Enter invalid Email .@gmail.com
        addUserPage.getEmail().clear().type('.@gmail.com');
        addUserPage.getSaveAndAddNewButton().should('not.be.enabled');
        addUserPage.getSaveButton().should('not.be.enabled');
        addUserPage
          .getEmailHint()
          .should('exist')
          .invoke('text')
          .should('eq', 'A valid email address is required.');
        // Enter invalid Email @gmail.c
        addUserPage.getEmail().clear().type('@gmail.c');
        addUserPage.getSaveAndAddNewButton().should('not.be.enabled');
        addUserPage.getSaveButton().should('not.be.enabled');
        addUserPage
          .getEmailHint()
          .should('exist')
          .invoke('text')
          .should('eq', 'A valid email address is required.');

        // Enter invalid Email akd@gmail.co.d
        addUserPage.getEmail().clear().type('akd@gmail.co.d');
        addUserPage.getSaveAndAddNewButton().should('not.be.enabled');
        addUserPage.getSaveButton().should('not.be.enabled');
        addUserPage
          .getEmailHint()
          .should('exist')
          .invoke('text')
          .should('eq', 'A valid email address is required.');

        // Enter invalid Email akd+gmail.com
        addUserPage.getEmail().clear().type('akd+gmail.com');
        addUserPage.getSaveAndAddNewButton().should('not.be.enabled');
        addUserPage.getSaveButton().should('not.be.enabled');
        addUserPage
          .getEmailHint()
          .should('exist')
          .invoke('text')
          .should('eq', 'A valid email address is required.');
        const email = Generators.email();
        // Enter valid Email
        addUserPage.getEmail().clear().type(email);
        addUserPage.getSaveAndAddNewButton().should('be.enabled');
        addUserPage.getSaveButton().should('be.enabled');
        addUserPage
          .getEmailHint()
          .should('exist')
          .invoke('text')
          .should('eq', 'An individual account will be created');
      });

      it('C31807 verify Valid email create an individual account', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.clickAddUserButton();
        addUserPage.getPageHeading().invoke('text').should('eq', 'Add User');
        addUserPage.getEmail().clear().type(Generators.email());
        addUserPage
          .getEmailHint()
          .invoke('text')
          .should('eq', 'An individual account will be created', {
            timeout: 2000,
          });
      });

      it('C33697 Verify phone number validation works correctly', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.clickAddUserButton();
        addUserPage.getPageHeading().invoke('text').should('eq', 'Add User');

        // Enter special char in phone field
        addUserPage.getPhoneNumber().clear().type('*');
        addUserPage.getSaveAndAddNewButton().should('not.be.enabled');
        addUserPage.getSaveButton().should('not.be.enabled');
        addUserPage
          .getPhoneHint()
          .should('exist')
          .invoke('text')
          .should('eq', 'A valid phone number is required.');

        // Enter invalid value 2223334444
        addUserPage.getPhoneNumber().clear().type('2223334444');
        addUserPage.getSaveAndAddNewButton().should('not.be.enabled');
        addUserPage.getSaveButton().should('not.be.enabled');
        addUserPage
          .getPhoneHint()
          .should('exist')
          .invoke('text')
          .should('eq', 'A valid phone number is required.');

        // Enter invalid value +111111111111111
        addUserPage.getPhoneNumber().clear().type('+111111111111111');
        addUserPage.getSaveAndAddNewButton().should('not.be.enabled');
        addUserPage.getSaveButton().should('not.be.enabled');
        addUserPage
          .getPhoneHint()
          .should('exist')
          .invoke('text')
          .should('eq', 'A valid phone number is required.');
        // Enter invalid Email @gmail.c
        addUserPage.getPhoneNumber().clear().type('@gmail.c');
        addUserPage.getSaveAndAddNewButton().should('not.be.enabled');
        addUserPage.getSaveButton().should('not.be.enabled');
        addUserPage
          .getPhoneHint()
          .should('exist')
          .invoke('text')
          .should('eq', 'A valid phone number is required.');
      });

      it('C41207 Verify Save and Add New button works correctly', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        portal.clickSettingsLink();
        leftHandPane.clickOnUserManagement();
        userManagementPage
          .getPageHeading()
          .should('contain', 'User management');
        userManagementPage.clickAddUserButton();
        addUserPage.getPageHeading().invoke('text').should('eq', 'Add User');

        addUserPage.getEmail().clear().type(Generators.email());
        addUserPage.getPhoneNumber().clear().type('+12223334444');
        addUserPage.getSendInviteCheckBox().click();
        addUserPage.clickSaveAndAddNewButton();
      });
    });
  }
);
