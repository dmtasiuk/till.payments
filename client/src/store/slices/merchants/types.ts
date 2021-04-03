import { Merchant } from '../../../../../_shared/types';

export interface MerchantsState {
  merchants: {
    items: Merchant[],
  }
  fetchLoading: boolean
}
