import React from 'react';
import {render} from '@testing-library/react';
import HeaderSection from './HeaderSection';

describe('HeaderSection', () => {
  const defaultProps = {
    title: 'Header Section',
  };

  test(`renders HeaderSection without caption`, () => {
    const {getByTestId, queryByTestId} = render(
      <HeaderSection {...defaultProps} />
    );
    expect(getByTestId('title')).toHaveTextContent('Header Section');
    expect(queryByTestId('caption')).toBe(null);
  });

  test(`renders HeaderSection with caption when provided`, () => {
    const propsWithCaption = {...defaultProps, caption: 'Caption Section'};
    const {getByTestId} = render(<HeaderSection {...propsWithCaption} />);
    expect(getByTestId('title')).toHaveTextContent('Header Section');
    expect(getByTestId('caption')).toHaveTextContent('Caption Section');
  });
});
