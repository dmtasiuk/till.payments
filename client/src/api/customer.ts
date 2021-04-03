import httpClient from './http.client';
import { AxiosResponse } from 'axios';
import * as paths from './paths';
import { Customer } from '../../../_shared/types';
import { pathToRoute } from '../utils/routes';

export const fetchCustomersRequest = (
  {
    page = 1,
    limit = 10,
    search = null,
  }: {
    page?: number,
    limit?: number,
    search?: string | null
  } = {},
): Promise<AxiosResponse> => {
  return httpClient.get(paths.CUSTOMERS_LIST, {
    params: { page, limit, search },
  });
};

export const createCustomerRequest = (
  payload: Customer,
): Promise<AxiosResponse> => {
  return httpClient.post(paths.CUSTOMERS_CREATE, payload);
};

export const updateCustomerRequest = (
  payload: Customer,
): Promise<AxiosResponse> => {
  const url = pathToRoute(paths.CUSTOMERS_UPDATE, {
    id: payload.id,
  });
  return httpClient.put(url, payload);
};

export const deleteCustomerRequest = (
  payload: Customer,
): Promise<AxiosResponse> => {
  const url = pathToRoute(paths.CUSTOMERS_DELETE, {
    id: payload.id,
  });
  return httpClient.delete(url);
};
