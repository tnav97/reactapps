import { MailHogSearchTerms } from './mailHogSearchTerms';
import Axios, { AxiosRequestConfig } from 'axios';
import { MailHogApiResponse } from './mailHogApiResponse';

export class EmailHelper {
  static async downloadEmail(
    searchTerm: MailHogSearchTerms,
    searchQuery: string,
    callback: (htmlString: string) => void,
    requestConfig?: AxiosRequestConfig
  ): Promise<void> {
    const emailServer = `${Cypress.env('mailHogServer')}`;
    const mailHogSearchMessagesApiUrl = `${emailServer}/api/v2/search?kind=${searchTerm}&query=${searchQuery}`;

    const config = requestConfig ?? {
      headers: {
        Authorization: Cypress.env('mailHogAuthorization'),
      },
    };

    const { data } = await Axios.get(mailHogSearchMessagesApiUrl, config);
    const response = data as MailHogApiResponse;
    if (response.count) {
      const mailHogDownloadMessageApiUrl = `${emailServer}/api/v1/messages/${response.items[0].ID}/download`;
      const { data } = await Axios.get(mailHogDownloadMessageApiUrl, config);
      callback(data);
    }
  }

  static getMessages(
    searchTerm: MailHogSearchTerms,
    searchQuery: string,
    callback: (res: MailHogApiResponse) => void,
    requestConfig?: AxiosRequestConfig
  ) {
    const mailHogMessagesApiUrl = `${Cypress.env(
      'mailHogServer'
    )}/api/v2/search?kind=${searchTerm}&query=${searchQuery}`;
    const config = requestConfig ?? {
      headers: {
        Authorization: Cypress.env('mailHogAuthorization'),
      },
    };

    Axios.get(mailHogMessagesApiUrl, config).then((res) => {
      callback(res.data);
    });
  }

  static deleteAllMailHogMessages(): void {
    const mailHogMessagesApiUrl = `${Cypress.env(
      'mailHogServer'
    )}/api/v1/messages/`;

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: Cypress.env('mailHogAuthorization'),
      },
    };
    Axios.delete(mailHogMessagesApiUrl, config).then(() => null);
  }
}
