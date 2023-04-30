/// <reference types="cypress" />

export default class QuestionnairePage {
  clickRolesOptions() {
    cy.get('[data-testid=role').click();
  }

  clickIndustryOptions() {
    cy.get('[data-testid=industry').click();
  }

  selectRole(role: string) {
    cy.get(`[data-testid="dropdown-option-${role}"]`).click();
  }

  selectPurpose(purpose: string) {
    cy.get(`[data-testid="dropdown-option-${purpose}"]`).click();
  }

  selectTeamSize(size: string) {
    cy.get(`[data-testid="dropdown-option-${size}"]`).click();
  }

  selectIndustry(industry: string) {
    cy.get(`[data-testid="dropdown-option-${industry}"]`).click();
  }

  clickTile(title: string) {
    cy.get(`[data-testid="questionnaire-tile-${title}"]`).click();
  }

  clickTeamSizeOptions() {
    cy.get('[data-testid=teamSize]').click();
  }

  clickPurposeOptions() {
    cy.get('[data-testid=purpose').click();
  }

  startFreeTrial() {
    cy.get('[data-testid=start-trial-btn]').click();
  }

  inputCustomRoleValue(value: string) {
    cy.get('[data-testid=role-custom-value-input]').type(value);
    cy.get('[data-testid=role-submit-button]').click();
  }

  inputQuestionnaireStepCustomValue(value: string) {
    cy.get('[data-testid=custom-value-input]').type(value).type('{enter}');
  }

  inputCustomIndustryValue(value: string) {
    cy.get('[data-testid=industry-custom-value-input]').type(value);
    cy.get('[data-testid=industry-submit-button]').click();
  }

  completeQuestionnaire() {
    cy.contains('Tell us about yourself...');
    this.clickRolesOptions();
    this.selectRole('HSE Specialist');
    this.clickIndustryOptions();
    this.selectIndustry('Manufacturing');
    this.clickTeamSizeOptions();
    this.selectTeamSize('21 - 50');
    this.clickPurposeOptions();
    this.selectPurpose('Empower my frontline workers');
    this.startFreeTrial();
  }
}
