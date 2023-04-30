import { Portal } from '../../../../fixtures/page-objects/portal';
import { describeWhenEnabled } from '../../../../support/e2e';
import { MyAccountPage } from '../../../../fixtures/page-objects/settings/my-account/myAccountPage';
import { EditUserEmailPage } from '../../../../fixtures/page-objects/settings/my-account/editUserEmailPage';
import { EditUserPasswordPage } from '../../../../fixtures/page-objects/settings/my-account/editUserPasswordPage';
import standardUser from '../../../../fixtures/users/Standard_User.json';

describeWhenEnabled(
  'Portal - Verify User Profile section with AzureAD',
  'FEATURE_TOGGLE_USE_AZURE_AD',
  () => {
    describe('My Account - User Profile', () => {
      const portal = new Portal();
      const myAccountPage = new MyAccountPage();
      const editUserEmailPage = new EditUserEmailPage();
      const editUserPasswordPage = new EditUserPasswordPage();

      beforeEach(() => {
        cy.loginWithAzureAd(standardUser.userEmail, standardUser.password);
        portal.clickSettingsLink();
      });

      it('C31591 Verify account detail section elements state', () => {
        myAccountPage
          .getPageheading()
          .invoke('text')
          .should('eq', 'My account');
        myAccountPage.getSubHeading2().should('be.visible');
        myAccountPage
          .getSubHeading2()
          .invoke('text')
          .should('eq', 'Account details');
        myAccountPage
          .getInformationHeader2()
          .invoke('text')
          .should('eq', 'This information is used to log in to your account');
        myAccountPage
          .getEmail()
          .invoke('text')
          .should('eq', standardUser.userEmail);
        myAccountPage.getEditEmailButton().should('not.be.disabled');
        myAccountPage.getEditEmailButton().invoke('text').should('eq', 'Edit');
        myAccountPage.getPassword().invoke('text').should('not.eq', '');
        myAccountPage.getEditPasswordButton().should('not.be.disabled');
        myAccountPage
          .getEditPasswordButton()
          .invoke('text')
          .should('eq', 'Edit');
      });

      it('C31592 Verify Edit User email popup elements state', () => {
        myAccountPage
          .getPageheading()
          .invoke('text')
          .should('eq', 'My account');
        myAccountPage.getSubHeading2().should('be.visible');
        myAccountPage.ClickEditEmailButton();

        editUserEmailPage
          .getEditUserEmailHeading()
          .invoke('text')
          .should('eq', 'Edit email');
        editUserEmailPage
          .getWorningMessage()
          .invoke('text')
          .should(
            'eq',
            'You will be logged out after the email you log in with changes'
          );
        editUserEmailPage.getEmail().should('have.value', '');
        editUserEmailPage.getCloseEmailButton().should('be.visible');
        editUserEmailPage
          .getCancelButton()
          .should('be.visible')
          .should('be.enabled');
        editUserEmailPage
          .getUpdateEmailButton()
          .should('have.css', 'background-color', 'rgba(0, 108, 181, 0.3)')
          .should('be.visible')
          .should('not.be.enabled');
      });

      it('C31593 Verify Close Email button works', () => {
        myAccountPage
          .getPageheading()
          .invoke('text')
          .should('eq', 'My account');
        myAccountPage.getSubHeading1().should('be.visible');
        myAccountPage.ClickEditEmailButton();
        editUserEmailPage.getEditUserEmailHeading().should('be.visible');
        editUserEmailPage.clickCloseEmailButton();
        editUserEmailPage.getEditUserEmailHeading().should('not.exist');
      });

      it('C31607 Verify Cancel Email button works', () => {
        myAccountPage
          .getPageheading()
          .invoke('text')
          .should('eq', 'My account');
        myAccountPage.getSubHeading1().should('be.visible');
        myAccountPage.ClickEditEmailButton();
        editUserEmailPage.getEditUserEmailHeading().should('be.visible');
        editUserEmailPage.clickCancelButton();
        editUserEmailPage.getEditUserEmailHeading().should('not.exist');
      });

      it('C31608 Verify Edit User password popup elements state', () => {
        myAccountPage
          .getPageheading()
          .invoke('text')
          .should('eq', 'My account');
        myAccountPage.getSubHeading2().should('be.visible');
        myAccountPage.ClickEditPasswordButton();
        editUserPasswordPage
          .getEditUserPasswordHeading()
          .should('be.visible')
          .invoke('text')
          .should('eq', 'Edit password');
        editUserPasswordPage.getPassword().should('have.value', '');

        editUserPasswordPage
          .getCancelButton()
          .should('be.visible')
          .should('be.enabled');
        editUserPasswordPage
          .getUpdateEmailButton()
          .should('have.css', 'background-color', 'rgba(0, 108, 181, 0.3)')
          .should('be.visible')
          .should('not.be.enabled');
      });

      it('C31609 Verify Close Password button works', () => {
        myAccountPage
          .getPageheading()
          .invoke('text')
          .should('eq', 'My account');
        myAccountPage.getSubHeading1().should('be.visible');
        myAccountPage.ClickEditPasswordButton();
        editUserPasswordPage.getEditUserPasswordHeading().should('be.visible');
        editUserPasswordPage.clickClosePasswordButton();
        editUserPasswordPage.getEditUserPasswordHeading().should('not.exist');
      });

      it('C31606 Verify cancel Password button works', () => {
        myAccountPage
          .getPageheading()
          .invoke('text')
          .should('eq', 'My account');
        myAccountPage.getSubHeading1().should('be.visible');
        myAccountPage.ClickEditPasswordButton();
        editUserPasswordPage.getEditUserPasswordHeading().should('be.visible');
        editUserPasswordPage.clickCancelButton();
        editUserPasswordPage.getEditUserPasswordHeading().should('not.exist');
      });
    });
  }
);
