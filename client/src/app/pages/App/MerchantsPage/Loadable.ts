/**
 *
 * Asynchronously loads the component for MerchantsPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const MerchantsPage = lazyLoad(
  () => import('./index'),
  module => module.MerchantsPage,
);
