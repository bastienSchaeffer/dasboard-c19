import React from 'react';
import {render} from '@testing-library/react';
import LatestCountries from './LatestCountries';

const defaultProps = {
  countries: [
    {
      country: 'United Kingdom',
      date: '2020-4-7',
      confirmed: 500,
      deaths: 1000,
      recovered: 100,
    },
  ],
};
test(`renders LatestCountries`, () => {
  const {getByText} = render(<LatestCountries {...defaultProps} />);
  const latestCountriesElement = getByText(/United Kingdom/i);
  expect(latestCountriesElement).toBeInTheDocument();
});
