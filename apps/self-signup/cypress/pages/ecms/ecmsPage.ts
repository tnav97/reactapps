/// <reference types="cypress" />

export default class ECMSPage {
  confirmModulesArePresent() {
    cy.containsAll([
      'Home',
      'My Stuff',
      'Action Items',
      'Inspections',
      'Incident/Hazard',
      'Meetings',
    ]);
  }
}
