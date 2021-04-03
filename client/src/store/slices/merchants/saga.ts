import { put, takeLatest } from 'redux-saga/effects';
import * as api from 'api/merchant';

import { fetchMerchantsAction } from './actions';
import { AxiosResponse } from 'axios';
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from 'redux-saga-promise-actions';

function* doFetchMerchants(
  action: ReturnType<typeof fetchMerchantsAction.request>,
) {
  try {
    const { data }: AxiosResponse = yield api.fetchMerchantsRequest();
    yield put(fetchMerchantsAction.success(data));
    resolvePromiseAction(action, data);
  } catch (err) {
    console.error(err);
    yield put(fetchMerchantsAction.failure());
    rejectPromiseAction(action, err.response);
  }
}

export function* merchantsSaga() {
  yield takeLatest(fetchMerchantsAction.request, doFetchMerchants);
}
