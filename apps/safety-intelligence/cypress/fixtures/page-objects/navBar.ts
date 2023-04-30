/// <reference types="cypress" />

export class NavBar {
  // Actions
  clickReportsButton() {
    return cy.get('[data-testid="drawerReports"]').click();
  }

  clickPersonalFolderButton() {
    return cy.get('[data-testid="drawerPersonalFolder"]').click();
  }

  clickFoldersButton() {
    return cy.get('[data-testid="drawerFolders"]').click();
  }

  clickRecentButton() {
    return cy.get('[data-testid="drawerRecent"]').click();
  }

  clickFavoriteButton() {
    return cy.get('[data-testid="drawerFavorite"]').click();
  }

  clickPopularButton() {
    return cy.get('[data-testid="drawerPopular"]').click();
  }

  clickUserMenu() {
    return cy.get('[data-testid="userMenuIcon"]').click();
  }

  clickLogout() {
    return cy.get('[data-testid="logoutLink"]').click();
  }
}
