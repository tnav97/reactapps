// //TODO: Fix Tests to match new UI

// /// <reference types="cypress" />
// import { nanoid } from 'nanoid';
// import { Portal } from '../../fixtures/page-objects/portal';
// import { MyAccountPage } from '../../fixtures/page-objects/myAccountPage';
// import { describeWhenDisabled } from '../../../support';

// describeWhenDisabled(
//   'Portal - Profile updates with Keycloak',
//   'FEATURE_TOGGLE_USE_AZURE_AD',
//   () => {
//     load user data from fixture and create login actions
//     const myAccountPage = new MyAccountPage();
//     const portal = new Portal();

//     it('Save button is disabled if no changes are made', () => {
//       const userGuid = nanoid(10);

//       cy.registerWithKeycloak(userGuid);
//       cy.get('[data-testid=emailInput]');
//       cy.loginWithKeycloak(`user.${userGuid}@alcumus.com`, 'Alcdev01!');
//       myAccountPage.visit();
//       myAccountPage.getSaveProfileButton().should('be.disabled');
//       myAccountPage.getUpdatePasswordButton_Keycloak().should('be.disabled');
//     });

//     it('Should update profile', () => {
//       const userGuid = nanoid(10);

//       cy.registerWithKeycloak(userGuid);
//       cy.get('[data-testid=emailInput]');
//       cy.loginWithKeycloak(`user.${userGuid}@alcumus.com`, 'Alcdev01!');
//       myAccountPage.visit();
//       myAccountPage.inputFirstName('Alcumus');
//       myAccountPage.inputLastName('User');
//       myAccountPage.getSaveProfileButton().should('not.be.disabled');
//       myAccountPage.getSaveProfileButton().click();

//       myAccountPage.getSaveProfileButton().should('be.disabled');
//     });

//     it('Should update password', () => {
//       const userGuid = nanoid(10);

//       cy.registerWithKeycloak(userGuid);
//       cy.get('[data-testid=emailInput]');
//       cy.loginWithKeycloak(`user.${userGuid}@alcumus.com`, 'Alcdev01!');
//       myAccountPage.visit();

//       Update password
//       myAccountPage.inputCurrentPassword_Keycloak('Alcdev01!');
//       myAccountPage.inputNewPassword_Keycloak('Safety@123');
//       myAccountPage.inputConfirmPassword_Keycloak('Safety@123');
//       myAccountPage
//         .getUpdatePasswordButton_Keycloak()
//         .should('not.be.disabled');
//       myAccountPage.getUpdatePasswordButton_Keycloak().click();
//       myAccountPage.getUpdatePasswordButton_Keycloak().should('be.disabled');
//       portal.clickLogoutLink();
//     });
//   }
// // );
