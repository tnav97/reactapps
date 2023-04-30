export interface CreateECMSAccountDto {
  companyName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  enrollmentDate: string;
}

export interface ECMSAccountDetails {
  employeeProfileId: string;
  organizationId: string;
}
