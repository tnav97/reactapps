export interface StartFreeTrialRequestDto {
  employeeProfileId: string;
  organizationId: string;
  notes?: string;
  purpose?: string;
  industry?: string;
  teamSize?: string;
  role?: string;
}
