import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { MerchantsState } from './types';
import { fetchMerchantsAction } from './actions';

export const initialState: MerchantsState = {
  merchants: {
    items: [],
  },
  fetchLoading: false,
};

export const slice = createSlice({
  name: 'merchants',
  initialState,
  reducers: {
    toggleFetchLoading(state: MerchantsState) {
      state.fetchLoading = !state.fetchLoading;
    },
  },
  extraReducers: {
    [fetchMerchantsAction.success.toString()]: (
      state: MerchantsState,
      { payload }: PayloadAction<any>,
    ) => {
      state.merchants = payload;
    },
  },
});

export const { actions: merchantsActions } = slice;
