import { createPromiseAction } from 'redux-saga-promise-actions';
import { User, Auth } from '../../../../../_shared/types';

export const validateUserAction = createPromiseAction('auth/VALIDATE_USER')<
  undefined,
  User,
  undefined
>();

export const loginAction = createPromiseAction('auth/LOGIN')<
  Auth,
  { user: User; authToken: string },
  any
>();
