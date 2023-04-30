export interface RecommendedApplication {
  applicationLookupKey: string;
  applicationDescription: string[];
  imageUrl: string;
  applicationUrl?: string;
}

export const RECOMMENDED_APPLICATIONS = {
  SafeContractor: {
    applicationLookupKey: 'safeContractor',
    applicationDescription: [
      'Reduce the administrative burden of finding, prequalifying, and managing contractors',
      'Access thousands of contractors, assessed for compliance with legislation, and SSIP and PAS91',
    ],
    imageUrl: '/images/safe-contractor.png',
    applicationUrl: '/product/safe-contractor',
  },
  Sypol: {
    applicationLookupKey: 'sypol',
    applicationDescription: [
      'Over 750,000 COSHH risk assessments, written and validated by in-house scientists',
      'Quickly evaluate hazardous chemicals in context to how and where they will be used',
    ],
    imageUrl: '/images/sypol.png',
    applicationUrl: '/product/sypol',
  },
  ISOQAR: {
    applicationLookupKey: 'isoQar',
    applicationDescription: [
      'One of the most recognised and respected UKAS accredited certification bodies',
      'Full suite of flexible service offerings enable your ISO-certification journey',
    ],
    imageUrl: '/images/isoqar.png',
    applicationUrl: '/product/isoqar',
  },
  PSM: {
    applicationLookupKey: 'psm',
    applicationDescription: [
      'Expand your team without the costs with access to qualified HR or Health and Safety experts',
      '24/7 access to help across a range of topics, issues and legislation',
    ],
    imageUrl: '/images/psm.png',
    applicationUrl: '/product/people-and-safety-management',
  },
  ContractorCheck: {
    applicationLookupKey: 'contractorCheck',
    applicationDescription: [
      'Reduce the administrative burden of finding, prequalifying, and managing contractors',
      'Access to thousands of accredited contractors and prequalify against your specific compliance requirements',
    ],
    imageUrl: '/images/contractor-check.png',
    applicationUrl: '/product/contractorcheck',
  },
  SupplyChainCompliance: {
    applicationLookupKey: 'supplyChainCompliance',
    applicationDescription: [
      'Gain immediate visibility and streamline qualification management across all suppliers and contractors',
      'Manage risk through a trusted supplier score spanning ESG, financial and other factors',
    ],
    imageUrl: '/images/supply-chain-compliance.png',
    applicationUrl: '/product/supply-chain-compliance',
  },
};
