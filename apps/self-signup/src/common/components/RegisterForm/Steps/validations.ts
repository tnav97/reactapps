import axios from 'axios';
import { TFunction } from 'i18next';
import memoize from 'promise-memoize';
import isEmail from 'validator/lib/isEmail';
import { reportBroswerHandledError } from '@alcumus/browser-web-utils';

// Api validation responses will be cached for 20 seconds
const API_RESPONSE_MEMOIZE_DURATION = 1000 * 20;

export const validateField = async (name, value) => {
  try {
    await axios.post('/api/validateForm', { [name]: value });
  } catch (e: any) {
    if (e.response.status === 422) {
      reportBroswerHandledError(e);
      const data = e.response.data;
      return data && data[name] && data[name];
    } else {
      console.error(e.response);
      return ' ';
    }
  }
};

export const validateEmailWithAPI = memoize(
  async (email) => {
    if (email) {
      return await validateField('email', email);
    } else {
      return ' ';
    }
  },
  {
    maxAge: API_RESPONSE_MEMOIZE_DURATION,
    maxErrorAge: API_RESPONSE_MEMOIZE_DURATION,
  }
);

export const validateCompanyNameWithAPI = memoize(
  async (companyName) => {
    if (companyName) {
      return await validateField('companyName', companyName);
    } else {
      return ' ';
    }
  },
  {
    maxAge: API_RESPONSE_MEMOIZE_DURATION,
    maxErrorAge: API_RESPONSE_MEMOIZE_DURATION,
  }
);

export const validateLength = (
  text: string,
  min: number,
  max: number,
  t: TFunction
) => {
  if (text && text.length < min) {
    return t('validations.lengthMin');
  } else if (text && text.length > max) {
    return t('validations.lengthMax');
  }
};

export const validateRequired = (text: string) => {
  if (!text || text.length === 0) {
    return ' ';
  }
};

export const validateEmailFormat = (email: string, t: TFunction) => {
  if (email && !isEmail(email)) {
    return t('validations.email');
  }
};

export const validateChecked = (value, t: TFunction) => {
  if (!value) {
    return t('validations.checked');
  }
};
