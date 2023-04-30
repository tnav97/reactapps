import axios, { AxiosError } from 'axios';

export async function sendRequestForProductCategory({
  sendersName,
  tenantName,
  productCategory,
  useremail,
  location,
}) {
  const sendEmailDto = {
    sendersName,
    tenantName,
    productCategory,
    useremail,
    location,
  };
  try {
    await axios.post('/api/email', sendEmailDto);
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
