import { AuthState } from 'store/slices/auth/types';
import { CustomersState } from 'store/slices/customers/types';
import { MerchantsState } from 'store/slices/merchants/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

export interface RootState {
  auth: AuthState;
  customers: CustomersState;
  merchants: MerchantsState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
