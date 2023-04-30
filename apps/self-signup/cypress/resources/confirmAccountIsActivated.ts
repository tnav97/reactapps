import ECMSPage from '../pages/ecms/ecmsPage';
import { FakeUser } from './setUpFakeUser';
import { loginFromMailHogEmailLink } from './loginFromMailHogEmailLink';

export const confirmAccountIsActivated = (fakeUser: FakeUser) => {
  loginFromMailHogEmailLink(fakeUser, () => {
    new ECMSPage().confirmModulesArePresent();
  });
};
