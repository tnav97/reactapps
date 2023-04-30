import { CreateAccountRequestDto } from './createAccountRequestDto';
import dateFormat from 'date-fns/format';
import { RegisterFormData } from '../../client/redux/reducers/register-reducer';

export const mapFormToAccountCreationRequestDto = (
  form: RegisterFormData,
  externalBillingAccountId?: string
): CreateAccountRequestDto => {
  return {
    organization: {
      organizationName: form.companyName,
    },
    password: form.password,
    firstName: form.firstName,
    lastName: form.lastName,
    phoneNumber: '000-000-0000',
    emailAddress: form.email || '', // Hotfix for ECMS side bug
    notes: 'Self serve sign-up',
    externalBillingAccountId: externalBillingAccountId || '',
    enrollmentDate: form.enrollmentDate ?? dateFormat(new Date(), 'MM/dd/yyyy'),
  };
};
