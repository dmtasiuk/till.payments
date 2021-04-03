import { lazyLoad } from 'utils/loadable';

export const AppLayout = lazyLoad(
  () => import('./index'),
  module => module.AppLayout,
);