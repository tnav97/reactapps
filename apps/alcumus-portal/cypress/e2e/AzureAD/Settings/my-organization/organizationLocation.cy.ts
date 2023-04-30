import { describeWhenEnabled } from '../../../../support/e2e';
import { EditOrganizationLocationPage } from '../../../../fixtures/page-objects/settings/my-organization/editOrganizationLoationPage';
import { MyOrganizationPage } from '../../../../fixtures/page-objects/settings/my-organization/myOrganizationPage';
// import { Generators } from '../../../../../fixtures/common/generators';
import clientAdmin from '../../../../fixtures/users/Client_Admin_User.json';

describeWhenEnabled(
  'Alcumus Portal - My Organization Tests - Organization Location',
  'FEATURE_TOGGLE_USE_AZURE_AD',
  () => {
    describe('When starting from Portal page ', () => {
      const myOrganizationPage = new MyOrganizationPage();
      const editOrganizationLoationPage = new EditOrganizationLocationPage();

      it('C31845 Verify Organization Location section page elements state', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage
          .getSubHeading3()
          .invoke('text')
          .should('eq', 'Organization location');
        myOrganizationPage
          .getAddress1()
          .should('be.visible')
          .invoke('text')
          .should('eq', 'Not entered');
        myOrganizationPage
          .getCity()
          .should('be.visible')
          .invoke('text')
          .should('eq', 'Not entered');
        myOrganizationPage
          .getState()
          .should('be.visible')
          .invoke('text')
          .should('eq', 'Not entered');
        myOrganizationPage
          .getZip()
          .should('be.visible')
          .invoke('text')
          .should('eq', 'Not entered');
        myOrganizationPage
          .getCountry()
          .should('be.visible')
          .invoke('text')
          .should('eq', 'Not entered');
        myOrganizationPage
          .getOrganizationLocationEditButton()
          .should('be.visible')
          .should('be.enabled')
          .invoke('text')
          .should('eq', 'Edit');
      });

      it('C31846 Verify Edit Organization Location section popup elements state', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage.clickOrganizationLoactionEditButton();
        editOrganizationLoationPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit organization location');
        editOrganizationLoationPage
          .getAddress1()
          .invoke('attr', 'value')
          .should('eq', '');
        editOrganizationLoationPage
          .getAddress1()
          .invoke('attr', 'placeholder')
          .should('eq', 'Not entered');
        editOrganizationLoationPage
          .getCity()
          .invoke('attr', 'value')
          .should('eq', '');
        editOrganizationLoationPage
          .getCity()
          .invoke('attr', 'placeholder')
          .should('eq', 'Not entered');
        editOrganizationLoationPage
          .getState()
          .invoke('attr', 'value')
          .should('eq', '');
        editOrganizationLoationPage
          .getState()
          .invoke('attr', 'placeholder')
          .should('eq', 'Not entered');
        editOrganizationLoationPage
          .getState()
          .invoke('attr', 'value')
          .should('eq', '');
        editOrganizationLoationPage
          .getState()
          .invoke('attr', 'placeholder')
          .should('eq', 'Not entered');
        editOrganizationLoationPage
          .getZip()
          .invoke('attr', 'value')
          .should('eq', '');
        editOrganizationLoationPage
          .getZip()
          .invoke('attr', 'placeholder')
          .should('eq', 'Not entered');
        editOrganizationLoationPage
          .getCountry()
          .invoke('text')
          .should('contain', 'Canada');
        editOrganizationLoationPage
          .getOrganizationLocationCloseButton()
          .should('be.visible');
        editOrganizationLoationPage.getCancelButton().should('be.visible');
        editOrganizationLoationPage.getCancelButton().should('be.visible');
        editOrganizationLoationPage
          .getSaveButton()
          .should('be.visible')
          .should('have.css', 'background-color', 'rgba(0, 108, 181, 0.3)');
      });

      it('C31847 Verify Organization Location section close button works', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage.clickOrganizationLoactionEditButton();
        editOrganizationLoationPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit organization location');
        editOrganizationLoationPage.clickOrganizationLocationCloseButton();
        editOrganizationLoationPage.getPageHeading().should('not.exist');
      });

      it('C31848 Verify Organization Location cancel button works', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage.clickOrganizationLoactionEditButton();
        editOrganizationLoationPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit organization location');
        editOrganizationLoationPage.clickOrganizationLocationCancelButton();
        editOrganizationLoationPage.getPageHeading().should('not.exist');
      });

      it('C41203 Verify Organization Location Address line 1 validations', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage.clickOrganizationLoactionEditButton();
        editOrganizationLoationPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit organization location');
        editOrganizationLoationPage.getAddress1().clear();
        editOrganizationLoationPage.getCity().clear();
        editOrganizationLoationPage.getState().clear();
        editOrganizationLoationPage.getZip().clear();
        editOrganizationLoationPage
          .getSaveButton()
          .should('be.visible')
          .should('have.css', 'background-color', 'rgba(0, 108, 181, 0.3)');
        editOrganizationLoationPage.getAddress1().type('Address 1');
        editOrganizationLoationPage.getCity().type('city');
        editOrganizationLoationPage.getState().type('state');
        editOrganizationLoationPage.getZip().type('zip');
        editOrganizationLoationPage
          .getSaveButton()
          .should('be.visible')
          .should('have.css', 'background-color', 'rgb(0, 108, 181)');
        editOrganizationLoationPage.getAddress1().clear().type(' ');
        editOrganizationLoationPage
          .getSaveButton()
          .should('be.visible')
          .should('have.css', 'background-color', 'rgba(0, 108, 181, 0.3)');
        editOrganizationLoationPage.getAddress1().clear().type('*');
        editOrganizationLoationPage
          .getSaveButton()
          .should('be.visible')
          .should('have.css', 'background-color', 'rgb(0, 108, 181)');
      });

      it('C41204 Verify Organization Location City field validations', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage.clickOrganizationLoactionEditButton();
        editOrganizationLoationPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit organization location');
        editOrganizationLoationPage.getAddress1().clear();
        editOrganizationLoationPage.getCity().clear();
        editOrganizationLoationPage.getState().clear();
        editOrganizationLoationPage.getZip().clear();
        editOrganizationLoationPage
          .getSaveButton()
          .should('be.visible')
          .should('have.css', 'background-color', 'rgba(0, 108, 181, 0.3)');
        editOrganizationLoationPage.getAddress1().type('Address 1');
        editOrganizationLoationPage.getCity().type('city');
        editOrganizationLoationPage.getState().type('state');
        editOrganizationLoationPage.getZip().type('zip');
        editOrganizationLoationPage
          .getSaveButton()
          .should('be.visible')
          .should('have.css', 'background-color', 'rgb(0, 108, 181)');
        editOrganizationLoationPage.getCity().clear().type(' ');
        editOrganizationLoationPage
          .getSaveButton()
          .should('be.visible')
          .should('have.css', 'background-color', 'rgba(0, 108, 181, 0.3)');
        editOrganizationLoationPage.getCity().clear().type('*');
        editOrganizationLoationPage
          .getSaveButton()
          .should('be.visible')
          .should('have.css', 'background-color', 'rgb(0, 108, 181)');
      });

      it('C41205 Verify Organization Location State field validations', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage.clickOrganizationLoactionEditButton();
        editOrganizationLoationPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit organization location');
        editOrganizationLoationPage.getAddress1().clear();
        editOrganizationLoationPage.getCity().clear();
        editOrganizationLoationPage.getState().clear();
        editOrganizationLoationPage.getZip().clear();
        editOrganizationLoationPage
          .getSaveButton()
          .should('be.visible')
          .should('have.css', 'background-color', 'rgba(0, 108, 181, 0.3)');
        editOrganizationLoationPage.getAddress1().type('Address 1');
        editOrganizationLoationPage.getCity().type('city');
        editOrganizationLoationPage.getState().type('state');
        editOrganizationLoationPage.getZip().type('zip');
        editOrganizationLoationPage
          .getSaveButton()
          .should('be.visible')
          .should('have.css', 'background-color', 'rgb(0, 108, 181)');
        editOrganizationLoationPage.getState().clear().type(' ');
        editOrganizationLoationPage
          .getSaveButton()
          .should('be.visible')
          .should('have.css', 'background-color', 'rgba(0, 108, 181, 0.3)');
        editOrganizationLoationPage.getState().clear().type('*');
        editOrganizationLoationPage
          .getSaveButton()
          .should('be.visible')
          .should('have.css', 'background-color', 'rgb(0, 108, 181)');
      });

      it('C41206 Verify Organization Location zipcode field validaitons', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage.clickOrganizationLoactionEditButton();
        editOrganizationLoationPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit organization location');
        editOrganizationLoationPage.getAddress1().clear();
        editOrganizationLoationPage.getCity().clear();
        editOrganizationLoationPage.getState().clear();
        editOrganizationLoationPage.getZip().clear();
        editOrganizationLoationPage
          .getSaveButton()
          .should('be.visible')
          .should('have.css', 'background-color', 'rgba(0, 108, 181, 0.3)');
        editOrganizationLoationPage.getAddress1().type('Address 1');
        editOrganizationLoationPage.getCity().type('city');
        editOrganizationLoationPage.getState().type('state');
        editOrganizationLoationPage.getZip().type('zip');
        editOrganizationLoationPage
          .getSaveButton()
          .should('be.visible')
          .should('have.css', 'background-color', 'rgb(0, 108, 181)');
        editOrganizationLoationPage.getZip().clear().type(' ');
        editOrganizationLoationPage
          .getSaveButton()
          .should('be.visible')
          .should('have.css', 'background-color', 'rgba(0, 108, 181, 0.3)');
        editOrganizationLoationPage.getZip().clear().type('*');
        editOrganizationLoationPage
          .getSaveButton()
          .should('be.visible')
          .should('have.css', 'background-color', 'rgb(0, 108, 181)');
      });
    });
  }
);
