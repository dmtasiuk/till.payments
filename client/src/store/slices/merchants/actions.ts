import { createPromiseAction } from 'redux-saga-promise-actions';
import { Merchant } from '../../../../../_shared/types';

export const fetchMerchantsAction = createPromiseAction(
  'merchants/FETCH_MERCHANTS',
)<{ page?: number }, { items: Merchant[] }, undefined>();
