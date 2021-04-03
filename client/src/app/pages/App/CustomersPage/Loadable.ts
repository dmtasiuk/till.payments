import { lazyLoad } from 'utils/loadable';

export const CustomersPage = lazyLoad(
  () => import('./index'),
  module => module.CustomersPage,
);
