import { lazyLoad } from 'utils/loadable';

export const AppContainer = lazyLoad(
  () => import('./index'),
  module => module.AppContainer,
);
