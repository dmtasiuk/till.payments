import { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { loginAction, validateUserAction } from './actions';
import * as api from 'api/auth';
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from 'redux-saga-promise-actions';

export function* doValidateUserSaga(
  action: ReturnType<typeof validateUserAction.request>,
) {
  try {
    const { data }: AxiosResponse = yield api.validateRequest();
    // for demo
    if (sessionStorage.getItem('authValidated')) {
      yield put(validateUserAction.success(data));
      resolvePromiseAction(action, data);
    } else {
      yield put(validateUserAction.failure());
      rejectPromiseAction(action);
    }
  } catch (err) {
    yield put(validateUserAction.failure());
    rejectPromiseAction(action, err);
  }
}

export function* doLoginSaga(action: ReturnType<typeof loginAction.request>) {
  try {
    const { data, headers }: AxiosResponse = yield api.loginRequest(
      action.payload,
    );
    yield put(
      loginAction.success({
        user: data,
        authToken: headers['AuthToken'],
      }),
    );
    resolvePromiseAction(action, data);
    // for demo
    sessionStorage.setItem('authValidated', 'validated');
  } catch (err) {
    yield put(loginAction.failure(err));
    rejectPromiseAction(action, err);
  }
}

export function* authSaga() {
  yield takeLatest(loginAction.request, doLoginSaga);
  yield takeLatest(validateUserAction.request, doValidateUserSaga);
}
