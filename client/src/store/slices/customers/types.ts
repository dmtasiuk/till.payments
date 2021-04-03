import { Customer, PaginationMeta } from '../../../../../_shared/types';

export interface CustomersState {
  fetchLoading: boolean;
  saveLoading: boolean;
  validationErrors: {[key: string]: string[]};
  editingCustomer: Customer | undefined;
  searchQuery: string | undefined;
  pagination: {
    limit: number;
    page: number;
  };
  customers: {
    items: Customer[];
    meta: PaginationMeta;
  };
}
