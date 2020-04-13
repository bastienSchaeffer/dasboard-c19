import React, {useState, useEffect} from 'react';
import {MainLayout} from '../layouts';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Helmet} from 'react-helmet';

import {Grid, Typography} from '@material-ui/core';
import {
  Card as CardMUI,
  CardHeader,
  Divider,
  CardContent,
} from '@material-ui/core';
import {Card, CardToday} from '../components/Card';
import {LatestCountries} from '../components/LatestCountries';
import {LineChart, BarChart, PieChart} from '../components/Charts';
import DiscreteSlider from '../components/Slider/Slider';
import {Continent} from '../types';
import useGraphColors from '../components/Charts/useGraphColors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.background.default,
      // background: 'linear-gradient(180deg, #e0f1ff 30%, #05A9F4 90%)',
      padding: theme.spacing(6),
      height: '100%',
    },
  })
);
// Property 'name' does not exist on type 'never'.ts(2339)
const IndexPage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [selectedCountryCode, setSelectedCountryCode] = useState('US');
  const [world, setWorld] = React.useState<Continent>();
  const [continents, setContinents] = useState<Continent[]>([]);
  const [healthRedis, setHealthRedis] = useState({date: ''});
  const [latestCountries, setLatestCountries] = useState([]);
  const [daysSelected, setDaysSelected] = React.useState<number[]>([20, 37]);
  const [timeline, setTimeline] = useState({});
  const classes = useStyles();
  const {GraphColorsKey} = useGraphColors();

  useEffect(() => {
    fetch('/health')
      .then((response) => response.json())
      .then((response) => setHealthRedis(response));
  }, []);

  useEffect(() => {
    fetch('/world')
      .then((response) => response.json())
      .then((response) => setWorld(response));
  }, []);

  useEffect(() => {
    fetch('/continents')
      .then((response) => response.json())
      .then((response) => setContinents(response));
  }, []);

  useEffect(() => {
    fetch('/countries')
      .then((response) => response.json())
      .then((response) => setLatestCountries(response));
  }, []);

  useEffect(() => {
    fetch('/timeline')
      .then((response) => response.json())
      .then((response) => setTimeline(response));
  }, []);

  const style = {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // background: 'linear-gradient(45deg, #01579B 30%, #05A9F4 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    marginTop: '80px',
    padding: '3px 15px',
    fontWeight: 600,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // boxShadow: '0 3px 5px 2px rgba(1, 87, 155, .3)',
  };
  return (
    <MainLayout>
      <Helmet title='Dashboard Countries' />
      <div className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant='h1' color='inherit'>
              April, 3rd 2020
            </Typography>
            <Typography variant='caption' color='inherit' style={style}>
              REDIS UPDATE: {healthRedis.date}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            {world && <CardToday continent={world} />}
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems='center'>
          <Grid item xs={12} md={4}>
            <PieChart dataSet={continents} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container justify='space-between'>
              {continents.map((item) => (
                <Grid item xs={12} md={6}>
                  <Card continent={item} key={item.name} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant='h2'>World</Typography>
          </Grid>
          <Grid item lg={12} md={12} xl={9} xs={12}>
            <LatestCountries
              countries={latestCountries}
              setSelectedCountry={setSelectedCountry}
              setSelectedCountryCode={setSelectedCountryCode}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h2'>{selectedCountry}</Typography>
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
                  countryCode={selectedCountryCode}
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
                  countryCode={selectedCountryCode}
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
      </div>
    </MainLayout>
  );
};

export default IndexPage;

/*
  "name": "USA",
  "totalCases": 577332,
  "newCases": 17032,
  "totalDeaths": 23077,
  "newDeaths": 972,
  "totalRecovered": 33907,
  "activeCases": 520348,
  "seriousCritical": 12565,
  "casesPerOneMillion": 1744,
  "deathsPerOneMillion": 70,
  "totalTests": 2910185,
  "testsPerOneMillion": 8792,
  "continent": "North America",
  "flag": "https://restcountries.eu/data/usa.svg",
  "latlng": [
      38,
      -97
  ],
  "percentage": "0.17442",
  "countryCode": "US",
  "population": 331002651,
  "mediumAge": 38

*/
