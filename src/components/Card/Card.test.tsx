import React from 'react';
import {render} from '@testing-library/react';
import Card from './Card';

test(`renders Card`, () => {
  const {getByText} = render(<Card />);
  const titleElement = getByText(/Title Card/i);
  expect(titleElement).toBeInTheDocument();
});
