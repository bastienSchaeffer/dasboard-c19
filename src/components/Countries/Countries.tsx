import React, {useState} from 'react';
import {Grid} from '@material-ui/core';
import {LatestCountries} from '../LatestCountries';
import {HeaderSection} from '../Header';
import {Country} from '../../types';

type CountriesProps = {
  countries: Country[];
};

const Countries: React.FC<CountriesProps> = ({countries}) => {
  const [, setSelectedCountry] = useState('USA');
  const [, setSelectedCountryCode] = useState('US');

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <HeaderSection
          title={`Countries`}
          caption={`Filter data in array, select and check graphs`}
        />
      </Grid>
      <Grid item lg={12} md={12} xl={9} xs={12}>
        <LatestCountries
          countries={countries}
          setSelectedCountry={setSelectedCountry}
          setSelectedCountryCode={setSelectedCountryCode}
        />
      </Grid>
    </Grid>
  );
};

export default Countries;
