import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { AuthState } from './types';
import { loginAction, validateUserAction } from './actions';
import { User } from '../../../../../_shared/types';

export const initialState: AuthState = {
  user: null,
  authError: null,
  isLoading: false,
  authValidated: false,
  authToken: localStorage.getItem('authToken') || undefined,
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state: AuthState) {
      state.user = null;
      state.authToken = undefined;
      localStorage.removeItem('authToken');
    },
  },
  extraReducers: {
    [validateUserAction.success.toString()]: (
      state: AuthState,
      { payload }: PayloadAction<User>,
    ) => {
      state.user = payload;
      state.authValidated = true;
    },
    [validateUserAction.failure.toString()]: (state: AuthState) => {
      state.authValidated = true;
    },
    [loginAction.request.toString()]: (state: AuthState) => {
      state.isLoading = true;
      state.authError = null;
    },
    [loginAction.success.toString()]: (
      state: AuthState,
      { payload }: PayloadAction<{ user: User; authToken: string }>,
    ) => {
      state.isLoading = false;
      state.user = payload.user;
      state.authToken = payload.authToken;
      localStorage.setItem('authToken', payload.authToken);
    },
    [loginAction.failure.toString()]: (state: AuthState) => {
      state.isLoading = false;
      state.authError = 'Invalid email or password!';
    },
  },
});

export const { actions: authActions } = slice;
