import { Portal } from '../../../../fixtures/page-objects/portal';
import { describeWhenEnabled } from '../../../../support/e2e';
import { MyAccountPage } from '../../../../fixtures/page-objects/settings/my-account/myAccountPage';
import { EditLocationAndLanguagePage } from '../../../../fixtures/page-objects/settings/my-account/editLocationAndLanguage';
import standardUser from './../../../../fixtures/users/Standard_User.json';

describeWhenEnabled(
  'Portal - Verify Location and Language details section with AzureAD',
  'FEATURE_TOGGLE_USE_AZURE_AD',
  () => {
    describe('My Account - Account Details', () => {
      const portal = new Portal();
      const myAccountPage = new MyAccountPage();
      const editLocationAndLanguagePage = new EditLocationAndLanguagePage();

      beforeEach(() => {
        cy.loginWithAzureAd(standardUser.userEmail, standardUser.password);
        portal.clickSettingsLink();
      });

      it('C31594 Verify Location & Language detail section elements state', () => {
        myAccountPage
          .getPageheading()
          .invoke('text')
          .should('eq', 'My account');
        myAccountPage.getSubHeading3().should('be.visible');
        myAccountPage
          .getSubHeading3()
          .invoke('text')
          .should('eq', 'Location & language');
        myAccountPage
          .getInformationHeader3()
          .invoke('text')
          .should(
            'eq',
            'Select your preferred country, language, and timezone.'
          );
        myAccountPage.getLanguage().invoke('text').should('not.eq', '');
        myAccountPage.getCountry().invoke('text').should('not.eq', '');
        myAccountPage.getTimezone().invoke('text').should('not.eq', '');
        myAccountPage.getEditLocationButton().should('not.be.disabled');
        myAccountPage
          .getEditLocationButton()
          .invoke('text')
          .should('eq', 'Edit');
      });

      it('C31595 Verify Edit User Location popup elements state', () => {
        myAccountPage.getSubHeading3().should('be.visible');
        myAccountPage.clickEditLocaleButton();
        editLocationAndLanguagePage
          .getPopupHeading()
          .invoke('text')
          .should('eq', 'Edit location & language');
        editLocationAndLanguagePage.getCountryList().should('be.visible');
        editLocationAndLanguagePage.getLanguageList().should('be.visible');
        editLocationAndLanguagePage.getTimezoneList().should('be.visible');
        editLocationAndLanguagePage.getTimezoneList().should('be.visible');
        editLocationAndLanguagePage
          .getCancelButton()
          .should('be.visible')
          .should('be.enabled');
        editLocationAndLanguagePage
          .getUpdateButton()
          .should('have.css', 'background-color', 'rgb(0, 108, 181)')
          .should('be.visible');
      });

      it('C31596 Verify User can edit their location and language information', () => {
        myAccountPage.getSubHeading3().should('be.visible');
        myAccountPage.clickEditLocaleButton();
        editLocationAndLanguagePage
          .getPopupHeading()
          .invoke('text')
          .should('eq', 'Edit location & language');
        editLocationAndLanguagePage.getCountryList().click();
        editLocationAndLanguagePage.clickCountryList();
        editLocationAndLanguagePage.getCountryList().contains('United Kingdom');
        editLocationAndLanguagePage.getLanguageList().click();
        editLocationAndLanguagePage.clickLanguageList();
        editLocationAndLanguagePage.getLanguageList().contains('English');
        editLocationAndLanguagePage.getTimezoneList().click();
        editLocationAndLanguagePage.clickTimezoneList();
        editLocationAndLanguagePage
          .getTimezoneList()
          .contains('Greenwich Mean Time - Europe/London - (1:00)');
        editLocationAndLanguagePage.clickUpdateButton();
        // wait for modal and toast to disappear
        cy.get('[data-testid=avatar]').should('not.exist');
        cy.get('h6').contains('Profile updated').should('not.exist');
        myAccountPage.getLanguage().invoke('text').should('eq', 'English');
        myAccountPage
          .getCountry()
          .invoke('text')
          .should('eq', 'United Kingdom');
        myAccountPage
          .getTimezone()
          .invoke('text')
          .should('eq', 'Europe/London');
      });

      it('C31597 Verify Close Location and Language button works', () => {
        myAccountPage
          .getPageheading()
          .invoke('text')
          .should('eq', 'My account');
        myAccountPage.getSubHeading1().should('be.visible');
        myAccountPage.clickEditLocaleButton();
        editLocationAndLanguagePage.getPopupHeading().should('be.visible');
        editLocationAndLanguagePage.clickCloseButton();
        editLocationAndLanguagePage.getPopupHeading().should('not.exist');
      });

      it('C31598 Verify cancel Location and Language button works', () => {
        myAccountPage
          .getPageheading()
          .invoke('text')
          .should('eq', 'My account');
        myAccountPage.getSubHeading1().should('be.visible');
        myAccountPage.clickEditLocaleButton();
        editLocationAndLanguagePage.getPopupHeading().should('be.visible');
        editLocationAndLanguagePage.clickCancelButton();
        editLocationAndLanguagePage.getPopupHeading().should('not.exist');
      });
    });
  }
);
