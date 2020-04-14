import React from 'react';
import {render} from '@testing-library/react';
import Card from './Card';

test(`renders Card`, () => {
  const defaultProps = {
    continent: {
      name: 'Europe',
      totalCases: 100,
      newCases: 0,
      totalDeaths: 200,
      newDeaths: 0,
      totalRecovered: 300,
      activeCases: 0,
      seriousCritical: 0,
      casesPerOneMillion: 0,
      deathsPerOneMillion: 0,
      totalTests: 0,
      testsPerOneMillion: 0,
      continent: 'Europe',
    },
  };
  const {getByTestId} = render(<Card {...defaultProps} />);
  expect(getByTestId('title')).toHaveTextContent('Europe');
  expect(getByTestId('total-cases')).toHaveTextContent('100');
  expect(getByTestId('total-deaths')).toHaveTextContent('200');
  expect(getByTestId('total-recovered')).toHaveTextContent('300');
});
