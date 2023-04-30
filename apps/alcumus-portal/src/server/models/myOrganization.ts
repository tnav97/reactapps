import { Constants, Types, Utilities } from '@alcumus/core';
import {
  EditableOrganizationDetails,
  MyOrganizationAddress,
  MyOrganizationContact,
} from '../../common/types';
import { EnvVariables } from '../constants';

export async function getOrganizationDetails(organizationId: number) {
  const { data: baseOrganizationDetail } = await Utilities.sendAxiosGetRequest(
    Utilities.getApiUrl(`/tenants/api/v1/organizations/${organizationId}`),
    {
      [Constants.RequestHeaders.ApiKey]: EnvVariables.ServicesApiKey as string,
    }
  );

  const { data } = await Utilities.sendAxiosGetRequest(
    Utilities.getApiUrl(
      `/tenants/api/v1/organizations/${organizationId}/profile`
    ),
    {
      [Constants.RequestHeaders.ApiKey]: EnvVariables.ServicesApiKey as string,
    }
  );

  return { ...data, ...baseOrganizationDetail };
}

export async function patchOrganizationDetails(
  request: Types.Request,
  organizationId: number,
  newOrganizationDetails: EditableOrganizationDetails
) {
  const headers = {
    [Constants.RequestHeaders.ApiKey]: EnvVariables.ServicesApiKey as string,
  };

  const axiosInstance = Utilities.getAxiosInstance(request);
  axiosInstance.defaults.validateStatus = (status: number) => status < 500;

  const [
    updatedOrganizationDetailsResponse,
    updatedBaseOrganizationDetailResponse,
  ] = await Promise.all([
    axiosInstance.patch(
      Utilities.getApiUrl(
        `/tenants/api/v1/organizations/${organizationId}/profile`
      ),
      {
        defaultLanguageCode: newOrganizationDetails.defaultLanguageCode,
        organizationWebsite: newOrganizationDetails.organizationWebsite,
        organizationSizeDesignation:
          newOrganizationDetails.organizationSizeDesignation,
        // todo ARC-623: add industry type here
        // organizationIndustryType: newOrganizationDetails.organizationIndustryType
      },
      { headers }
    ),
    axiosInstance.patch(
      Utilities.getApiUrl(`/tenants/api/v1/organizations/${organizationId}`),
      {
        tenantName: newOrganizationDetails.tenantName,
      },
      { headers }
    ),
  ]);

  if (
    updatedOrganizationDetailsResponse.status >= 400 &&
    updatedOrganizationDetailsResponse.status < 500
  ) {
    throw new Types.LocalizedError(
      updatedOrganizationDetailsResponse.status,
      updatedOrganizationDetailsResponse.data.message
    );
  } else if (
    updatedBaseOrganizationDetailResponse.status >= 400 &&
    updatedBaseOrganizationDetailResponse.status < 500
  ) {
    throw new Types.LocalizedError(
      updatedBaseOrganizationDetailResponse.status,
      updatedBaseOrganizationDetailResponse.data.message
    );
  }
  const { data: updatedOrganizationDetails } =
    updatedOrganizationDetailsResponse;

  const { data: updatedBaseOrganizationDetail } =
    updatedBaseOrganizationDetailResponse;

  return { ...updatedOrganizationDetails, ...updatedBaseOrganizationDetail };
}

export async function patchOrganizationContact(
  request: Types.Request,
  organizationId: number,
  contactId: number,
  newOrganizationContact: MyOrganizationContact
) {
  const axiosInstance = Utilities.getAxiosInstance(request);
  axiosInstance.defaults.validateStatus = (status: number) => status < 500;

  const organizationContactResponse = await axiosInstance.patch(
    Utilities.getApiUrl(
      `/tenants/api/v1/organizations/${organizationId}/profile`
    ),
    {
      organizationContactId: contactId,
      organizationContact: {
        contactPhoneNumber: newOrganizationContact.contactPhoneNumber,
        contactEmailAddress: newOrganizationContact.contactEmailAddress,
        // todo ARC-743
        // contactFaxNumber: newOrganizationContact.contactFaxNumber,
      },
    },
    {
      headers: {
        [Constants.RequestHeaders.ApiKey]:
          EnvVariables.ServicesApiKey as string,
      },
    }
  );

  return hasLocalizableErrorResponse(organizationContactResponse);
}

export async function patchOrganizationAddress(
  request: Types.Request,
  organizationId: number,
  contactId: number,
  newOrganizationAddress: MyOrganizationAddress
) {
  const axiosInstance = Utilities.getAxiosInstance(request);
  axiosInstance.defaults.validateStatus = (status: number) => status < 500;
  const tenantProfileResponse = await axiosInstance.patch(
    Utilities.getApiUrl(
      `/tenants/api/v1/organizations/${organizationId}/profile`
    ),
    {
      organizationAddressId: contactId,
      organizationAddress: {
        addressLine1: newOrganizationAddress.addressLine1,
        city: newOrganizationAddress.city,
        provinceState: newOrganizationAddress.provinceState,
        countryCode: newOrganizationAddress.countryCode,
        postalZipCode: newOrganizationAddress.postalZipCode,
      },
    },
    {
      headers: {
        [Constants.RequestHeaders.ApiKey]:
          EnvVariables.ServicesApiKey as string,
      },
    }
  );

  return hasLocalizableErrorResponse(tenantProfileResponse);
}

export async function postOrganizationContact(
  request: Types.Request,
  organizationId: number,
  newOrganizationContact: MyOrganizationContact
) {
  const axiosInstance = Utilities.getAxiosInstance(request);
  axiosInstance.defaults.validateStatus = (status: number) => status < 500;

  const organizationContactResponse = await axiosInstance.post(
    Utilities.getApiUrl(
      `/tenants/api/v1/organizations/${organizationId}/contacts`
    ),
    {
      contactPhoneNumber: newOrganizationContact.contactPhoneNumber,
      contactEmailAddress: newOrganizationContact.contactEmailAddress,
      // todo ARC-743
      // contactFaxNumber: newOrganizationContact.contactFaxNumber,
      contactFirstName: '',
      contactLastName: '',
    },
    {
      headers: {
        [Constants.RequestHeaders.ApiKey]:
          EnvVariables.ServicesApiKey as string,
      },
    }
  );

  return hasLocalizableErrorResponse(organizationContactResponse);
}

export async function postOrganizationAddress(
  request: Types.Request,
  organizationId: number,
  newOrganizationAddress: MyOrganizationAddress
) {
  const axiosInstance = Utilities.getAxiosInstance(request);
  axiosInstance.defaults.validateStatus = (status: number) => status < 500;
  const organizationAddressResponse = await axiosInstance.post(
    Utilities.getApiUrl(
      `/tenants/api/v1/organizations/${organizationId}/addresses`
    ),
    {
      addressLine1: newOrganizationAddress.addressLine1,
      city: newOrganizationAddress.city,
      provinceState: newOrganizationAddress.provinceState,
      countryCode: newOrganizationAddress.countryCode,
      postalZipCode: newOrganizationAddress.postalZipCode,
    },
    {
      headers: {
        [Constants.RequestHeaders.ApiKey]:
          EnvVariables.ServicesApiKey as string,
      },
    }
  );

  return hasLocalizableErrorResponse(organizationAddressResponse);
}

function hasLocalizableErrorResponse(response) {
  if (response.status >= 400 && response.status < 500) {
    throw new Types.LocalizedError(response.status, response.data.message);
  }

  return response.data;
}
