import RegistrationPage, { Splits } from '../../pages/signUp/registrationPage';
import WelcomePage from '../../pages/signUp/welcomePage';
import VerifyAccount from '../../pages/signUp/verifyAccount';
import QuestionnairePage from '../../pages/signUp/questionnairePage';
import { setUpFakeUser } from '../../resources/setUpFakeUser';
import { confirmAccountIsActivated } from '../../resources/confirmAccountIsActivated';

const PAGE_HEADING = 'Start your free 14-day trial today!';

describe('Test self sign-up flow - with steps', () => {
  const registrationPage: RegistrationPage = new RegistrationPage();
  const welcomePage: WelcomePage = new WelcomePage();
  const verifyAccount: VerifyAccount = new VerifyAccount();
  const questionnairePage: QuestionnairePage = new QuestionnairePage();
  let fakeUser;

  beforeEach(() => {
    fakeUser = setUpFakeUser();
    registrationPage.visit(Splits.withSteps);
    cy.deleteAllMailHogMessages();
  });

  it('completes the self signup flow', () => {
    cy.contains(PAGE_HEADING);
    registrationPage.setFirstName(fakeUser.firstName);
    registrationPage.setLastName(fakeUser.lastName);
    registrationPage.setCompanyName(new Date().getTime().toString());
    registrationPage.clickNextBtn();

    // Test moving between steps works
    cy.contains('Previous');
    registrationPage.clickPreviousBtn();

    cy.contains('Next');
    registrationPage.clickNextBtn();

    registrationPage.setEmail(fakeUser.email);
    registrationPage.setPassword(fakeUser.password);
    registrationPage.clickTerms();
    registrationPage.submitForm();

    cy.contains(`Hello ${fakeUser.firstName} ${fakeUser.lastName}`);
    welcomePage.clickSoundsGreat();

    cy.contains('What is your current job title?');
    questionnairePage.clickTile('HSE Specialist');
    questionnairePage.clickTile('Manufacturing');
    questionnairePage.clickTile('21 - 50');
    questionnairePage.clickTile('Empower my frontline workers');

    cy.contains("You're almost there!");
    verifyAccount.resendVerificationEmail();
    cy.contains('Verification email sent');

    confirmAccountIsActivated(fakeUser);
  });

  it('completes the self signup flow when using custom values', () => {
    cy.contains(PAGE_HEADING);
    registrationPage.setFirstName(fakeUser.firstName);
    registrationPage.setLastName(fakeUser.lastName);
    registrationPage.setCompanyName(new Date().getTime().toString());
    registrationPage.clickNextBtn();

    cy.contains('Previous');
    registrationPage.setEmail(fakeUser.email);
    registrationPage.setPassword(fakeUser.password);
    registrationPage.clickTerms();
    registrationPage.submitForm();

    cy.contains(`Hello ${fakeUser.firstName} ${fakeUser.lastName}`);
    welcomePage.clickSoundsGreat();

    cy.contains('What is your current job title?');
    questionnairePage.inputQuestionnaireStepCustomValue('Another Role');
    questionnairePage.inputQuestionnaireStepCustomValue('Another Industry');
    questionnairePage.inputQuestionnaireStepCustomValue('21 - 50');
    questionnairePage.inputQuestionnaireStepCustomValue(
      'Empower my frontline workers'
    );

    cy.contains("You're almost there!");
    verifyAccount.resendVerificationEmail();
    cy.contains('Verification email sent');

    confirmAccountIsActivated(fakeUser);
  });

  it('terms links are correct', () => {
    cy.contains(PAGE_HEADING);
    registrationPage.setFirstName('John');
    registrationPage.setLastName('Watson');
    registrationPage.setCompanyName(new Date().getTime().toString());
    registrationPage.clickNextBtn();

    registrationPage
      .getToSLink()
      .should('have.attr', 'href', 'https://www.ecompliance.com/legal/')
      .should('have.attr', 'target', '_blank');

    registrationPage
      .getPrivacyPolicyLink()
      .should('have.attr', 'href', 'https://www.ecompliance.com/privacy/')
      .should('have.attr', 'target', '_blank');
  });
});
