import React from 'react';
import {render} from '@testing-library/react';
import CardToday from './CardToday';

test(`renders CardToday`, () => {
  const defaultProps = {
    continent: {
      name: 'World',
      totalCases: 100,
      newCases: 0,
      totalDeaths: 200,
      newDeaths: 0,
      totalRecovered: 300,
      activeCases: 400,
      seriousCritical: 0,
      casesPerOneMillion: 0,
      deathsPerOneMillion: 0,
      totalTests: 0,
      testsPerOneMillion: 0,
      continent: 'All',
    },
  };
  const {getByTestId} = render(<CardToday {...defaultProps} />);
  expect(getByTestId('total-cases')).toHaveTextContent('100');
  expect(getByTestId('total-deaths')).toHaveTextContent('200');
  expect(getByTestId('total-recovered')).toHaveTextContent('300');
  expect(getByTestId('active-cases')).toHaveTextContent('400');
});
