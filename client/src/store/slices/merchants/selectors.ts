import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './index';

const selectSlice = (state: RootState) => state.merchants || initialState;

export const selectMerchants = createSelector([selectSlice], state => state);
