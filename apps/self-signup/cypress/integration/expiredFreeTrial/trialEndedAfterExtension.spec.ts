import WelcomePage from '../../pages/signUp/welcomePage';
import VerifyAccount from '../../pages/signUp/verifyAccount';
import RegistrationPage from '../../pages/signUp/registrationPage';
import QuestionnairePage from '../../pages/signUp/questionnairePage';
import ExpiredFreeTrialPage from '../../pages/expiredFreeTrial/expiredFreeTrialPage';
import TrialExtendedPage from '../../pages/trialExtended/trialExtendedPage';
import { setUpFakeUser } from '../../resources/setUpFakeUser';
import { loginFromMailHogEmailLink } from '../../resources/loginFromMailHogEmailLink';
import { subDays } from 'date-fns';
import ContactSalesPage from '../../pages/contactSales/contactSalesPage';

describe('when trial has come to an end after an extension', () => {
  const registrationPage: RegistrationPage = new RegistrationPage();
  const welcomePage: WelcomePage = new WelcomePage();
  const verifyAccount: VerifyAccount = new VerifyAccount();
  const questionnairePage: QuestionnairePage = new QuestionnairePage();
  const expiredFreeTrialPage = new ExpiredFreeTrialPage();
  const trialExtendedPage = new TrialExtendedPage();
  const contactSalesPage = new ContactSalesPage();
  let fakeUser;

  beforeEach(() => {
    fakeUser = setUpFakeUser(subDays(new Date(), 28));
    registrationPage.visit();
    cy.deleteAllMailHogMessages();
  });

  it('should register account holder, extend free trial and witness trial has ended', () => {
    registrationPage.completeRegistration(fakeUser);
    welcomePage.completeWelcomePage(fakeUser);
    questionnairePage.completeQuestionnaire();
    verifyAccount.completeEmailVerification();

    loginFromMailHogEmailLink(fakeUser);
    expiredFreeTrialPage.confirmBodyContentIsPresent();
    expiredFreeTrialPage.clickExtendTrialButton();

    trialExtendedPage.confirmBodyContentIsPresent();
    trialExtendedPage.clickContinueTrialButton();

    expiredFreeTrialPage.confirmTrialEndedContentIsPresent();
    expiredFreeTrialPage.clickContactSalesButton();

    contactSalesPage.confirmTrialEndedContentIsPresent();
  });
});
