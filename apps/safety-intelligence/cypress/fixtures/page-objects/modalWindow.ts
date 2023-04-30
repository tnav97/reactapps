/// <reference types="cypress" />

export class ModalWindow {
  // Getters
  getFolderSelector() {
    return cy.get('[id="folderTreeSelector"]');
  }

  getCancelButton() {
    return cy.get('[data-testid="cancelButton"]');
  }

  getSubmitButton() {
    return cy.get('[data-testid="submitButton"]');
  }

  getFolder(title) {
    return cy.get('span[title="' + title + '"]');
  }

  getTitleSelector() {
    return cy.get('[data-testid="inputTitleBox"]');
  }

  getDatasourceChooser() {
    return cy.get('[id="data-source-chooser"]');
  }

  getFirstDropdownItem() {
    return cy.get('[id="data-source-chooser-dropdown"]>ul>li').eq(0);
  }

  getAcknowledgeCheckbox() {
    return cy.get('[data-testid="acknCheckbox"]');
  }

  getDeleteButton() {
    return cy.get('[data-testid="criticalButton"]');
  }

  // Actions
  clickFolderSelector() {
    this.getFolderSelector().click();
  }

  clickCancelButton() {
    this.getCancelButton().click();
  }

  clickSubmitButton() {
    this.getSubmitButton().click();
  }

  selectFolder(title) {
    this.getFolder(title).click();
  }

  clickFolderTitle() {
    this.getTitleSelector().click();
  }

  selectFirstExplore() {
    this.getDatasourceChooser().click();
    this.getFirstDropdownItem().click();
  }

  clickAcknowledgeCheckbox() {
    this.getAcknowledgeCheckbox().click();
  }

  clickDeleteButton() {
    this.getDeleteButton().click();
  }
}
