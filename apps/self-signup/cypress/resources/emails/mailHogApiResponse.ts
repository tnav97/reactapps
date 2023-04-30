import { MailHogMessage } from './messages';

export interface MailHogApiResponse {
  total: number;
  start: number;
  count: number;
  items: MailHogMessage[];
}
