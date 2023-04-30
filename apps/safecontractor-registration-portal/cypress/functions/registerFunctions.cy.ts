/// <reference types='cypress' />

export function EnterCreateAccount() {
  it('C17482 Register with valid inputs', () => {
    cy.fixture('users.json').then((newuser) => {
      cy.visit('/');
      cy.get('[data-testid=getStartedButton]').click();
      cy.get('[data-testid=firstNameInput]').clear().type(newuser.fname);
      cy.get('[data-testid=lastNameInput]').clear().type(newuser.lname);
      cy.get('[data-testid=email]').clear().type(newuser.email);
      cy.get('[data-testid=passwordInput]').clear().type(newuser.password);
      cy.get('[data-testid=termsOfPolicyInput]').check();
      cy.get('[data-testid=createAccount]').click();
    });
  });
}
export function EnterValidReferralCode() {
  it('Enter valid referral code', () => {
    const referralCode = 'ZI4782-572533-14';
    cy.get('[data-testid=startQuestions]').click();
    cy.get('[data-testid=referralYes]').click();
    cy.get('[data-testid=reffralCode]').clear().type(referralCode);
    cy.get('[data-testid=verifyButton]').click();
    cy.get('[data-testid=employee]').click();
  });
}

export function DefaultQuestionnaireValues() {
  it('Selecting Questionnaire values', () => {
    cy.get('[data-testid=startQuestions]').click();
    cy.get('[data-testid=referralNo]').click();
    cy.get('[data-testid=employee]').click();
    cy.get('[data-testid=fiftyOneEmployee]').click();
    cy.get('[data-testid=companyType]').click();
    cy.get('[data-testid=limitedCompany]').click();
    cy.get('[data-testid=SSIPQuestion]').click();
    cy.get('[data-testid=ssipNo]').click();
    cy.get('[data-testid=subsidiaryBusiness]').click();
    cy.get('[data-testid=subsidiaryNo]').click();
    cy.get('[data-testid=responseTime]').click();
  });
}

export function SSIPandSubsidiary() {
  it('SSIP selection', () => {
    cy.get('[data-testid=SSIPQuestion]').click();
    cy.get('[data-testid=ssipNo]').click();
    cy.get('[data-testid=subsidiaryBusiness]').click();
    cy.get('[data-testid=subsidiaryNo]').click();
    cy.get('[data-testid=responseTime]').click();
  });
}

export function Package() {
  it('Package selection', () => {
    cy.get('[data-testid=twentyWorkingDays]').click();
    cy.get('[data-testid=needSupport]').click();
    cy.get('[data-testid=doYouRequireSupportNo]').click();
  });
}
export function Pricing() {
  it('Choose Plan', () => {
    cy.get('[data-testid=choosePlan]').click();
    cy.intercept('/api/product').as('priceplan');
    cy.wait('@priceplan');
    cy.get('[data-testid=companyDetails]').click();
  });
}

export function DefaultCompanyDetails() {
  it('Enter default company details', () => {
    cy.fixture('defaultValues.json').then((company) => {
      cy.get('[data-testid=companyNameInput]')
        .clear()
        .type(company.companyName);
      cy.get('[data-testid=companyRegistrationNumberInput]')
        .clear()
        .type(company.registartionNumber);
      cy.get('[data-testid=registrationYearInput]')
        .clear()
        .type(company.registartionYear);
      cy.get('[data-testid=websiteInput]').clear().type(company.website);
      cy.get('[data-testid=toggleAddress]').click({ force: true });
      cy.get('[data-testid=addressLine1]').clear().type(company.address1);
      cy.get('[data-testid=addressLine2]').clear().type(company.address2);
      cy.get('[data-testid=city]').clear().type(company.city);
      cy.get('[data-testid=postCode]').clear().type(company.postcode);
      cy.get('[data-testid=landLineInput]').clear().type(company.landline);
      cy.get('[data-testid=mobilenumberInput]').clear().type(company.mobile);
    });
  });
}

export function CardPaymentSelection() {
  it('Selecting Payment methods ', () => {
    cy.get('[data-testid=paymentDetails]').click();
    cy.intercept('/api/basket').as('basket');
    cy.wait('@basket');
    cy.get('[data-testid=creditCardSelected]').click();
    cy.get('[data-testid=SafeContractorMemberDiscounts]').click();
    cy.get('[data-testid=agreeTerms]').click();
    cy.get('[data-testid=payment]').click();
  });
}

export function EnterCardDetailsMotoPayment() {
  it('Enter Card/Cardholder Details ', () => {
    cy.contains('Mastercard', { timeout: 10000 }).click();
    cy.get('#cardNoInput').type('4444333322221111');
    cy.get('#cardCVV').type('123');
    cy.get('[name="cardExp.month"]').select('12');
    cy.get('[name="cardExp.year"]').select('2023');
    cy.get('#name').type('test');
    cy.get('#address1').type('address1');
    cy.get('#town').type('London');
    cy.get('[name="country"]').select('India');
    cy.get('#email').type('test@email.com');
    cy.get('iframe', { timeout: 10000 }).then(($iframe) => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body)
        .find('.recaptcha-checkbox-border')
        .should('be.visible')
        .click();
    });
    cy.get('#makePayment').click();
    cy.get('input').click();
  });
}
