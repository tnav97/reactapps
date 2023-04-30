import { StartFreeTrialRequestDto } from './startFreeTrialRequestDto';
import { RegisterFormData } from '../../client/redux/reducers/register-reducer';

export const mapFormToStartFreeTrialRequestDto = (
  form: RegisterFormData
): StartFreeTrialRequestDto => {
  return {
    employeeProfileId: form.employeeProfileId as string,
    organizationId: form.organizationId as string,
    purpose: form.purpose,
    industry: form.industry,
    teamSize: form.teamSize,
    role: form.role,
  };
};
