/// <reference types="cypress" />

import { FoldersPage } from './foldersPage';
import { NavBar } from './navBar';

export class PersonalFolderPage extends FoldersPage {
  // Getters
  // Actions
  visit() {
    const navBar = new NavBar();
    return navBar.clickPersonalFolderButton();
  }
}
