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
    label: 'Premier Plan',
    context:
      'The fastest way to achieve accreditation with expert support from our team',
    benefits: 'Dedicated application assistant',
    callInfo: 'Contact within 1 working day',
    task: 'Assessment review within 2 working days',
    rate: 999,
  },
  {
    id: 'EXPRESS',
    image: '/icons/express.png',
    label: 'Express Plan',
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
    label: 'Assisted Plan',
    context:
      'Select this Plan if you’re new to health & safety paperwork or need guidance on what’s required ',
    benefits: 'Dedicated application assistant',
    callInfo: 'Contact within 5 working days',
    task: 'Assessment review within 5 working days',
    rate: 969,
  },
  {
    id: 'STANDARD',
    image: '/icons/standard.png',
    label: 'Standard Plan',
    context:
      'Designed for those familiar and confident with legal, health and safety, and ethical requirements',
    benefits: 'Induction to assessment',
    callInfo: 'Contact within 7 working days',
    task: 'Assessment review within 20 working days',
    rate: 859,
  },
];

export const termsServicePackageData = [
  {
    package: 'Premier',
    description:
      'The Premier Package is the ultimate in dedicated support, with a technical expert assigned to take a contractor through the accreditation process. This is the fastest and the most supported way to gain accreditation in the market. This package provides contact within one working day, and a response to the submitted health and safety assessment within two working days.',
  },
  {
    package: 'Assisted',
    description:
      'The Assisted Package is ideal for contractors who would like dedicated personalised assistance through the accreditation process. This package shall provide contact within five working days, and a response to the submitted health and safety assessment within another five working days.',
  },
  {
    package: 'Express',
    description:
      'The Express Package is ideal for contractors who need a quick turn-around on accreditation. This package shall provide contact within two working days, and a response to the submitted health and safety assessment within two working days.',
  },
  {
    package: 'Standard',
    description:
      'The original and the best since 1999 this industry leading Standard Package provides support through the accreditation process for contractors familiar with health and safety requirements. This package shall provide contact within seven working days and a response to the submitted health and safety assessment within twenty working days.',
  },
];

export const DefaultCharityYear = 1000;
export const DefaultCharityNumber = '00000000';

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

export const DevRedirectionUrl =
  'https://sc2-dev-app-01.alcumus.net/AccreditationWeb/login';
export const QaRedirectionUrl =
  'https://sc2-test-app-01.alcumus.net/AccreditationWeb/login';
export const StagingRedirectionUrl =
  'https://sc2-uat-app-01.alcumus.net/AccreditationWeb/login';
export const ProdRedirectionUrl =
  'https://apps.alcumusgroup.net/AccreditationWeb/';

export const registerRegex = /[A-Z]{2}\d{6}|[0-9]{8}/;
export const ukPhoneRegex = /^((\+44)|(0)) ?\d{4} ?\d{6}$/;

export enum County {
  United_Kingdom = 'UK',
  France = 'FX',
  Ierland = 'IE',
}
export const SSIPKeyValue = {
  name1: 'Acclaim Accreditation',
  name2: 'Achilles BuildingConfidence',
  name3: 'ACM',
  name4: 'ACS Registrars',
  name5: 'Advanced Certification',
  name6: 'AJA Registrars',
  name7: 'Alcumus ISOQAR',
};
export const SSIP_CLIENT_ARRAY = [
  { id: 54, name: 'Acclaim Accreditation' },
  { id: 55, name: 'Achilles BuildingConfidence' },
  { id: 56, name: 'ACM' },
  { id: 57, name: 'ACS Registrars' },
  { id: 58, name: 'Advanced Certification' },
  { id: 59, name: 'AJA Registrars' },
  { id: 60, name: 'Alcumus ISOQAR' },
  { id: 61, name: 'Alcumus SafeContractor' },
  { id: 62, name: 'Altius VA CDM Comply' },
  { id: 63, name: 'ARB Approved Contractor Scheme' },
  {
    id: 64,
    name: 'Association for Project Safety (APS) - Corporate Membership',
  },
  { id: 65, name: 'Avetta' },
  { id: 66, name: 'British Constructional Steelwork Association (BCSA)' },
  { id: 67, name: 'British Standards Institution (BSI)' },
  { id: 68, name: 'Bureau Veritas Certification UK' },
  { id: 69, name: 'Capabiliteez Ltd PQS - Pre Qualification Scheme' },
  { id: 70, name: 'Certification Europe (UK) Ltd' },
  { id: 71, name: 'Construction Federation Services (Safe T Cert)' },
  { id: 72, name: 'Contractors Health and Safety Assessment Scheme (CHAS)' },
  { id: 73, name: 'CQMS Safety-Scheme' },
  { id: 74, name: 'D W Health & Safety Contractor Competency Scheme' },
  { id: 75, name: 'DAS Certification' },
  { id: 76, name: 'DNV Certification' },
  { id: 77, name: 'DQS UK Ltd' },
  { id: 78, name: 'Eurosafe CDM Competent' },
  { id: 79, name: 'Exor H&S Qualifed' },
  { id: 80, name: 'Exova BM TRADA Certification' },
  { id: 81, name: 'FASET Membership Audit' },
  { id: 82, name: 'Greenlight Safety Consultancy' },
  { id: 83, name: 'IMS International' },
  { id: 84, name: 'International Powered Access Federation (IPAF)' },
  { id: 85, name: 'Intertek Certification (formally Moody International)' },
  { id: 86, name: "Laing O'Rouke - LOR Contractors HSE Assessment Scheme" },
  { id: 87, name: 'LRQA SSIP Registration Scheme' },
  { id: 88, name: 'MSL Safepartner' },
  { id: 89, name: 'National Access & Scaffolding Confederation (NASC)' },
  { id: 90, name: 'National Association of Shopfitters (NAS)' },
  { id: 91, name: 'National House-Building Council (NHBC) Safemark' },
  { id: 92, name: 'NQA' },
  { id: 93, name: 'NSAI' },
  { id: 94, name: 'Ocean Certification' },
  { id: 95, name: 'Principal Approved Supplier Scheme - PASS' },
  { id: 96, name: 'Safety Management Advisory Services (SMAS)' },
  { id: 97, name: 'SGS Systems & Services Certification Services' },
  { id: 98, name: 'SOCOTEC Certification United Kingdom' },
  { id: 106, name: 'SSIP Scheme' },
  { id: 99, name: 'Steel Construction Certification Scheme' },
  { id: 100, name: 'System Certification Services Ltd' },
  { id: 101, name: 'The BESA Health & Safety Assessment' },
  { id: 102, name: 'The British Assessment Bureau' },
  { id: 103, name: 'The Health and Safety Assessment Scheme (HSAS)' },
  { id: 104, name: 'TÜV UK Ltd' },
  { id: 105, name: 'United Registar Systems (URS)' },
];
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
