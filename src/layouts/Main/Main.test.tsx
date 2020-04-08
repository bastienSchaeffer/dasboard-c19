import React from 'react';
import {render} from '@testing-library/react';
import Main from './Main';

test(`renders Main`, () => {
  const {getByText} = render(<Main>Main</Main>);
  const mainElement = getByText(/Main/i);
  expect(mainElement).toBeInTheDocument();
});
