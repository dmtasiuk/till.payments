import { combineReducers } from '@reduxjs/toolkit';
import { slice as authSlice } from './slices/auth';
import { slice as merchantsSlice } from './slices/merchants';
import { slice as customersSlice } from './slices/customers';

export function createReducer() {
  return combineReducers({
    auth: authSlice.reducer,
    customers: customersSlice.reducer,
    merchants: merchantsSlice.reducer,
  });
}
