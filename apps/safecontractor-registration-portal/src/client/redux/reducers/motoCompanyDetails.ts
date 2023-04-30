import { TypeAndPayload } from './index';
import { Actions } from '../actions';

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
export interface MotoCompanyDetailsReducerStateType {
  companyDetails?: CompanyDetails;
}

export const defaultState: MotoCompanyDetailsReducerStateType = {
  companyDetails: undefined,
};

export default function motoCompanyDetailsReducer(
  state: MotoCompanyDetailsReducerStateType = defaultState,
  action: TypeAndPayload<MotoCompanyDetailsReducerStateType> = {
    type: undefined,
  }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.MotoCompanyDetails.companyDetails:
      return {
        ...state,
        companyDetails: payload?.companyDetails,
      };
    default:
      return state;
  }
}
