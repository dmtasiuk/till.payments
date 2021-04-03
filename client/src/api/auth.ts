import httpClient from './http.client';
import { AxiosResponse } from 'axios';
import * as paths from './paths';

export const loginRequest = (payload: {
  email: string;
  password: string;
}): Promise<AxiosResponse> => {
  return httpClient.post(paths.AUTH_LOGIN, { ...payload });
};

export const validateRequest = (): Promise<AxiosResponse> => {
  return httpClient.get(paths.AUTH_VERIFY);
};
