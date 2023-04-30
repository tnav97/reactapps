/// <reference types="cypress" />
type LoginDto = {
  email: string;
  password: string;
};

export default class Login {
  static toECMS({ email, password }: LoginDto) {
    cy.get('#loginWithoutEmailStatus', { timeout: 120000 }).then(($status) => {
      const val = $status.text();
      if (val === 'On') {
        cy.get('#loginForm .slider.round');
      }
    });

    cy.get('#emailAddress').type(email);
    cy.get('#password').type(password);
    cy.get("input[value='Login']").click();
  }
}
