import axios from 'axios';
import retrieveAuthToken from './retrieveAuthToken';
import {
  RegisterFormData,
  ValidationResult,
} from '../../client/redux/reducers/register-reducer';
import { CreateAccountRequestDto } from './createAccountRequestDto';
import { mapFormToAccountCreationRequestDto } from './mapFormToAccountCreationRequestDto';
import {
  getECMSApiUrl,
  getECMSCSDefaultSiteId,
  getECMSRequiredHeaders,
} from '../../lib/utils/getECMSApiUrl';
import { ApiResponseDto } from './apiResponseDto';

interface ApiSuccessResponse {
  isValid: boolean;
  validationIdentifier: string;
  validationErrors?: string[];
}

const getError = (modelState, modelKey, key) => {
  if (modelState[modelKey] && modelState[modelKey][0]) {
    return { [key]: modelState[modelKey][0] };
  }
};

const addAccountRequestDtoKey = 'addAccountRequestDto';
const organizationNameKey = `${addAccountRequestDtoKey}.Organization.OrganizationName`;
const emailAddressKey = `${addAccountRequestDtoKey}.EmailAddress`;
const passwordKey = `${addAccountRequestDtoKey}.Password`;
const firstNameKey = `${addAccountRequestDtoKey}.FirstName`;
const lastNameKey = `${addAccountRequestDtoKey}.LastName`;

export default async function validateAccountCreation(
  form: RegisterFormData
): Promise<ValidationResult> {
  const { accessToken } = await retrieveAuthToken();
  const config = {
    headers: getECMSRequiredHeaders(getECMSCSDefaultSiteId(), accessToken),
  };

  const requestDto: CreateAccountRequestDto =
    mapFormToAccountCreationRequestDto(form);

  const response = await axios
    .post(getECMSApiUrl('/accounts/validate'), requestDto, config)
    .catch((err) => {
      const modelState = err.response.data.modelState;
      if (err.response.status === 400 && modelState) {
        console.error('Error validating account', err);
        return {
          data: null,
          wasSuccessful: false,
          errors: {
            ...getError(modelState, organizationNameKey, 'companyName'),
            ...getError(modelState, emailAddressKey, 'email'),
            ...getError(modelState, passwordKey, 'password'),
            ...getError(modelState, firstNameKey, 'firstName'),
            ...getError(modelState, lastNameKey, 'lastName'),
          },
        };
      } else {
        throw err;
      }
    });

  const apiResponse = response as ApiResponseDto;

  if (response.data as ApiSuccessResponse) {
    return {
      isValid: true,
    };
  } else {
    return {
      isValid: apiResponse.wasSuccessful,
      ...(apiResponse.errors || {}),
    };
  }
}
