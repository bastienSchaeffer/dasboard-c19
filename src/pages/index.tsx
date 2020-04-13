import React, {useState, useEffect} from 'react';
import {MainLayout} from '../layouts';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Helmet} from 'react-helmet';

import {Grid, Typography} from '@material-ui/core';
import {Card, CardToday} from '../components/Card';
import {LatestCountries} from '../components/LatestCountries';
import {LineChart, BarChart, PieChart} from '../components/Charts';
import DiscreteSlider from '../components/Slider/Slider';
import {Continent} from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.background.default,
      // background: 'linear-gradient(180deg, #e0f1ff 30%, #05A9F4 90%)',
      padding: theme.spacing(4),
      height: '100%',
    },
  })
);

function IndexPage() {
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [selectedCountryCode, setSelectedCountryCode] = useState('US');
  const [world, setWorld] = React.useState<Continent>({
    name: 'stringify',
    totalCases: 0,
    newCases: 0,
    totalDeaths: 0,
    newDeaths: 0,
    totalRecovered: 0,
    activeCases: 0,
    seriousCritical: 0,
    casesPerOneMillion: 0,
    deathsPerOneMillion: 0,
    totalTests: 0,
    testsPerOneMillion: 0,
    continent: 'stringify',
  });
  const [continents, setContinents] = useState([{name: 'm', totalCases: 0}]);
  const [healthRedis, setHealthRedis] = useState({date: ''});
  const [latestCountries, setLatestCountries] = useState([]);
  const [daysSelected, setDaysSelected] = React.useState<number[]>([20, 37]);
  const [timeline, setTimeline] = useState({});
  const classes = useStyles();

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
            <CardToday continent={world}>
              <pre>{JSON.stringify(healthRedis, null, 2)}</pre>
            </CardToday>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <br />
            <br />
            <PieChart />
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container justify='space-between'>
              {continents.map((item) => (
                <Grid item xs={12} md={6}>
                  <Card
                    title={item.name}
                    numberValue={item.totalCases}
                    key={item.name}
                  />
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
            <LineChart
              dataSet={timeline}
              countryCode={selectedCountryCode}
              daysSelected={daysSelected}
            />
          </Grid>
          <Grid item lg={6} md={6} xl={12} xs={12}>
            <BarChart
              dataSet={timeline}
              countryCode={selectedCountryCode}
              daysSelected={daysSelected}
            />
          </Grid>
        </Grid>
      </div>
    </MainLayout>
  );
}

export default IndexPage;
