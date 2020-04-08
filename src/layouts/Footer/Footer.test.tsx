import React from 'react';
import {render} from '@testing-library/react';
import Footer from './Footer';

test(`renders Footer`, () => {
  const {getByText} = render(<Footer />);
  const footerElement = getByText(/2020/i);
  expect(footerElement).toBeInTheDocument();
});
