import axios, { AxiosError } from 'axios';
import { UpdateUserRequest } from '../../types';

export class UpdateUserValidationError extends Error {
  private axiosError: Error;

  public errors: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
  } = {};

  constructor(err: AxiosError) {
    super('UpdateUserValidationError');
    this.axiosError = err;
    for (const error in err.response?.data.errors) {
      this.errors[error] = err.response?.data.errors[error].message;
    }
  }
}

export async function updateUser(updateUserDto: UpdateUserRequest) {
  try {
    await axios.patch('/api/users', updateUserDto);
  } catch (e: any) {
    if (e.isAxiosError) {
      const err = e as AxiosError;

      if (err.response?.status === 400 || err.response?.status === 409) {
        throw new UpdateUserValidationError(err);
      }
    }
    throw e;
  }
}
