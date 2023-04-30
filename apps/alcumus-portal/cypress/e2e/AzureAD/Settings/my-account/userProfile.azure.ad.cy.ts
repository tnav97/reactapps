import { Portal } from '../../../../fixtures/page-objects/portal';
import { describeWhenEnabled } from '../../../../support/e2e';
import { MyAccountPage } from '../../../../fixtures/page-objects/settings/my-account/myAccountPage';
import { EditUserInfoPage } from '../../../../fixtures/page-objects/settings/my-account/editUserInfoPage';
import standardUser from './../../../../fixtures/users/Standard_User.json';

describeWhenEnabled(
  'Portal - Verify User Profile section with AzureAD',
  'FEATURE_TOGGLE_USE_AZURE_AD',
  () => {
    describe('My Account - User Profile', () => {
      const portal = new Portal();
      const myAccountPage = new MyAccountPage();
      const editUserInfoPage = new EditUserInfoPage();

      beforeEach(() => {
        cy.loginWithAzureAd(standardUser.userEmail, standardUser.password);
        portal.clickSettingsLink();
      });

      it('C31585 Verify User Profile section elements state', () => {
        myAccountPage
          .getPageheading()
          .invoke('text')
          .should('eq', 'My account');
        myAccountPage.getSubHeading1().should('be.visible');
        myAccountPage
          .getSubHeading1()
          .invoke('text')
          .should('eq', 'User profile');
        myAccountPage
          .getInformationHeader1()
          .invoke('text')
          .should(
            'eq',
            'This information will be displayed on your public profile.'
          );
        myAccountPage.getEditUserProfileButton().should('not.be.disabled');
        myAccountPage
          .getEditUserProfileButton()
          .invoke('text')
          .should('eq', 'Edit');
        myAccountPage.getUserImage().should('be.visible');
        myAccountPage
          .getFirstName()
          .invoke('text')
          .should('eq', standardUser.firstName);
        myAccountPage
          .getLastName()
          .invoke('text')
          .should('eq', standardUser.lastName);
      });

      it('C31587 Verify Edit User Profile popup frame elements state', () => {
        myAccountPage
          .getPageheading()
          .invoke('text')
          .should('eq', 'My account');
        myAccountPage.getSubHeading1().should('be.visible');
        myAccountPage.clickEditProfileButton();
        editUserInfoPage
          .getUpdateUserProfileButton()
          .should('have.css', 'background-color', 'rgb(0, 108, 181)')
          .should('be.visible')
          .should('be.enabled');
        editUserInfoPage
          .getCancelButton()
          .should('be.visible')
          .should('be.enabled');
        editUserInfoPage
          .getEditUserProfileHeading()
          .invoke('text')
          .should('eq', 'Edit user profile');
        editUserInfoPage.getCloseUserProfileButton().should('be.visible');
        editUserInfoPage.getEditUserProfileImage().should('be.visible');
        editUserInfoPage
          .getFirstName()
          .should('have.value', standardUser.firstName)
          .should('be.enabled');
        editUserInfoPage
          .getLastName()
          .should('have.value', standardUser.lastName);
        editUserInfoPage.getCloseUserProfileButton().should('be.visible');
        editUserInfoPage.clickCloseUserProfileButton();
      });

      it('C31588 Verify Close button works', () => {
        myAccountPage
          .getPageheading()
          .invoke('text')
          .should('eq', 'My account');
        myAccountPage.getSubHeading1().should('be.visible');
        myAccountPage.clickEditProfileButton();
        editUserInfoPage.getEditUserProfileHeading().should('be.visible');
        editUserInfoPage.clickCloseUserProfileButton();
        editUserInfoPage.getEditUserProfileHeading().should('not.exist');
      });

      it('C31589 Verify cancel button works', () => {
        myAccountPage
          .getPageheading()
          .invoke('text')
          .should('eq', 'My account');
        myAccountPage.getSubHeading1().should('be.visible');
        myAccountPage.clickEditProfileButton();
        editUserInfoPage.getEditUserProfileHeading().should('be.visible');
        editUserInfoPage.clickCancelButton();
        editUserInfoPage.getEditUserProfileHeading().should('not.exist');
      });

      it('C31590 User can edit their edit profile information', () => {
        const newFirstName = 'FirstName';
        const newLastName = 'LastName';

        myAccountPage
          .getPageheading()
          .invoke('text')
          .should('eq', 'My account');
        myAccountPage.getSubHeading1().should('be.visible');
        myAccountPage
          .getFirstName()
          .invoke('text')
          .should('eq', standardUser.firstName);
        myAccountPage
          .getLastName()
          .invoke('text')
          .should('eq', standardUser.lastName);

        myAccountPage.clickEditProfileButton();
        editUserInfoPage.enterFirstName(newFirstName);
        editUserInfoPage.enterLastName(newLastName);

        editUserInfoPage.clickUpdateUserProfileButton();
        // wait for modal and toast to disappear
        cy.get('[data-testid=avatar]').should('not.exist');
        cy.get('h6').contains('Profile updated').should('not.exist');
        myAccountPage.getFirstName().should('contain', newFirstName);
        myAccountPage.getLastName().should('contain', newLastName);

        // return fields to initial values
        myAccountPage.clickEditProfileButton();
        editUserInfoPage.enterFirstName(standardUser.firstName);
        editUserInfoPage.enterLastName(standardUser.lastName);
        editUserInfoPage.clickUpdateUserProfileButton();
      });
    });
  }
);
