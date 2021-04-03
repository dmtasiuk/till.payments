import { createPromiseAction } from 'redux-saga-promise-actions';
import { Customer } from '../../../../../_shared/types';
import { AxiosResponse } from 'axios';

export const fetchCustomersAction = createPromiseAction(
  'customers/FETCH_CUSTOMER',
)<{ page?: number }, { items: Array<Customer> }, undefined>();

export const createCustomerAction = createPromiseAction(
  'customers/CREATE_CUSTOMER',
)<Customer, Customer, AxiosResponse<any>>();

export const updateCustomerAction = createPromiseAction(
  `customers/UPDATE_CUSTOMER`,
)<Customer, Customer, AxiosResponse<any>>();

export const deleteCustomerAction = createPromiseAction(
  `customers/DELETE_CUSTOMER`,
)<Customer, Customer, AxiosResponse<any>>();
