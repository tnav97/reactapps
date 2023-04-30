import { CreateECMSAccountDto, ECMSAccountDetails } from './types';
import axios from 'axios';

export class EcmsApi {
  private apiUrl: string;
  private ecmsApiUsername: string;
  private ecmsApiPassword: string;
  private ecmsSiteId: string;

  constructor({
    apiUrl,
    ecmsApiUsername,
    ecmsApiPassword,
    ecmsSiteId,
  }: {
    apiUrl: string;
    ecmsApiUsername: string;
    ecmsApiPassword: string;
    ecmsSiteId: string;
  }) {
    this.apiUrl = apiUrl;
    this.ecmsApiUsername = ecmsApiUsername;
    this.ecmsApiPassword = ecmsApiPassword;
    this.ecmsSiteId = ecmsSiteId;
  }

  async getToken() {
    const { data } = await axios.post(
      `${this.apiUrl}/token`,
      new URLSearchParams({
        userName: this.ecmsApiUsername,
        password: this.ecmsApiPassword,
        grant_type: 'password',
      })
    );

    return data.access_token;
  }

  async createAccount({
    billingAccountId,
    ecmsCreateAccount,
  }: {
    billingAccountId: string;
    ecmsCreateAccount: CreateECMSAccountDto;
  }): Promise<ECMSAccountDetails> {
    const accessToken = await this.getToken();
    const {
      data: { data },
    } = await axios.post(
      `${this.apiUrl}/accounts`,
      {
        organization: {
          organizationName: ecmsCreateAccount.companyName,
        },
        password: ecmsCreateAccount.password,
        firstName: ecmsCreateAccount.firstName,
        lastName: ecmsCreateAccount.lastName,
        phoneNumber: '000-000-0000',
        emailAddress: ecmsCreateAccount.email,
        notes: 'Self serve sign-up',
        externalBillingAccountId: billingAccountId,
        enrollmentDate: ecmsCreateAccount.enrollmentDate,
      },
      {
        headers: {
          Authorization: `bearer ${accessToken}`,
          'x-version': '1',
          'x-site': this.ecmsSiteId,
        },
      }
    );

    return data;
  }

  async startFreeTrial(account: ECMSAccountDetails) {
    const accessToken = await this.getToken();

    const {
      data: { data },
    } = await axios.post(`${this.apiUrl}/accounts/startFreeTrial`, account, {
      headers: {
        Authorization: `bearer ${accessToken}`,
        'x-version': '1',
        'x-site': this.ecmsSiteId,
      },
    });

    return data;
  }

  async activateAccount(invitationCode: string) {
    const accessToken = await this.getToken();

    const {
      data: { data },
    } = await axios.post(
      `${this.apiUrl}/accounts/activate?invitationCode=${invitationCode}`,
      null,
      {
        headers: {
          Authorization: `bearer ${accessToken}`,
          'x-version': '1',
          'x-site': this.ecmsSiteId,
        },
      }
    );
    return data;
  }
}
