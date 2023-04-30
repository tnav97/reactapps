// Typescript types definition
declare namespace Cypress {
  interface Chainable {
    login(username: any, password: any): Chainable<void>;
    loginWithKeycloak(username: string, password: string): Chainable<Element>;
    loginWithAzureAd(username: string, password: string): Chainable<Element>;
    registerWithKeycloak(
      userGuid: string,
      password: string
    ): Chainable<Element>;
    registerWithAzureAd(userGuid: string, password: string): Chainable<Element>;
    newUserLoginChangePassword(
      userGuid: string,
      password: string,
      newPassword: string
    ): Chainable<void>;
    CreateOrganization(): Chainable<void>;
    CreateStandardUser(): Chainable<void>;
    CreateSubscriptionForOrganization(): Chainable<void>;
    CreateAlcumusAdminUser(): Chainable<void>;
    CreateClientAdminUser(): Chainable<void>;
    get<S = any>(
      alias: string,
      options?: Partial<Loggable & Timeoutable & Withinable & Shadow>
    ): Chainable<S>;
  }
}
