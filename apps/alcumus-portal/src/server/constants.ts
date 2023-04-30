import { Utilities } from '@alcumus/core';

/**
 * Environment variables needed for Alcumus Portal to function reliably
 */
export const EnvVariables = {
  SessionSecret: Utilities.ProcessEnv.getValue('ALCUMUS_PORTAL_SESSION_SECRET'),
  ServicesApiKey: Utilities.ProcessEnv.getValue('SERVICES_API_KEY'),
  WebPort: Number(
    Utilities.ProcessEnv.getValueOrDefault('ALCUMUS_PORTAL_WEB_PORT', '3001')
  ),
  SafetyIntelligenceWebHost: Utilities.ProcessEnv.getValue(
    'SAFETY_INTELLIGENCE_WEB_HOST'
  ),
  FieldIdWebHost: Utilities.ProcessEnv.getValueOrDefault(
    'FIELD_ID_WEB_HOST',
    'fieldid.com'
  ),
  SafeSupplierWebHost: Utilities.ProcessEnv.getValueOrDefault(
    'SAFE_SUPPLIER_WEB_HOST',
    'https://wfdev.theatworknetwork.com'
  ),
  SafeContractorWebHost: Utilities.ProcessEnv.getValueOrDefault(
    'SAFE_CONTRACTOR_WEB_HOST',
    'https://wfdev.theatworknetwork.com/'
  ),
  EpermitsWebHost: Utilities.ProcessEnv.getValueOrDefault(
    'EPERMITS_WEB_HOST',
    'https://www.alcumus.com/en-gb/epermits'
  ),
  ContractorCheckWebHost: Utilities.ProcessEnv.getValueOrDefault(
    'CONTRACTOR_CHECK_WEB_HOST',
    'https://www.alcumus.com/en-ca/contractor-accreditation/contractorcheck'
  ),
  EcomplianceWebHost: Utilities.ProcessEnv.getValueOrDefault(
    'ECOMPLIANCE_WEB_HOST',
    'https://my.ecompliance.com'
  ),
  IsoqarWebHost: Utilities.ProcessEnv.getValueOrDefault(
    'ISOQAR_WEB_HOST',
    'https://www.alcumus.com/en-gb/certification'
  ),
  PsmWebHost: Utilities.ProcessEnv.getValueOrDefault(
    'PSM_WEB_HOST',
    'https://www.alcumus.com/en-ca/advisory/health-and-safety-compliance'
  ),
  SupplyChainComplianceWebHost: Utilities.ProcessEnv.getValueOrDefault(
    'SUPPLY_CHAIN_COMPLIANCE_WEB_HOST',
    'https://test2.theatworknetwork.com/'
  ),
  SypolWebHost: Utilities.ProcessEnv.getValueOrDefault(
    'SYPOL_WEB_HOST',
    'https://www.alcumus.com/en-gb/coshh/'
  ),
  MangoWebHost: Utilities.ProcessEnv.getValueOrDefault(
    'MANGO_WEB_HOST',
    'https://www.mangolive.com/'
  ),
  EsgWebHost: Utilities.ProcessEnv.getValueOrDefault(
    'ESG_WEB_HOST',
    'https://www.alcumus.com/en-ca/environmental-social-governance/'
  ),
  AuthConsumerCallbacks: Utilities.ProcessEnv.getValueOrDefault(
    'AUTH_CONSUMER_CALLBACKS_WHITELIST',
    ''
  ),
  AllowLocalhostCallbacks: Utilities.ProcessEnv.isEnabled(
    'ALCUMUS_PORTAL_ALLOW_LOCAL_REDIRECT'
  ),
  FeatureToggles: {
    UseAzureAd:
      Utilities.ProcessEnv.getValueOrDefault(
        'FEATURE_TOGGLE_USE_AZURE_AD',
        'false'
      ) === 'true',
    DisableDirectPortalLogin:
      Utilities.ProcessEnv.getValueOrDefault(
        'FEATURE_TOGGLE_DISABLE_DIRECT_PORTAL_LOGIN',
        'false'
      ) === 'true',
  },
};

/**
 * Endpoint used by Alcumus Portal to establish session on Safety Intelligence
 */
export const SafetyIntelligenceAuthCallbackEndpoint = `${EnvVariables.SafetyIntelligenceWebHost}/api/auth/session`;
/**
 * Endpoint used by Alcumus Portal to establish session on FieldID
 */
