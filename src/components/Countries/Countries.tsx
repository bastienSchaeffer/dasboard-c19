import React, {useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {LatestCountries} from '../LatestCountries';
import {HeaderSection} from '../Header';

const Countries = () => {
  const [, setSelectedCountry] = useState('USA');
  const [, setSelectedCountryCode] = useState('US');
  const [latestCountries, setLatestCountries] = useState([]);

  useEffect(() => {
    fetch('/countries')
      .then((response) => response.json())
      .then((response) => setLatestCountries(response));
  }, []);

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
          countries={latestCountries}
          setSelectedCountry={setSelectedCountry}
          setSelectedCountryCode={setSelectedCountryCode}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(Countries);
