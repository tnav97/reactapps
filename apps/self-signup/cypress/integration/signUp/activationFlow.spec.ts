describe('Test self sign-up activation flow', () => {
  it('activates account and redirects', () => {
    cy.intercept('POST', '/api/activateAccount', {
      statusCode: 200,
      body: {
        redirectUrl: '/post-activation-redirect',
      },
    });
    cy.visit('/activate-account?invitationCode=my-invitation-code');
    cy.location('pathname').should('eq', '/post-activation-redirect');
  });
});
