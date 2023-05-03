/// <reference types='cypress' />
import {
  Pricing,
  DefaultCompanyDetails,
  Package,
} from '../functions/registerFunctions.cy';

export function GoToEmployee() {
  it('Go to employee page', () => {
    cy.get('[data-testid=startQuestions]').click();
    cy.get('[data-testid=referralNo]').click();
    cy.get('[data-testid=employee]').click();
  });
}

export function GoToPaymentDetails() {
  it('Select Company type and Subsidiary', () => {
    cy.get('[data-testid=companyType]').click();
    cy.get('[data-testid=limitedCompany]').click();
    cy.get('[data-testid=subsidiaryBusiness]').click();
    cy.get('[data-testid=subsidiaryNo]').click();
    cy.get('[data-testid=responseTime]').click();
  });
  Package();
  Pricing();
  DefaultCompanyDetails();
}

export function GoToPaymentWithSubsidiary() {
  it('Select Company type and Subsidiary', () => {
    cy.fixture('defaultValues.json').then((company) => {
      cy.get('[data-testid=companyType]').click();
      cy.get('[data-testid=limitedCompany]').click();
      cy.get('[data-testid=subsidiaryBusiness]').click();
      cy.get('[data-testid=subsidiaryYes]').click();
      cy.get('[data-testid=companyName0]')
        .clear()
        .type(company.subsidiary.company1);
      cy.get('[data-testid=registrationNumber0]')
        .clear()
        .type(company.subsidiary.register1);
      cy.get('[data-testid=addAnotherButton]').click();
      cy.get('[data-testid=companyName1]')
        .clear()
        .type(company.subsidiary.company2);
      cy.get('[data-testid=registrationNumber1]')
        .clear()
        .type(company.subsidiary.register2);
    });
  });
  Pricing();
  DefaultCompanyDetails();
}

export function checkPrices(emp) {
  let productprice: number;
  let VAT: number;
  let totalPrice: number;
  const subvalue = 329;
  const percentage = 20;
  const vatCal = 100;

  it('Check price', () => {
    cy.intercept('/api/basket').as('basket');
    cy.get('[data-testid=paymentDetails]').click();
    cy.wait('@basket');
    cy.fixture('pricing.json').then((price) => {
      if (emp === 5) {
        productprice = price.pricingbandC1.Standard;
        VAT = (productprice / vatCal) * percentage;
        totalPrice = productprice + VAT;
        cy.get('[data-testid=planValue]').contains('£' + productprice);
        cy.get('[data-testid=vatValue]').contains(VAT.toFixed(2));
        cy.get('[data-testid=totalValue]').contains(totalPrice);
      } else if (emp === 100) {
        productprice = price.pricingbandF.Standard;
        VAT = (productprice / vatCal) * percentage;
        totalPrice = productprice + VAT;
        cy.get('[data-testid=planValue]').contains('£' + productprice);
        cy.get('[data-testid=vatValue]').contains(VAT.toFixed(2));
        cy.get('[data-testid=totalValue]').contains(totalPrice);
      } else if (emp === 1000) {
        productprice = price.pricingbandI.Standard;
        VAT = (productprice / vatCal) * percentage;
        totalPrice = productprice + VAT;
        cy.get('[data-testid=planValue]').contains('£' + productprice);
        cy.get('[data-testid=vatValue]').contains(VAT.toFixed(2));
        cy.get('[data-testid=totalValue]').contains(totalPrice);
      } else if (emp === 'sub') {
        productprice = price.pricingbandGroup.Premier;
        const subsidiary = 2 * subvalue;
        const subtotal = productprice + subsidiary;
        VAT = (subtotal / vatCal) * percentage;
        totalPrice = subtotal + VAT;
        cy.get('[data-testid=planValue]').contains('£' + productprice);
        cy.get('[data-testid=subtextValue]').contains('2x £329.00');
        cy.get('[data-testid=subtotalValue]').contains(subtotal);
        cy.get('[data-testid=vatValue]').contains(VAT.toFixed(2));
        cy.get('[data-testid=totalValue]').contains(totalPrice);
      }
    });
  });
}
