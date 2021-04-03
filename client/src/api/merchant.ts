import httpClient from './http.client';
import { AxiosResponse } from 'axios';
import * as paths from './paths';

export const fetchMerchantsRequest = ({
  page = 1,
  limit = 10,
} = {}): Promise<AxiosResponse> => {
  return httpClient.get(paths.MERCHANTS_LIST, {
    params: { page, limit },
  });
};
