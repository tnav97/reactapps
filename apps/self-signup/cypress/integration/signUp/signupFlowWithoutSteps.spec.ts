import RegistrationPage from '../../pages/signUp/registrationPage';
import WelcomePage from '../../pages/signUp/welcomePage';
import VerifyAccount from '../../pages/signUp/verifyAccount';
import QuestionnairePage from '../../pages/signUp/questionnairePage';
import { confirmAccountIsActivated } from '../../resources/confirmAccountIsActivated';
import { setUpFakeUser } from '../../resources/setUpFakeUser';

const PAGE_HEADING = 'Start your free 14-day trial today!';

describe('when signing up without steps', () => {
  const registrationPage: RegistrationPage = new RegistrationPage();
  const welcomePage: WelcomePage = new WelcomePage();
  const verifyAccount: VerifyAccount = new VerifyAccount();
  const questionnairePage: QuestionnairePage = new QuestionnairePage();
  let fakeUser;

  beforeEach(() => {
    fakeUser = setUpFakeUser();
    registrationPage.visit();
    cy.deleteAllMailHogMessages();
  });

  it('should register account holder and redirect to eCompliance', () => {
    registrationPage.completeRegistration(fakeUser);
    welcomePage.completeWelcomePage(fakeUser);
    questionnairePage.completeQuestionnaire();
    verifyAccount.completeEmailVerification();
  });

  it('should complete signup flow using custom values', () => {
    registrationPage.visit();
    cy.contains(PAGE_HEADING);
    registrationPage.setFirstName(fakeUser.firstName);
    registrationPage.setLastName(fakeUser.lastName);
    registrationPage.setCompanyName(new Date().getTime().toString());
    registrationPage.setEmail(fakeUser.email);
    registrationPage.setPassword(fakeUser.password);
    registrationPage.clickTerms();
    registrationPage.submitForm();

    cy.contains(`Hello ${fakeUser.firstName} ${fakeUser.lastName}`);
    welcomePage.clickSoundsGreat();

    cy.contains('Tell us about yourself...');
    questionnairePage.clickRolesOptions();
    questionnairePage.inputCustomRoleValue('Another Role');
    questionnairePage.clickIndustryOptions();
    questionnairePage.inputCustomIndustryValue('Another Industry');
    questionnairePage.clickTeamSizeOptions();
    questionnairePage.selectTeamSize('21 - 50');
    questionnairePage.clickPurposeOptions();
    questionnairePage.selectPurpose('Empower my frontline workers');
    questionnairePage.startFreeTrial();

    cy.contains("You're almost there!");
    verifyAccount.resendVerificationEmail();
    cy.contains('Verification email sent');

    confirmAccountIsActivated(fakeUser);
  });

  it('terms links are correct', () => {
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
