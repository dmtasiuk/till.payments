import * as React from 'react';
import { render } from '@testing-library/react';

import { MerchantsPage } from '..';

describe('<MerchantsPage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<MerchantsPage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
