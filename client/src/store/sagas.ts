import { fork } from 'redux-saga/effects';
import { authSaga } from './slices/auth/saga';
import { merchantsSaga } from './slices/merchants/saga';
import { customersSaga } from './slices/customers/saga';

export default function* root() {
  yield fork(authSaga);
  yield fork(merchantsSaga);
  yield fork(customersSaga);
}
