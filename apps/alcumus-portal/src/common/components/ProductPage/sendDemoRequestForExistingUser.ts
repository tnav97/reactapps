import axios, { AxiosError } from 'axios';

export async function sendDemoRequestForExistingUser({
  sendersName,
  tenantName,
  productName,
  useremail,
}) {
  const sendEmailDto = {
    sendersName,
    tenantName,
    productName,
    useremail,
  };
  try {
    await axios.post('/api/email/request-demo', sendEmailDto);
  } catch (e: any) {
    if (e.isAxiosError) {
      const err = e as AxiosError;

      if (err.response?.status === 400) {
        throw new Error("Couldn't send email");
      }
    }
    throw e;
  }
}
