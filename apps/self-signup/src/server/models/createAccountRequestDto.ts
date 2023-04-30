export interface CreateAccountRequestDto {
  organization: { organizationName?: string };
  password?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  emailAddress?: string;
  address?: string;
  city?: string;
  province?: string;
  country?: string;
  postalCode?: string;
  notes?: string;
  externalBillingAccountId?: string;
  enrollmentDate?: string;
}
