import WelcomePage from '../../pages/signUp/welcomePage';
import VerifyAccount from '../../pages/signUp/verifyAccount';
import RegistrationPage from '../../pages/signUp/registrationPage';
import QuestionnairePage from '../../pages/signUp/questionnairePage';
import ExpiredFreeTrialPage from '../../pages/expiredFreeTrial/expiredFreeTrialPage';
import TrialExtendedPage from '../../pages/trialExtended/trialExtendedPage';
import ECMSPage from '../../pages/ecms/ecmsPage';
import { setUpFakeUser } from '../../resources/setUpFakeUser';
import { loginFromMailHogEmailLink } from '../../resources/loginFromMailHogEmailLink';
import { subDays } from 'date-fns';

describe('when extending trial', () => {
  const registrationPage: RegistrationPage = new RegistrationPage();
  const welcomePage: WelcomePage = new WelcomePage();
  const verifyAccount: VerifyAccount = new VerifyAccount();
  const questionnairePage: QuestionnairePage = new QuestionnairePage();
  const expiredFreeTrialPage = new ExpiredFreeTrialPage();
  const trialExtendedPage = new TrialExtendedPage();
  const ecmsPage = new ECMSPage();
  let fakeUser;

  beforeEach(() => {
    fakeUser = setUpFakeUser(subDays(new Date(), 18));
    registrationPage.visit();
    cy.deleteAllMailHogMessages();
  });

  it('should register account holder and extend free trial', () => {
    registrationPage.completeRegistration(fakeUser);
    welcomePage.completeWelcomePage(fakeUser);
    questionnairePage.completeQuestionnaire();
    verifyAccount.completeEmailVerification();

    loginFromMailHogEmailLink(fakeUser, () => {
      expiredFreeTrialPage.confirmBodyContentIsPresent();
      expiredFreeTrialPage.clickExtendTrialButton();

      trialExtendedPage.confirmBodyContentIsPresent();
      trialExtendedPage.clickContinueTrialButton();

      ecmsPage.confirmModulesArePresent();
    });
  });
});