export const FieldIdAuthCallbackEndpoint = `${EnvVariables.FieldIdWebHost}/fieldid/logon`;
/**
 * Endpoint used by Alcumus Portal to establish session on SafeSupplier
 */
export const SafeSupplierAuthCallbackEndpoint = `${EnvVariables.SafeSupplierWebHost}`;
/**
 * Endpoint used by Alcumus Portal to establish session on SafeContractor
 */
export const SafeContractorAuthCallbackEndpoint = `${EnvVariables.SafeContractorWebHost}`;
/**
 * Endpoint used by Alcumus Portal to establish session on Epermits. For now website url
 */
export const EpermitsAuthCallbackEndpoint = `${EnvVariables.EpermitsWebHost}`;
/**
 * Endpoint used by Alcumus Portal to establish session on Contractor Check. For now website url
 */
export const ContractorCheckAuthCallbackEndpoint = `${EnvVariables.ContractorCheckWebHost}`;
/**
 * Endpoint used by Alcumus Portal to establish session on eCompliance
 */
export const EComplianceAuthCallbackEndpoint = `${EnvVariables.EcomplianceWebHost}`;
/**
 * Endpoint used by Alcumus Portal to establish session on ISOQAR. For now website url
 */
export const IsoqarAuthCallbackEndpoint = `${EnvVariables.IsoqarWebHost}`;
/**
 * Endpoint used by Alcumus Portal to establish session on PSM. For now website url
 */
export const PsmAuthCallbackEndpoint = `${EnvVariables.PsmWebHost}`;
/**
 * Endpoint used by Alcumus Portal to establish session on Supply Chain Compliance. For now website url
 */
export const SupplyChainComplianceAuthCallbackEndpoint = `${EnvVariables.SupplyChainComplianceWebHost}`;
/**
 * Endpoint used by Alcumus Portal to establish session on Sypol. For now website url
 */
export const SypolAuthCallbackEndpoint = `${EnvVariables.SypolWebHost}`;
/**
 * Endpoint used by Alcumus Portal to establish session on ESG. For now website url
 */
export const EsgAuthCallbackEndpoint = `${EnvVariables.EsgWebHost}`;
/**
 * Endpoint used by Alcumus Portal to establish session on Mango. For now website url
 */
export const MangoAuthCallbackEndpoint = `${EnvVariables.MangoWebHost}`;
/**
 * Collection of authorized callback endpoints whitelisted to make requests to portal for session needs
 */
export const AuthConsumerCallbacksWhitelist: string[] =
  EnvVariables.AuthConsumerCallbacks
    ? (JSON.parse(EnvVariables.AuthConsumerCallbacks || '[]') as string[])
    : [
        SafetyIntelligenceAuthCallbackEndpoint,
        FieldIdAuthCallbackEndpoint,
        SypolAuthCallbackEndpoint,
        EsgAuthCallbackEndpoint,
        MangoAuthCallbackEndpoint,
        SupplyChainComplianceAuthCallbackEndpoint,
        SafeContractorAuthCallbackEndpoint,
        SafeSupplierAuthCallbackEndpoint,
        PsmAuthCallbackEndpoint,
        IsoqarAuthCallbackEndpoint,
        EComplianceAuthCallbackEndpoint,
        EpermitsAuthCallbackEndpoint,
        ContractorCheckAuthCallbackEndpoint,
      ];

/**
 * Collection of products actively supported by Alcumus Portal
 */
export const AlcumusProducts = [
  {
    productCode: 'safeSupplier',
    launchUrl: SafeSupplierAuthCallbackEndpoint,
  },
  {
    name: 'Safe Contractor',
    productCode: 'safeContractor',
    launchUrl: SafeContractorAuthCallbackEndpoint,
  },
  {
    name: 'ISOQAR',
    productCode: 'isoQar',
    launchUrl: IsoqarAuthCallbackEndpoint,
  },
  {
    name: 'People and Safety Management',
    productCode: 'psm',
    launchUrl: PsmAuthCallbackEndpoint,
  },
  {
    name: 'Supply Chain Compliance',
    productCode: 'supplyChainCompliance',
    launchUrl: SupplyChainComplianceAuthCallbackEndpoint,
  },
  {
    name: 'Sypol',
    productCode: 'sypol',
    launchUrl: SypolAuthCallbackEndpoint,
  },
];

export const RequestProductEmail = 'portalrequest@alcumus.com';
