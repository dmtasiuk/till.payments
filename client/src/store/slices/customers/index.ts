import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { CustomersState } from './types';
import { Customer } from '../../../../../_shared/types';
import { AxiosResponse } from 'axios';
import {
  createCustomerAction,
  fetchCustomersAction,
  updateCustomerAction,
} from './actions';

const perPage = localStorage.getItem('customers.perPage');

export const initialState: CustomersState = {
  fetchLoading: false,
  saveLoading: false,
  validationErrors: {},
  editingCustomer: undefined,
  searchQuery: undefined,
  pagination: {
    page: 1,
    limit: perPage ? parseInt(perPage) : 10,
  },
  customers: {
    items: [],
    meta: {
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
      itemCount: 0,
      itemsPerPage: 10,
    },
  },
};

export const slice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setSearchQuery(state, { payload }: PayloadAction<string | undefined>) {
      state.searchQuery = payload;
    },
    toggleFetchLoading(state) {
      state.fetchLoading = !state.fetchLoading;
    },
    toggleSaveLoading(state) {
      state.saveLoading = !state.saveLoading;
    },
    setValidationErrors(state, { payload }: PayloadAction<any>) {
      state.validationErrors = payload;
    },
    setEditingCustomer(
      state,
      { payload }: PayloadAction<Customer | undefined>,
    ) {
      state.editingCustomer = payload;
    },
    setPagination(
      state,
      { payload }: PayloadAction<{ page?: number; limit?: number }>,
    ) {
      state.pagination = {
        ...state.pagination,
        ...payload,
      };
      localStorage.setItem(
        'customers.perPage',
        (payload.limit ? payload.limit : state.pagination.limit).toString(),
      );
    },
    addCustomer(state, { payload }: PayloadAction<Customer>) {
      state.customers.items.pop();
      state.customers.items = [
        {
          ...payload,
          isNew: true,
        },
      ].concat(state.customers.items);
    },
  },
  extraReducers: {
    [fetchCustomersAction.success.toString()]: (
      state: CustomersState,
      { payload }: PayloadAction<any>,
    ) => {
      state.customers = payload;
    },
    [createCustomerAction.success.toString()]: (
      state: CustomersState,
      { payload }: PayloadAction<Customer>,
    ) => {
      state.customers.items.pop();
      state.customers.items = [payload].concat(state.customers.items);
    },
    [createCustomerAction.failure.toString()]: (
      state: CustomersState,
      { payload }: PayloadAction<AxiosResponse>,
    ) => {
      state.validationErrors = payload.data.errors ? payload.data.errors : {};
    },
    [updateCustomerAction.success.toString()]: (
      state: CustomersState,
      { payload }: PayloadAction<Customer>,
    ) => {
      const index = state.customers.items.findIndex(
        ({ id }) => id === payload.id,
      );
      state.customers.items[index] = payload;
    },
    [updateCustomerAction.failure.toString()]: (
      state: CustomersState,
      { payload }: PayloadAction<AxiosResponse>,
    ) => {
      state.validationErrors = payload.data.errors ? payload.data.errors : {};
    },
  },
});

export const { actions: customersActions } = slice;
