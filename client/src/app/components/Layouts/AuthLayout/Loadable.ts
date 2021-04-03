/**
 *
 * Asynchronously loads the component for AuthLayout
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AuthLayout = lazyLoad(
  () => import('./index'),
  module => module.AuthLayout,
);
