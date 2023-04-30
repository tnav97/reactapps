import retrieveAuthToken from './server/models/retrieveAuthToken';

jest.mock('./server/models/retrieveAuthToken');
jest.mock('axios');

const mockedRetrieveAuthToken = retrieveAuthToken as jest.MockedFunction<
  typeof retrieveAuthToken
>;

beforeAll(() => {
  process.env.ECMS_WEB = 'https://web.ecms';
  process.env.ECMS_API = 'https://api.ecms';

  mockedRetrieveAuthToken.mockResolvedValue({
    accessToken: 'access_token',
    tokenType: 'token_type',
    expiresIn: 0,
    issued: '',
    expires: '',
  });
});
