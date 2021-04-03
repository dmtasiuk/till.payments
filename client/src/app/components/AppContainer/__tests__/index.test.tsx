import * as React from 'react';
import { render } from '@testing-library/react';

import { AppContainer } from '..';

describe('<AppContainer  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<AppContainer />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
