import faker from 'faker';
import dateFormat from 'date-fns/format';

export type FakeUser = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  enrollmentDate?: string;
};

export const setUpFakeUser = (enrollmentDate?: Date): FakeUser => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(16, false),
    email: faker.internet.email(undefined, undefined, 'example.com'),
    enrollmentDate: dateFormat(enrollmentDate ?? new Date(), 'MM/dd/yyyy'),
  };
};
