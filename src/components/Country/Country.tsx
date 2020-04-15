import React, {useState, useEffect} from 'react';
import {
  Grid,
  Card as CardMUI,
  CardHeader,
  Divider,
  CardContent,
} from '@material-ui/core';

import {LineChart, BarChart} from '../Charts';
import DiscreteSlider from '../Slider/Slider';
import useGraphColors from '../Charts/useGraphColors';
import {HeaderSection} from '../Header';

const Country = () => {
  const [selectedCountry] = useState('USA');
  const [selectedCountryCode] = useState('US');
  const [daysSelected, setDaysSelected] = React.useState<number[]>([20, 37]);
  const [timeline, setTimeline] = useState({});
  const {GraphColorsKey} = useGraphColors();

  useEffect(() => {
    fetch(`/timeline/${selectedCountryCode}`)
      .then((response) => response.json())
      .then((response) => setTimeline(response));
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <HeaderSection
          title={`Country: ${selectedCountry}`}
          caption={`Country data with range of days`}
        />
      </Grid>
      <Grid item xs={12}>
        <DiscreteSlider steps={81} setDaysSelected={setDaysSelected} />
      </Grid>
      <Grid item lg={6} md={6} xl={12} xs={12}>
        <CardMUI>
          <CardHeader title='Total Cases Evolution' />
          <Divider />
          <CardContent>
            <LineChart
              dataSet={timeline}
              daysSelected={daysSelected}
              config={[{key: 'confirmed', color: GraphColorsKey.primary}]}
            />
          </CardContent>
        </CardMUI>
      </Grid>
      <Grid item lg={6} md={6} xl={12} xs={12}>
        <CardMUI>
          <CardHeader title='Total Deaths And Recovery Evolution' />
          <Divider />
          <CardContent>
            <BarChart
              dataSet={timeline}
              daysSelected={daysSelected}
              config={[
                {key: 'deaths', color: GraphColorsKey.primary},
                {key: 'recovered', color: GraphColorsKey.recovered},
              ]}
            />
          </CardContent>
        </CardMUI>
      </Grid>
    </Grid>
  );
};

export default Country;
