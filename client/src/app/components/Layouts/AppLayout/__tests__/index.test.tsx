import * as React from 'react';
import { render } from '@testing-library/react';

import { AppLayout } from '..';

describe('<AppLayout  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<AppLayout />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
