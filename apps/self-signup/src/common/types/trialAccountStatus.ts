interface TrialAccountContactEmail {
  contactEmail: string;
}
interface TrialAccountBase extends TrialAccountContactEmail {
  hasBeenExtended: boolean;
  isActive: boolean;
}

interface TrialPeriodResponse extends TrialAccountBase {
  startDate: string;
  endDate: string;
  duration: number;
}
export interface TrialAccountResponse extends TrialAccountContactEmail {
  trialPeriod: TrialPeriodResponse;
  numberOfSalesCallsInitiated: number;
  [key: string]: any;
}
export interface TrialAccountStatus extends TrialAccountBase {
  expired: boolean;
  salesContacted: boolean;
}
