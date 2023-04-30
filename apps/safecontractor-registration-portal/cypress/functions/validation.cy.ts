/// <reference types='cypress' />

export function VerifyRegistrationFields() {
  it('Registration number and Year should be visible', () => {
    cy.get('[data-testid=companyRegistrationNumberInput]').should('be.visible');
    cy.get('[data-testid=registrationYearInput]').should('be.visible');
  });
}

export function VerifyCharityFields() {
  it('Charity number and Year should be visible', () => {
    cy.get('[data-testid=companyCharityNumberInput]').should('be.visible');
    cy.get('[data-testid=charityIncorporationYearInput]').should('be.visible');
  });
}

export function GotoCompanyType() {
  it('Go to Organisation type', () => {
    cy.get('[data-testid=startQuestions]').click();
    cy.get('[data-testid=referralNo]').click();
    cy.get('[data-testid=employee]').click();
    cy.get('[data-testid=twoHundredEmployee]').click();
    cy.get('[data-testid=companyType]').click();
  });
}
