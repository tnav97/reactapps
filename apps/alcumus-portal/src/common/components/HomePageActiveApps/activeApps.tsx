import { Application, ApplicationCategory } from '../../types';

export interface ActiveApps {
  id: number;
  name: string;
  description: string;
  url: string;
  productCategories: ApplicationCategory[];
}

export const ACTIVE_APPS: Array<Application> = [
  {
    applicationId: 1,
    applicationLookupKey: 'safeContractor',
    applicationName: 'SafeContractor',
    applicationDescription: 'TBD',
    applicationUrl: 'https://safecontractor.theatworknetwork.com/login',
    applicationCategories: [
      {
        applicationCategoryId: 5,
        applicationCategoryLookupKey: 'supplyChainCompliance',
        applicationCategoryName: 'Supply Chain Compliance',
      },
    ],
  },
  {
    applicationId: 2,
    applicationLookupKey: 'fieldId',
    applicationName: 'FieldId',
    applicationDescription: 'TBD',
    applicationUrl: '/launch/safetyIntelligence',
    applicationCategories: [
      {
        applicationCategoryId: 1,
        applicationCategoryLookupKey: 'assetManagement',
        applicationCategoryName: 'Asset Management',
      },
    ],
  },
  {
    applicationId: 3,
    applicationLookupKey: 'safetyIntelligence',
    applicationName: 'Safety Intelligence',
    applicationDescription: 'TBD',
    applicationUrl: '/launch/safetyIntelligence',
    applicationCategories: [
      {
        applicationCategoryId: 4,
        applicationCategoryLookupKey: 'ehsq',
        applicationCategoryName: 'EHSQ',
      },
      {
        applicationCategoryId: 1,
        applicationCategoryLookupKey: 'assetManagement',
        applicationCategoryName: 'Asset Management',
      },
      {
        applicationCategoryId: 5,
        applicationCategoryLookupKey: 'businessIntelligenceAndAnalytics',
        applicationCategoryName: 'Business Intelligence & Analytics',
      },
    ],
  },
];
