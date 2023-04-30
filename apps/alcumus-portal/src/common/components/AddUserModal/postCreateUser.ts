import axios, { AxiosError } from 'axios';

export interface PostCreateUserParams {
  firstName?: string | null;
  lastName?: string | null;
  emailAddress: string;
  phoneNumber?: string | null;
  password?: string | null;
  role?: number;
  applicationLookupKeys?: string[];
  applicationIds?: number[];
  sendInvite?: boolean;
}

export class PostCreateUserValidationError extends Error {
  private axiosError: Error;

  public showMessage: boolean;

  public errors: {
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
    password?: string;
    confirmPassword?: string;
    phoneNumber?: string;
  } = {};

  constructor(err: AxiosError) {
    super(err.response?.data?.message || 'PostCreateUserValidationError');
    const status = err.response?.status;
    this.showMessage = Boolean(status);
    this.axiosError = err;
    for (const error in err.response?.data.errors) {
      this.errors[error] = err.response?.data.errors[error].message;
    }
  }
}

export async function postCreateUser(createUserDto: PostCreateUserParams) {
  try {
    await axios.post('/api/users', createUserDto);
  } catch (e: any) {
    if (e.isAxiosError) {
      const err = e as AxiosError;

      if (err.response?.status && err.response?.status < 500) {
        throw new PostCreateUserValidationError(err);
      }
    }
    throw e;
  }
}
