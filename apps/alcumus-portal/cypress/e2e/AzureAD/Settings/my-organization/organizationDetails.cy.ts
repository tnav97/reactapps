import { describeWhenEnabled } from '../../../../support/e2e';
import { EditOrganizationDetailsPage } from '../../../../fixtures/page-objects/settings/my-organization/editOrganizationDetailsPage';
import { MyOrganizationPage } from '../../../../fixtures/page-objects/settings/my-organization/myOrganizationPage';
// import { Generators } from '../../../../../fixtures/common/generators';
import clientAdmin from '../../../../fixtures/users/Client_Admin_User.json';
import organizationDetails from '../../../../fixtures/organization/Organization_Details.json';

describeWhenEnabled(
  'Alcumus Portal - My Organization Tests - Organization Details',
  'FEATURE_TOGGLE_USE_AZURE_AD',
  () => {
    describe('When starting from Portal page ', () => {
      const myOrganizationPage = new MyOrganizationPage();
      const editOrganizationDetailsPage = new EditOrganizationDetailsPage();

      it('C31837 Verify Organization Details section page elements state', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');

        myOrganizationPage
          .getSubHeading1()
          .invoke('text')
          .should('eq', 'Organization details');
        myOrganizationPage
          .getOrganizationName()
          .should('be.visible')
          .invoke('text')
          .should('eq', organizationDetails.tenantName);
        myOrganizationPage
          .getOrganizationType()
          .should('be.visible')
          .invoke('text')
          .should('eq', 'Not entered');
        myOrganizationPage
          .getOrganizationSize()
          .should('be.visible')
          .invoke('text')
          .should('not.eq', '');
        myOrganizationPage
          .getOrganizationWebsite()
          .should('be.visible')
          .invoke('text')
          .should('eq', 'Not entered');
        myOrganizationPage
          .getOrganizationLanguage()
          .should('be.visible')
          .invoke('text')
          .should('eq', 'English');
        myOrganizationPage
          .getOrganizationDetailsEidtButton()
          .should('be.visible')
          .should('be.enabled')
          .invoke('text')
          .should('eq', 'Edit');
      });

      it('C31838 Verify Edit Organization Details section popup elements state', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage.clickOrganizationDetailsEditButton();
        editOrganizationDetailsPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit organization details');
        editOrganizationDetailsPage
          .getOrganizationName()
          .invoke('attr', 'value')
          .should('eq', organizationDetails.tenantName);
        editOrganizationDetailsPage
          .getOrganizationType()
          .should('not.be.enabled');
        editOrganizationDetailsPage
          .getOrganizationSize()
          .invoke('text')
          .should('contain', 'Small');
        editOrganizationDetailsPage
          .getOrganizationWebsite()
          .invoke('attr', 'value')
          .should('eq', '');
        editOrganizationDetailsPage
          .getOrganizationWebsite()
          .invoke('attr', 'placeholder')
          .should('eq', 'Not entered');
        editOrganizationDetailsPage
          .getOrganizationLanguage()
          .invoke('text')
          .should('contain', 'English');
        editOrganizationDetailsPage
          .getOrganizationDetailsCloseButton()
          .should('be.visible');
        editOrganizationDetailsPage.getCancelButton().should('be.visible');
        editOrganizationDetailsPage.getCancelButton().should('be.visible');
        editOrganizationDetailsPage
          .getSaveButton()
          .should('be.visible')
          .should('have.css', 'background-color', 'rgb(0, 108, 181)');
      });

      it('C31839 Verify Organization Details close button works', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage.clickOrganizationDetailsEditButton();
        editOrganizationDetailsPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit organization details');
        editOrganizationDetailsPage.clickOrganizationDetailsCloseButton();
        editOrganizationDetailsPage.getPageHeading().should('not.exist');
      });

      it('C31840 Verify Organization Details cancel button works', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage.clickOrganizationDetailsEditButton();
        editOrganizationDetailsPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit organization details');
        editOrganizationDetailsPage.clickOrganizationDetailsCancelButton();
        editOrganizationDetailsPage.getPageHeading().should('not.exist');
      });

      it('C33055 Verify Organization Name field validations', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage.clickOrganizationDetailsEditButton();
        editOrganizationDetailsPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit organization details');
        // should not be empty
        editOrganizationDetailsPage.getOrganizationName().clear();
        editOrganizationDetailsPage.getSaveButton().should('not.be.enabled');
        editOrganizationDetailsPage
          .getOrganizationError()
          .should('be.visible')
          .invoke('text')
          .should(
            'eq',
            'Minimum of one character is required for the organization name.'
          );
        // should not accept blank space
        editOrganizationDetailsPage.getOrganizationName().type(' ');
        editOrganizationDetailsPage.getSaveButton().should('not.be.enabled');
        editOrganizationDetailsPage
          .getOrganizationError()
          .should('be.visible')
          .invoke('text')
          .should(
            'eq',
            'Minimum of one character is required for the organization name.'
          );
        // should accept one special char
        editOrganizationDetailsPage.getOrganizationName().clear().type('*');
        editOrganizationDetailsPage.getOrganizationError().should('not.exist');
        editOrganizationDetailsPage.getSaveButton().should('be.enabled');
      });

      it('C33056 Verify Organization Name field get saved correctly', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage.clickOrganizationDetailsEditButton();
        editOrganizationDetailsPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit organization details');
        // should save the value correctly
        editOrganizationDetailsPage
          .getOrganizationName()
          .clear()
          .type(organizationDetails.tenantName + '1');
        editOrganizationDetailsPage.getSaveButton().should('be.enabled');
        editOrganizationDetailsPage.getOrganizationError().should('not.exist');
        editOrganizationDetailsPage.clickOrganizationDetailsSaveButton();
        editOrganizationDetailsPage.getPageHeading().should('not.exist');
        cy.get('svg+h6').should('not.exist');
        myOrganizationPage
          .getOrganizationName()
          .invoke('text')
          .should('eq', organizationDetails.tenantName + '1');
        myOrganizationPage.clickOrganizationDetailsEditButton();
        editOrganizationDetailsPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit organization details');
        editOrganizationDetailsPage
          .getOrganizationName()
          .invoke('attr', 'value')
          .should('eq', organizationDetails.tenantName + '1');
        editOrganizationDetailsPage
          .getOrganizationName()
          .clear()
          .type(organizationDetails.tenantName);
        editOrganizationDetailsPage.clickOrganizationDetailsSaveButton();
        editOrganizationDetailsPage.getPageHeading().should('not.exist');
        cy.get('svg+h6').should('not.exist');
      });

      it('C33057 Verify Organization Website field validations', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage.clickOrganizationDetailsEditButton();
        editOrganizationDetailsPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit organization details');
        // should not accept just a char
        editOrganizationDetailsPage.getOrganizationWebsite().clear().type('a');
        editOrganizationDetailsPage.getSaveButton().should('not.be.enabled');
        editOrganizationDetailsPage
          .getOrganizationError()
          .should('be.visible')
          .invoke('text')
          .should('eq', 'A valid website URL is required.');
        // should accept www.xyz.com format
        editOrganizationDetailsPage
          .getOrganizationWebsite()
          .clear()
          .type('www.xyz.com');
        editOrganizationDetailsPage.getSaveButton().should('be.enabled');
        editOrganizationDetailsPage.getOrganizationError().should('not.exist');
        // should accept www.xyz.co.in format
        editOrganizationDetailsPage
          .getOrganizationWebsite()
          .clear()
          .type('www.xyz.co.in');
        editOrganizationDetailsPage.getSaveButton().should('be.enabled');
        editOrganizationDetailsPage.getOrganizationError().should('not.exist');
        // should accept www.xyz.uk format
        editOrganizationDetailsPage
          .getOrganizationWebsite()
          .clear()
          .type('www.xyz.uk');
        editOrganizationDetailsPage.getSaveButton().should('be.enabled');
        editOrganizationDetailsPage.getOrganizationError().should('not.exist');
      });

      it('C33058 Verify Organization Website field get saved correctly', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage.clickOrganizationDetailsEditButton();
        editOrganizationDetailsPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit organization details');
        // should save the value correctly
        editOrganizationDetailsPage
          .getOrganizationWebsite()
          .clear()
          .type('WWW.TestWebsite.com');
        editOrganizationDetailsPage.getSaveButton().should('be.enabled');
        editOrganizationDetailsPage.clickOrganizationDetailsSaveButton();
        editOrganizationDetailsPage.getPageHeading().should('not.exist');
        cy.get('svg+h6').should('not.exist');
        myOrganizationPage
          .getOrganizationWebsite()
          .invoke('text')
          .should('eq', 'WWW.TestWebsite.com');
        myOrganizationPage.clickOrganizationDetailsEditButton();
        editOrganizationDetailsPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit organization details');
        editOrganizationDetailsPage
          .getOrganizationWebsite()
          .invoke('attr', 'value')
          .should('eq', 'WWW.TestWebsite.com');
        editOrganizationDetailsPage.getOrganizationWebsite().clear();
        editOrganizationDetailsPage.clickOrganizationDetailsSaveButton();
        editOrganizationDetailsPage.getPageHeading().should('not.exist');
        cy.get('svg+h6').should('not.exist');
      });
    });
  }
);
