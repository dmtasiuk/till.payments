import * as React from 'react';
import { render } from '@testing-library/react';

import { MerchantSelector } from '..';

describe('<MerchantSelector  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<MerchantSelector />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
