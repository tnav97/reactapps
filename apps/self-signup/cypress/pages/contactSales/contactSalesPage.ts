/// <reference types="cypress" />
export default class ContactSalesPage {
  clickContinueTrialButton() {
    cy.get('[data-testid="continueTrialButton"]').click();
  }

  private weReHappyToHearYouReInterestedInSubscribing =
    'We’re happy to hear you’re interested in subscribing!';

  private ourSalesTeamWillBeReachingOutToYouShortlyToScheduleAMeeting =
    'Our sales team will be reaching out to you shortly to schedule a meeting';

  confirmBodyContentIsPresent() {
    cy.containsAll([
      this.weReHappyToHearYouReInterestedInSubscribing,
      'extending your free trial',
      'We look forward to speaking with you soon!',
      this.ourSalesTeamWillBeReachingOutToYouShortlyToScheduleAMeeting,
      'Continue free trial',
    ]);
  }

  confirmTrialEndedContentIsPresent() {
    cy.containsAll([
      this.weReHappyToHearYouReInterestedInSubscribing,
      this.ourSalesTeamWillBeReachingOutToYouShortlyToScheduleAMeeting,
    ]);
  }
}
