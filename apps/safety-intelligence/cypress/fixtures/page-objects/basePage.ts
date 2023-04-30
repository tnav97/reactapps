/// <reference types="cypress" />
export class BasePage {
  // Getters
  getDashboardsTable() {
    return cy.get('[data-testid="dashboardTable"]');
  }

  getDashboardsTile() {
    return cy.get('[data-testid="dashboardTiles"]');
  }

  getResultsCount() {
    return cy.get('[data-testid="resultsCount"]');
  }

  getFolderTile() {
    return cy.get('[data-testid="folderTiles"]');
  }

  getLooksTable() {
    return cy.get('[data-testid="lookTable"]');
  }

  getLooksTile() {
    return cy.get('[data-testid="lookTiles"]');
  }

  getTableRowWithTitle(title) {
    return cy.contains('[data-testid="reportRow"]', title);
  }

  getTileWithTitle(title) {
    return cy.contains('[data-testid="reportTile"]', title);
  }

  getAllTiles() {
    return cy.get('[data-testid="reportTile"]');
  }

  getBreadcrumb() {
    return cy.get('[data-testid="breadcrumb"]');
  }

  getReportKebabMenu(title) {
    return cy.xpath(
      '//a[text()="' + title + '"]/../..//button[@data-testid="reportMenu"]'
    );
  }

  // Actions
  clickTileView() {
    return cy.get('[data-testid="tileView"]').click();
  }

  clickTableView() {
    return cy.get('[data-testid="tableView"]').click();
  }

  clickLooksButton() {
    return cy.get('[data-testid="lookToggle"]').click();
  }

  markFavoriteRowByTitle(title) {
    this.getTableRowWithTitle(title).find('.far.fa-heart').click();
  }

  unmarkFavoriteRowByTitle(title) {
    this.getTableRowWithTitle(title).find('.fas.fa-heart').click();
  }

  markFavoriteTileByTitle(title) {
    this.getTileWithTitle(title).find('.far.fa-heart').click();
  }

  unmarkFavoriteTileByTitle(title) {
    this.getTileWithTitle(title).find('.fas.fa-heart').click();
  }

  clickReportKebabMenu(title) {
    this.getReportKebabMenu(title).click();
  }
}
