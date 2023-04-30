import { validateField } from './validations';
import axios from 'axios';
import { reportBroswerHandledError } from '@alcumus/browser-web-utils';

jest.mock('axios');
jest.mock('@alcumus/browser-web-utils');

describe('validations tests', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const mockedReportReactHandledError =
    reportBroswerHandledError as jest.MockedFunction<
      typeof reportBroswerHandledError
    >;

  test('it calls /api/validateForm', async () => {
    await validateField('name', 'value');

    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith('/api/validateForm', {
      name: 'value',
    });
    expect(mockedReportReactHandledError).not.toBeCalled();
  });

  test('it calls reportReactHandledError', async () => {
    mockedAxios.post.mockRejectedValue({
      response: { status: 422, data: 'somevalue' },
    });
    await validateField('name', 'value');

    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith('/api/validateForm', {
      name: 'value',
    });
    expect(mockedReportReactHandledError).toBeCalledTimes(1);
  });
});
