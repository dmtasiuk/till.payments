export interface User {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
}

export interface Auth {
  email: string;
  password: string;
}

export interface Customer {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  isNew: boolean;
  merchantId: string;
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface Merchant {
  id: string;
  name: string;
  currency: string;
  isTrading: boolean;
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  ccLastFour: string;
  ccExpiry: string;
  ccToken: string;
  merchantId: string;
  customerId: string;
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface PaginationMeta {
  totalItems: number,
  itemCount: number,
  itemsPerPage: number,
  totalPages: number,
  currentPage: number
}
