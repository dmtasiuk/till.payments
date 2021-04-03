import { User } from '../../../../../_shared/types';

export interface AuthState {
  user: User | null;
  authError: string | null;
  authToken: string | undefined;
  authValidated: boolean;
  isLoading: boolean;
}

