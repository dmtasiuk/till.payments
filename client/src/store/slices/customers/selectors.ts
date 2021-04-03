import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.customers || initialState;

export const selectCustomers = createSelector([selectSlice], state => state);
