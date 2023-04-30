import Axios from 'axios';
import { MailHogApiResponse, MailHogSearchTerms } from './types';
import mailparser from 'mailparser';

export class MailhogApi {
  // eslint-disable-next-line no-useless-constructor
  constructor(private mailhogUrl: string, private authHeader?: string) {}

  private getConfig() {
    return {
      headers: {
        Authorization: this.authHeader || '',
      },
    };
  }

  private getUrl(path: string) {
    return `${this.mailhogUrl}${path}`;
  }

  async parseEmail(rawEmail: string): Promise<string> {
    return (await mailparser.simpleParser(rawEmail)).html || '';
  }

  async getMessageFor(emailAddress: string): Promise<string> {
    const { data } = await Axios.get(
      this.getUrl(
        `/api/v2/search?kind=${MailHogSearchTerms.to}&query=${emailAddress}`
      ),
      this.getConfig()
    );
    const response = data as MailHogApiResponse;

    if (response.count) {
      const { data } = await Axios.get(
        this.getUrl(`/api/v1/messages/${response.items[0].ID}/download`),
        this.getConfig()
      );
      return this.parseEmail(data);
    } else {
      throw new Error('No emails matched the search');
    }
  }

  async deleteAllMessages() {
    return Axios.delete(this.getUrl('/api/v1/messages/'), this.getConfig());
  }
}
