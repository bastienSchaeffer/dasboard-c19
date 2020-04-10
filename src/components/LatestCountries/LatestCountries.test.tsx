import React from 'react';
import {render} from '@testing-library/react';
import LatestCountries from './LatestCountries';

const setSelectedCountry = jest.fn();
const setSelectedCountryCode = jest.fn();
const defaultProps = {
  countries: [
    {
      name: 'UK',
      totalCases: 78991,
      newCases: 0,
      totalDeaths: 9875,
      newDeaths: 0,
      totalRecovered: 344,
      activeCases: 68772,
      seriousCritical: 1559,
      casesPerOneMillion: 1164,
      deathsPerOneMillion: 145,
      totalTests: 334974,
      testsPerOneMillion: 4934,
      continent: 'Europe',
      flag: 'https://restcountries.eu/data/gbr.svg',
      latlng: [54, -2],
      percentage: '0.11636',
      countryCode: 'GB',
      population: 67886011,
    },
  ],
  setSelectedCountry,
  setSelectedCountryCode,
};
test(`renders LatestCountries`, () => {
  const {getByText} = render(<LatestCountries {...defaultProps} />);
  const latestCountriesElement = getByText(/UK/i);
  expect(latestCountriesElement).toBeInTheDocument();
});
