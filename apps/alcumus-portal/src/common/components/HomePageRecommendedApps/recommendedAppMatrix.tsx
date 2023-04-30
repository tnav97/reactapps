import {
  RECOMMENDED_APPLICATIONS,
  RecommendedApplication,
} from './recommendedApps';
import { Application } from '../../../common/types';

export function getRecommendedApplications(
  activeApp?: Application
): Array<RecommendedApplication> {
  switch (activeApp?.applicationLookupKey) {
    case 'safeContractor':
      return [RECOMMENDED_APPLICATIONS.ISOQAR];
    case 'supplyChainCompliance':
      return [RECOMMENDED_APPLICATIONS.ISOQAR];
    case 'ePermits':
      return [
        RECOMMENDED_APPLICATIONS.SafeContractor,
        RECOMMENDED_APPLICATIONS.ISOQAR,
      ];
    case 'sypol':
      return [RECOMMENDED_APPLICATIONS.ISOQAR];
    case 'isoQar':
      return [RECOMMENDED_APPLICATIONS.Sypol];
    default:
      return Object.values(RECOMMENDED_APPLICATIONS);
  }
}
