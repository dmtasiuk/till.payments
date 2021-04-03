import { AxiosResponse } from 'axios';
import { put, select, takeLatest } from 'redux-saga/effects';
import { customersActions } from '.';
import * as api from 'api/customer';
import { Customer } from '../../../../../_shared/types';
import { RootState } from '../../../types/RootState';
import {
  createCustomerAction,
  deleteCustomerAction,
  fetchCustomersAction,
  updateCustomerAction,
} from './actions';
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from 'redux-saga-promise-actions';

function* doFetchCustomers(
  action: ReturnType<typeof fetchCustomersAction.request>,
) {
  try {
    yield put(customersActions.toggleFetchLoading());
    const {
      customers: { pagination, searchQuery },
    }: RootState = yield select();
    const { data }: AxiosResponse = yield api.fetchCustomersRequest({
      page: pagination.page,
      limit: pagination.limit,
      search: searchQuery,
    });
    yield put(fetchCustomersAction.success(data));
    resolvePromiseAction(action, data);
  } catch (err) {
    yield put(fetchCustomersAction.failure());
    rejectPromiseAction(action, err);
  } finally {
    yield put(customersActions.toggleFetchLoading());
  }
}

function* doCreateCustomer(
  action: ReturnType<typeof createCustomerAction.request>,
) {
  try {
    yield put(customersActions.toggleSaveLoading());
    yield put(customersActions.setValidationErrors({}));

    const { data }: AxiosResponse<Customer> = yield api.createCustomerRequest(
      action.payload,
    );
    data.isNew = true;
    yield put(createCustomerAction.success(data));
    resolvePromiseAction(action, data);
  } catch (err) {
    console.log(err);
    yield put(createCustomerAction.failure(err.response));
    rejectPromiseAction(action, err.response);
  } finally {
    yield put(customersActions.toggleSaveLoading());
  }
}

function* doUpdateCustomer(
  action: ReturnType<typeof updateCustomerAction.request>,
) {
  try {
    yield put(customersActions.toggleSaveLoading());
    const { data }: AxiosResponse<Customer> = yield api.updateCustomerRequest(
      action.payload,
    );
    yield put(updateCustomerAction.success(data));
    yield put(customersActions.setValidationErrors({}));
    resolvePromiseAction(action, data);
  } catch (err) {
    console.error(err);
    yield put(updateCustomerAction.failure(err.response));
    rejectPromiseAction(action, err.response);
  } finally {
    yield put(customersActions.toggleSaveLoading());
  }
}

function* doCustomerDelete(
  action: ReturnType<typeof deleteCustomerAction.request>,
) {
  try {
    yield api.deleteCustomerRequest(action.payload);
    yield put(deleteCustomerAction.success(action.payload));
    yield put(fetchCustomersAction.request({}));
    resolvePromiseAction(action, action.payload);
  } catch (err) {
    console.error(err);
    yield put(deleteCustomerAction.failure(err.response));
    rejectPromiseAction(action, err.response);
  }
}

export function* customersSaga() {
  yield takeLatest(fetchCustomersAction.request, doFetchCustomers);
  yield takeLatest(createCustomerAction.request, doCreateCustomer);
  yield takeLatest(updateCustomerAction.request, doUpdateCustomer);
  yield takeLatest(deleteCustomerAction.request, doCustomerDelete);
}
