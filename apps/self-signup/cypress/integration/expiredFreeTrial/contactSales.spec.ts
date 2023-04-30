import RegistrationPage from '../../pages/signUp/registrationPage';
import WelcomePage from '../../pages/signUp/welcomePage';
import VerifyAccount from '../../pages/signUp/verifyAccount';
import QuestionnairePage from '../../pages/signUp/questionnairePage';
import ExpiredFreeTrialPage from '../../pages/expiredFreeTrial/expiredFreeTrialPage';
import ContactSalesPage from '../../pages/contactSales/contactSalesPage';
import ECMSPage from '../../pages/ecms/ecmsPage';
import { setUpFakeUser } from '../../resources/setUpFakeUser';
import { loginFromMailHogEmailLink } from '../../resources/loginFromMailHogEmailLink';
import { subDays } from 'date-fns';

describe('when contacting sales', () => {
  const registrationPage = new RegistrationPage();
  const welcomePage = new WelcomePage();
  const verifyAccount = new VerifyAccount();
  const questionnairePage = new QuestionnairePage();
  const expiredFreeTrialPage = new ExpiredFreeTrialPage();
  const contactSalesPage = new ContactSalesPage();
  const ecmsPage = new ECMSPage();
  let fakeUser;

  beforeEach(() => {
    fakeUser = setUpFakeUser(subDays(new Date(), 18));
    registrationPage.visit();
    cy.deleteAllMailHogMessages();
  });

  it('should register account holder, extend free trial and contact sales', () => {
    registrationPage.completeRegistration(fakeUser);
    welcomePage.completeWelcomePage(fakeUser);
    questionnairePage.completeQuestionnaire();
    verifyAccount.completeEmailVerification();

    loginFromMailHogEmailLink(fakeUser);

    expiredFreeTrialPage.confirmBodyContentIsPresent();
    expiredFreeTrialPage.clickContactSalesButton();

    contactSalesPage.confirmBodyContentIsPresent();
    contactSalesPage.clickContinueTrialButton();

    ecmsPage.confirmModulesArePresent();
  });
});
