import { Price } from '../server/models/choosePlan';

export interface ChoosePlanRequest {
  scProductVersion?: string;
  company?: CompanyDetails;
}
export interface subsidiaries {
  id: string;
  label: string;
  price: Price;
  qty: number;
}
export interface RegisterRequest {
  referral?: ReferralCode;
  scProductVersion?: string;
  company?: CompanyDetails;
  productSelection?: ProductSelection;
}
export interface BasketRequest {
  scProductVersion?: string;
  company?: CompanyDetails;
  productSelection?: Brand[];
}

export interface ReferralCode {
  referralCode?: string;
}

export interface CompanyDetails {
  name?: string;
  address?: Address;
  billingAddress?: Address;
  contactPerson?: ContactPerson;
  noOfEmployees?: number;
  noOfSubsidiaries?: number;
  organisationType?: string;
  otherOrganisationType?: string;
  subsidiaries?: Subsidiaries[];
  registrationNumber?: string;
  registrationYear?: number;
  charityNumber?: string;
  charityYear?: number;
  website?: string;
  password?: string;
  preventExternalMarketing?: boolean;
}

export interface Address {
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  town?: string;
  county?: string;
  postCode?: string;
}

export interface ContactPerson {
  title?: string;
  firstName?: string;
  surname?: string;
  emailAddress?: string;
  telephoneNumber?: string;
  mobileNumber?: string;
}

export interface Subsidiaries {
  registrationNumber?: string;
  name?: string;
}
export interface ProductSelection {
  brands?: Brand[];
  total?: number;
}

export interface Brand {
  brand?: string;
  responseTime?: string;
  requireAssistance?: boolean;
  memberships?: string[];
  addOns?: string[];
  discountCodes?: string[];
  total?: number;
}

export interface AddressRequest {
  country_iso: string;
  components: Components;
  datasets: string[];
}

export interface Components {
  unspecified: string[];
}

export interface Option {
  name: string;
  value: string;
}
