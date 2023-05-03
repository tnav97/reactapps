import { PlanDetail } from '../server/models/choosePlan';

export const CardSelected = {
  Yes: 0,
  No: 1,
  Not_Selected: 2,
};

export const responseTime = {
  TWO_DAYS: 0,
  FIVE_DAYS: 1,
  TEWENTY_DAYS: 2,
  Not_Selected: 3,
};

export const paymentOptions = {
  CARD: 1,
  BACS: 2,
};

export const responseTimeSelected = {
  TWO_DAYS: '2_DAYS',
  FIVE_DAYS: '5_DAYS',
  TEWENTY_DAYS: '20_DAYS',
};

export const responseDaysTime = {
  0: '2',
  1: '5',
  2: '20',
};
export const PaymentMethod = [
  {
    key: 1,
    value: 'BACS',
  },
  {
    key: 2,
    value: 'CARD',
  },
];

export const ChoosePlanSelected = {
  STANDARD: 0,
  EXPRESS: 1,
  ASSISTED: 2,
  PREMIER: 3,
};
export const ChoosePlanList: PlanDetail[] = [
  {
    id: 'PREMIER',
    image: '/icons/premier.png',
    label: 'Premier plan',
    context:
      'The fastest and easiest way to achieve accreditation with expert support from our team',
    benefits: 'Dedicated application assistant',
    callInfo: 'Contact within 1 working day',
    task: 'Assessment review within 2 working days',
    rate: 999,
  },
  {
    id: 'EXPRESS',
    image: '/icons/express.png',
    label: 'Express plan',
    context:
      'Perfect if you need a quick turnaround and are familiar with the required documentation',
    benefits: 'Induction and application review',
    callInfo: 'Contact within 2 working days',
    task: 'Assessment review within 2 working days',
    rate: 969,
  },
  {
    id: 'ASSISTED',
    image: '/icons/assisted.png',
    label: 'Assisted plan',
    context:
      'Select this plan if you’re new to health & safety paperwork or need guidance on what’s required ',
    benefits: 'Dedicated application assistant',
    callInfo: 'Contact within 5 working days',
    task: 'Assessment review within 5 working days',
    rate: 969,
  },
  {
    id: 'STANDARD',
    image: '/icons/standard.png',
    label: 'Standard plan',
    context:
      'Designed for those familiar and confident with legal, health and safety, and ethical requirements',
    benefits: 'Induction to assessment',
    callInfo: 'Contact within 7 working days',
    task: 'Assessment review within 20 working days',
    rate: 859,
  },
];

export const DefaultBrand = 'SAFECONTRACTOR';
export const DefaultPaymentCard = 'CARD';
export const DefaultSourcePortal = 'SC_DIGI_ACQ';
export const CountryCode = 'GBR';
export const CountryDataSets = 'gb-address';

export const PaymentCompany = 'HSBC';
export const PaymentSortCode = '40-16-13';
export const PaymentAccount = '61501739';
export const PaymentIBAN = 'GB66HBUK40161361501739';
export const PaymentSwift = 'HBUKGB4B';

export const registerRegex = /[A-Z]{2}\d{6}|[0-9]{8}/;
export const ukPhoneRegex = /^((\+44)|(0)) ?\d{4} ?\d{6}$/;

export enum County {
  United_Kingdom = 'UK',
  France = 'FX',
  Ierland = 'IE',
}

export const companyTypeSelected = {
  SOLE_TRADER_OR_PROPRIETOR: 0,
  PARTNERSHIP: 1,
  LIMITED_COMPANY: 2,
  LIMITED_LIABILITY_PARTNERSHIP: 3,
  CHARITY_OR_VOLUNTARY_SECTOR: 4,
  LOCAL_AUTHORITY_COLLEGE: 5,
  LOCAL_AUTHORITY: 6,
  UNIVERSITY: 7,
  COMPANY_LIMITED_BY_GUARANTEE: 8,
  REGISTERED_SOCIAL_LANDLORD: 9,
  PUBLIC_LIMITED_COMPANY: 10,
  CHARITY_AND_LIMITED_COMPANY: 11,
  OTHER_ORGANISATION: 12,
  NOT_SELECTED: 13,
};

export const companyTypeSelection = [
  {
    key: 0,
    value: 'SOLE_TRADER_OR_PROPRIETOR',
  },
  {
    key: 1,
    value: 'PARTNERSHIP',
  },
  {
    key: 2,
    value: 'LIMITED_COMPANY',
  },
  {
    key: 3,
    value: 'LIMITED_LIABILITY_PARTNERSHIP',
  },
  {
    key: 4,
    value: 'CHARITY_OR_VOLUNTARY_SECTOR',
  },
  {
    key: 5,
    value: 'LOCAL_AUTHORITY_COLLEGE',
  },
  {
    key: 6,
    value: 'LOCAL_AUTHORITY',
  },
  {
    key: 7,
    value: 'UNIVERSITY',
  },
  {
    key: 8,
    value: 'COMPANY_LIMITED_BY_GUARANTEE',
  },
  {
    key: 9,
    value: 'REGISTERED_SOCIAL_LANDLORD',
  },
  {
    key: 10,
    value: 'PUBLIC_LIMITED_COMPANY',
  },
  {
    key: 11,
    value: 'CHARITY_AND_LIMITED_COMPANY',
  },
];

export const allowedListRegistration = [
  'SOLE_TRADER_OR_PROPRIETOR',
  'PARTNERSHIP',
  'LIMITED_COMPANY',
  'LIMITED_LIABILITY_PARTNERSHIP',
  'CHARITY_OR_VOLUNTARY_SECTOR',
  'LOCAL_AUTHORITY_COLLEGE',
  'LOCAL_AUTHORITY',
  'UNIVERSITY',
  'COMPANY_LIMITED_BY_GUARANTEE',
  'REGISTERED_SOCIAL_LANDLORD',
  'PUBLIC_LIMITED_COMPANY',
  'CHARITY_AND_LIMITED_COMPANY',
];

export const allowedListRegistrationNumber = [
  'LIMITED_COMPANY',
  'LIMITED_LIABILITY_PARTNERSHIP',
  'REGISTERED_SOCIAL_LANDLORD',
  'PUBLIC_LIMITED_COMPANY',
  'CHARITY_AND_LIMITED_COMPANY',
];

export const allowedListCharity = [
  'CHARITY_OR_VOLUNTARY_SECTOR',
  'LOCAL_AUTHORITY_COLLEGE',
  'COMPANY_LIMITED_BY_GUARANTEE',
  'UNIVERSITY',
  'CHARITY_AND_LIMITED_COMPANY',
];

export const liveChatContainer = `
div#chat-widget-container{
  bottom:0px !important;
  right: 0px !important;
  max-height:100% !important;
  }
  iframe#chat-widget{
    margin: -16px !important;
    margin-left: 14px !important;
    height: 104.5% !important;
  }`;

export const mobileLiveChatContainerBox = `
  @media only screen and (max-width: 760px) {
    div#chat-widget-container {
      bottom:82px !important;
      right: 0px !important;
    }
} `;
