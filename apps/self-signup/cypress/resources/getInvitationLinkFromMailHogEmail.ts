import { MailHogSearchTerms } from './emails/mailHogSearchTerms';

export const getInvitationLinkFromMailHogEmail = (
  searchTerm: MailHogSearchTerms,
  searchQuery: string,
  callback: (link: string) => void
) => {
  cy.downloadMailHogEmail(searchTerm, searchQuery, (emailMessage) => {
    cy.task('parseEmailToHtml', { base64String: emailMessage }).then(
      (res: string) => {
        const link = res.match(
          /https?:\/\/.*\/.*\?invitationCode=[A-z0-9-]*/g
        )[0];

        // eslint-disable-next-line no-unused-expressions
        expect(link).to.not.be.empty;
        callback(link);
      }
    );
  });
};
