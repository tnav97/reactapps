/// <reference types='cypress' />

export function VerifyRegistrationFields() {
  it('Registration number and Year', () => {
    cy.get('[data-testid=companyRegistrationNumberInput]').should('be.visible');
    cy.get('[data-testid=registrationYearInput]').should('be.visible');
  });
}

export function VerifyCharityFields() {
  it('Charity number and Year', () => {
    cy.get('[data-testid=companyCharityNumberInput]').should('be.visible');
    cy.get('[data-testid=charityIncorporationYearInput]').should('be.visible');
  });
}

export function GotoCompanyType() {
  it('go back to Organisation type page', () => {
    cy.visit('/companyType');
  });
}
