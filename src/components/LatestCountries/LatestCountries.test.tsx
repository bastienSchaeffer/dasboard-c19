import React from 'react';
import {render} from '@testing-library/react';
import LatestCountries from './LatestCountries';

const defaultProps = {
  countries: [
    {
      active: 1160,
      cases: 81865,
      casesPerOneMillion: 57,
      country: 'China',
      critical: 176,
      deaths: 3335,
      deathsPerOneMillion: 2,
      flag: 'https://restcountries.eu/data/chn.svg',
      percentage: '0.00594',
      population: 1377422166,
      recovered: 77370,
      todayCases: 63,
      todayDeaths: 2,
    },
  ],
};
test(`renders LatestCountries`, () => {
  const {getByText} = render(<LatestCountries {...defaultProps} />);
  const latestCountriesElement = getByText(/United Kingdom/i);
  expect(latestCountriesElement).toBeInTheDocument();
});
