import React from 'react';
import {render} from '@testing-library/react';
import Topbar from './Topbar';

test(`renders Topbar`, () => {
  const {getByText} = render(<Topbar />);
  const dashboardElement = getByText(/Dashboard/i);
  expect(dashboardElement).toBeInTheDocument();
});
