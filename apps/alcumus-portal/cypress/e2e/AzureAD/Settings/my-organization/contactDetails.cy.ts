/// <reference types="cypress-grep" />
import { describeWhenEnabled } from '../../../../support/e2e';
import { EditContactDetailsPage } from '../../../../fixtures/page-objects/settings/my-organization/editContactDetailsPage';
import { MyOrganizationPage } from '../../../../fixtures/page-objects/settings/my-organization/myOrganizationPage';
// import { Generators } from '../../../../../fixtures/common/generators';
import clientAdmin from '../../../../fixtures/users/Client_Admin_User.json';

describeWhenEnabled(
  'Alcumus Portal - My Organization Tests - Contact Details',
  'FEATURE_TOGGLE_USE_AZURE_AD',
  () => {
    describe('When starting from Portal page ', () => {
      const myOrganizationPage = new MyOrganizationPage();
      const editContactDetailsPage = new EditContactDetailsPage();
      it(
        'C31841 Verify Contact Details section page elements state',
        { tags: '@smoke' },
        () => {
          cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
          myOrganizationPage.visit();
          myOrganizationPage
            .getPageHeading()
            .should('contain', 'My organization');

          myOrganizationPage
            .getSubHeading2()
            .invoke('text')
            .should('eq', 'Contact information');
          myOrganizationPage
            .getEmailAddress()
            .should('be.visible')
            .invoke('text')
            .should('not.eq', '');
          myOrganizationPage
            .getPhoneNumber()
            .should('be.visible')
            .invoke('text')
            .should('not.eq', '');
          myOrganizationPage
            .getFaxNumber()
            .should('be.visible')
            .invoke('text')
            .should('eq', 'Not entered');
          myOrganizationPage
            .getContactDetailsEidtButton()
            .should('be.visible')
            .should('be.enabled')
            .invoke('text')
            .should('eq', 'Edit');
        }
      );

      it('C31842 Verify Edit Contact Details section popup elements state', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage.clickContactDetailsEditButton();
        editContactDetailsPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit contact information');
        // editContactDetailsPage
        //   .getEmailAddress()
        //   .invoke('attr', 'value')
        //   .should('eq', '');
        // editContactDetailsPage
        //   .getEmailAddress()
        //   .invoke('attr', 'placeholder')
        //   .should('eq', 'Not entered');
        // editContactDetailsPage
        //   .getPhoneNumber()
        //   .invoke('attr', 'value')
        //   .should('eq', '');
        // editContactDetailsPage
        //   .getPhoneNumber()
        //   .invoke('attr', 'placeholder')
        //   .should('eq', '+1 2223334444');
        editContactDetailsPage
          .getFaxNumber()
          .invoke('attr', 'value')
          .should('eq', '');
        editContactDetailsPage
          .getFaxNumber()
          .invoke('attr', 'placeholder')
          .should('eq', '+1 2223334444');
        editContactDetailsPage.getFaxNumber().should('not.be.enabled');
        editContactDetailsPage
          .getContactDetailsCloseButton()
          .should('be.visible');
        editContactDetailsPage.getCancelButton().should('be.visible');
        editContactDetailsPage.getEmailAddress().clear();
        editContactDetailsPage.getEmailAddress().clear();
        editContactDetailsPage
          .getSaveButton()
          .should('be.visible')
          .should('have.css', 'background-color', 'rgba(0, 108, 181, 0.3)');
      });

      it('C31843 Verify Edit Contact Details section close button works', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage.clickContactDetailsEditButton();
        editContactDetailsPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit contact information');
        editContactDetailsPage.clickContactDetailsCloseButton();
        editContactDetailsPage.getPageHeading().should('not.exist');
      });

      it('C31844 Verify Edit Contact Details section cancel button works', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage.clickContactDetailsEditButton();
        editContactDetailsPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit contact information');
        editContactDetailsPage.clickContactDetailsCloseButton();
        editContactDetailsPage.getPageHeading().should('not.exist');
      });

      it('C33059 Verify Edit Email address validations', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage.clickContactDetailsEditButton();
        editContactDetailsPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit contact information');
        // Email added should not accept empty filed
        editContactDetailsPage.getEmailAddress().clear();
        editContactDetailsPage.getSaveButton().should('not.be.enabled');
        // Email added should not accept blank space
        editContactDetailsPage.getEmailAddress().clear().type(' ');
        editContactDetailsPage.getSaveButton().should('not.be.enabled');
        // Email added should not accept incorrect email format abl@gmail
        editContactDetailsPage.getEmailAddress().clear().type('abl@gmail');
        editContactDetailsPage
          .getContactDetailsError()
          .invoke('text')
          .should('eq', 'A valid email address is required.');
        editContactDetailsPage.getSaveButton().should('not.be.enabled');
        // Email added should not accept incorrect email format abl@gmail.
        editContactDetailsPage.getEmailAddress().clear().type('abl@gmail.');
        editContactDetailsPage
          .getContactDetailsError()
          .invoke('text')
          .should('eq', 'A valid email address is required.');
        editContactDetailsPage.getSaveButton().should('not.be.enabled');
        // Email added should not accept incorrect email format @email.com
        editContactDetailsPage.getEmailAddress().clear().type('@email.com');
        editContactDetailsPage
          .getContactDetailsError()
          .invoke('text')
          .should('eq', 'A valid email address is required.');
        editContactDetailsPage.getSaveButton().should('not.be.enabled');
        // Email added should not accept incorrect email format @email.com
        editContactDetailsPage.getEmailAddress().clear().type('.@email.com');
        editContactDetailsPage
          .getContactDetailsError()
          .invoke('text')
          .should('eq', 'A valid email address is required.');
        editContactDetailsPage.getSaveButton().should('not.be.enabled');
        // Email added should not accept incorrect email format email@domain.ca.u
        editContactDetailsPage
          .getEmailAddress()
          .clear()
          .type('email@domain.ca.u');
        editContactDetailsPage
          .getContactDetailsError()
          .invoke('text')
          .should('eq', 'A valid email address is required.');
        editContactDetailsPage.getSaveButton().should('not.be.enabled');
        // Email added should not accept a char
        editContactDetailsPage.getEmailAddress().clear().type('c');
        editContactDetailsPage.getSaveButton().should('not.be.enabled');
      });

      it('C33060 Verify Email address get saved correctly', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage.clickContactDetailsEditButton();
        editContactDetailsPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit contact information');
        editContactDetailsPage
          .getEmailAddress()
          .clear()
          .type('abc@example.com');
        editContactDetailsPage.getPhoneNumber().clear().type('+12223334444');
        editContactDetailsPage.clickContactDetailsSaveButton();
        editContactDetailsPage.getPageHeading().should('not.exist');
        cy.get('svg+h6').should('not.exist');
        myOrganizationPage
          .getEmailAddress()
          .invoke('text')
          .should('eq', 'abc@example.com');
        myOrganizationPage.clickContactDetailsEditButton();
        editContactDetailsPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit contact information');
        editContactDetailsPage
          .getEmailAddress()
          .invoke('attr', 'value')
          .should('eq', 'abc@example.com');
      });

      it('C33061 Verify Edit Phone number validations', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage.clickContactDetailsEditButton();
        editContactDetailsPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit contact information');
        // Phone number added should not accept empty filed
        editContactDetailsPage.getPhoneNumber().clear();
        editContactDetailsPage.getSaveButton().should('not.be.enabled');
        // Phone number added should not accept blank space
        editContactDetailsPage.getPhoneNumber().clear().type(' ');
        editContactDetailsPage.getSaveButton().should('not.be.enabled');
        // Phone number added should not accept incorrect phonenumber format qq
        editContactDetailsPage.getPhoneNumber().clear().type('qq');
        editContactDetailsPage
          .getContactDetailsError()
          .invoke('text')
          .should('eq', 'A valid phone number is required.');
        editContactDetailsPage.getSaveButton().should('not.be.enabled');
        // Phone number added should not accept incorrect phonenumber format 123
        editContactDetailsPage.getPhoneNumber().clear().type('abl@gmail.');
        editContactDetailsPage
          .getContactDetailsError()
          .invoke('text')
          .should('eq', 'A valid phone number is required.');
        editContactDetailsPage.getSaveButton().should('not.be.enabled');
        // Phone number added should not accept incorrect phonenumber format 2223334444
        editContactDetailsPage.getPhoneNumber().clear().type('2223334444');
        editContactDetailsPage
          .getContactDetailsError()
          .invoke('text')
          .should('eq', 'A valid phone number is required.');
        editContactDetailsPage.getSaveButton().should('not.be.enabled');
        // Phone number added should not accept incorrect phonenumber format @1 2223334444
        editContactDetailsPage.getPhoneNumber().clear().type('@1 2223334444');
        editContactDetailsPage
          .getContactDetailsError()
          .invoke('text')
          .should('eq', 'A valid phone number is required.');
        editContactDetailsPage.getSaveButton().should('not.be.enabled');
        // Phone number added should not accept incorrect phonenumber format 12223334444.
        editContactDetailsPage.getPhoneNumber().clear().type('+12223334444.');
        editContactDetailsPage
          .getContactDetailsError()
          .invoke('text')
          .should('eq', 'A valid phone number is required.');
        editContactDetailsPage.getSaveButton().should('not.be.enabled');
        // Phone number added should not accept a char
        editContactDetailsPage.getPhoneNumber().clear().type('c');
        editContactDetailsPage.getSaveButton().should('not.be.enabled');
      });

      it('C33062 Verify Phone number get saved correctly', () => {
        cy.loginWithAzureAd(clientAdmin.userEmail, clientAdmin.password);
        myOrganizationPage.visit();
        myOrganizationPage
          .getPageHeading()
          .should('contain', 'My organization');
        myOrganizationPage.clickContactDetailsEditButton();
        editContactDetailsPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit contact information');
        editContactDetailsPage
          .getEmailAddress()
          .clear()
          .type('abc@example.com');
        editContactDetailsPage.getPhoneNumber().clear().type('+12223334444');
        editContactDetailsPage.clickContactDetailsSaveButton();
        editContactDetailsPage.getPageHeading().should('not.exist');
        cy.get('svg+h6').should('not.exist');
        myOrganizationPage
          .getPhoneNumber()
          .invoke('text')
          .should('eq', '+12223334444');
        myOrganizationPage.clickContactDetailsEditButton();
        editContactDetailsPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Edit contact information');
        editContactDetailsPage
          .getPhoneNumber()
          .invoke('attr', 'value')
          .should('eq', '+12223334444');
      });
    });
  }
);
