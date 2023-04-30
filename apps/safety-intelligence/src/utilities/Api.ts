import Axios from 'axios';
type GetProps = {
  url: string;
  headers?: Record<string, unknown>;
  data?: any;
  method?: string;
};
type PostProps<T> = {
  url: string;
  data?: T;
  headers?: Record<string, unknown>;
};
type DeleteProps = {
  url: string;
  headers?: Record<string, unknown>;
  method?: string;
};
type PatchProps<T> = {
  url: string;
  data?: T;
  headers?: Record<string, unknown>;
};

export const get = async <T>({ url, headers, data }: GetProps): Promise<T> => {
  const response = await Axios.get(url, {
    responseType: 'json',
    headers: headers as Record<string, string>,
    params: { ...data },
  });

  try {
    return response.data as T;
  } catch (e) {
    return response.data;
  }
};

export const post = async <T, D>({
  url,
  headers,
  data,
}: PostProps<D>): Promise<T> => {
  const response = await Axios.post(url, data, {
    responseType: 'json',
    headers: headers as Record<string, string>,
  });
  try {
    return response.data as T;
  } catch (e) {
    return response.data;
  }
};

export const del = async <T>({ url, headers }: DeleteProps): Promise<T> => {
  const response = await Axios.delete(url, {
    responseType: 'json',
    headers: headers as Record<string, string>,
  });
  try {
    return response.data as T;
  } catch (e) {
    return response.data;
  }
};

export const patch = async <T, D>({
  url,
  headers,
  data,
}: PatchProps<D>): Promise<T> => {
  const response = await Axios.patch(url, data, {
    responseType: 'json',
    headers: headers as Record<string, string>,
  });
  try {
    return response.data as T;
  } catch (e) {
    return response.data;
  }
};
