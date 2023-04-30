import axios from 'axios';

export function getMockedAxios() {
  return axios as jest.Mocked<typeof axios>;
}
