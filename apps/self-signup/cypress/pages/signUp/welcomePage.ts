/// <reference types="cypress" />

import { FakeUser } from '../../resources/setUpFakeUser';

export default class WelcomePage {
  clickSoundsGreat() {
    cy.get('[data-testid="soundsGreat"]').click();
  }

  completeWelcomePage(fakeUser: FakeUser) {
    cy.contains(`Hello ${fakeUser.firstName} ${fakeUser.lastName}`);
    this.clickSoundsGreat();
  }
}
