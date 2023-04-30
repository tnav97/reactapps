import { Constants, Utilities } from '@alcumus/core';
import { EnvVariables, RequestProductEmail } from '../constants';
import pug from 'pug';
import path from 'path';
import { formatISO } from 'date-fns';

interface EmailFormat {
  from: {
    email: string;
    name: string;
  };
  recipients: Array<string>;
  subject: string;
  text: string;
  html: string;
}

function createHtmlRequestEmail(
  tenantName: string,
  sendersName: string,
  useremail: string,
  requestDate: string,
  productCategory: string,
  location: string
): string {
  const cfn = pug.compileFile(
    path.resolve('./static/templates/send-request.pug')
  );
  const res = cfn({
    sendersName,
    tenantName,
    useremail,
    requestDate,
    productCategory,
    location,
  });
  return `${res}`;
}

export async function sendProductRequestEmail(emailBody) {
  const {
    sendersName,
    tenantName,
    productCategory,
    useremail,
    location = 'N/A',
  } = emailBody;
  const requestDate = formatISO(new Date(), { representation: 'date' });
  const environment = Utilities.ProcessEnv.getValue('NODE_ENV');
  const finalEmailFormat: EmailFormat = {
    from: {
      email: useremail,
      name: sendersName,
    },
    recipients: [RequestProductEmail],
    subject: `Customer has expressed interest in ${productCategory} on ${environment}`,
    text: `Customer ${useremail} has expressed interest in ${productCategory} on ${environment}`,
    html: createHtmlRequestEmail(
      tenantName,
      sendersName,
      useremail,
      requestDate,
      productCategory,
      location
    ),
  };
  const axiosInstance = Utilities.getServicesAxiosClient();
  await axiosInstance.post(
    Utilities.getApiUrl('/email/api/v1/emails/queue'),
    finalEmailFormat,
    {
      headers: {
        [Constants.RequestHeaders.ApiKey]:
          EnvVariables.ServicesApiKey as string,
      },
    }
  );
}

function createRequestDemoHtmlRequestEmail(
  tenantName: string,
  sendersName: string,
  useremail: string,
  requestDate: string,
  productName: string
): string {
  const cfn = pug.compileFile(
    path.resolve('./static/templates/send-product-request.pug')
  );
  const res = cfn({
    sendersName,
    tenantName,
    useremail,
    requestDate,
    productName,
  });
  return `${res}`;
}

export async function sendDemoRequestForExistingUser(emailBody) {
  const { sendersName, tenantName, productName, useremail, receiversemail } =
    emailBody;
  const requestDate = formatISO(new Date(), { representation: 'date' });
  const environment = Utilities.ProcessEnv.getValue('NODE_ENV');
  const finalEmailFormat: EmailFormat = {
    from: {
      email: 'noreply@alcumus.com',
      name: sendersName,
    },
    recipients: [receiversemail],
    subject: `Alcumus Portal: Product Demo Request`,
    text: `Alcumus Portal: Product Demo Request on ${environment}`,
    html: createRequestDemoHtmlRequestEmail(
      tenantName,
      sendersName,
      useremail,
      requestDate,
      productName
    ),
  };
  const axiosInstance = Utilities.getServicesAxiosClient();
  await axiosInstance.post(
    Utilities.getApiUrl('/email/api/v1/emails/queue'),
    finalEmailFormat,
    {
      headers: {
        [Constants.RequestHeaders.ApiKey]:
          EnvVariables.ServicesApiKey as string,
      },
    }
  );
}
