import React from 'react';
import {render} from '@testing-library/react';
import Card from './Card';

test(`renders Card`, () => {
  const defaultProps = {
    title: 'Title card placeholder',
    numberValue: 5000,
  };
  const {getByText} = render(<Card {...defaultProps} />);
  const titleElement = getByText(/Title Card/i);
  expect(titleElement).toBeInTheDocument();
});
