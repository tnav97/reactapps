import { FakeUser } from './setUpFakeUser';
import { MailHogSearchTerms } from './emails/mailHogSearchTerms';
import { getInvitationLinkFromMailHogEmail } from './getInvitationLinkFromMailHogEmail';

export const loginFromMailHogEmailLink = (
  fakeUser: FakeUser,
  callback?: Function
) => {
  getInvitationLinkFromMailHogEmail(
    MailHogSearchTerms.to,
    fakeUser.email,
    (link) => {
      cy.visit(link);

      cy.loginToECMS({
        email: fakeUser.email,
        password: fakeUser.password,
      });
      if (callback) callback();
    }
  );
};
