import * as React from 'react';
import { render } from '@testing-library/react';

import { CustomersPage } from '..';

describe('<CustomersPage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<CustomersPage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
