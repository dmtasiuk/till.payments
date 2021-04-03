import * as React from 'react';
import { render } from '@testing-library/react';

import { AuthLayout } from '..';

describe('<AuthLayout  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<AuthLayout />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
