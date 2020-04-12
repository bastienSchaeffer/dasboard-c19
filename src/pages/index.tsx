import React, {useState, useEffect} from 'react';
import {MainLayout} from '../layouts';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Helmet} from 'react-helmet';

import {Grid, Typography} from '@material-ui/core';
import Card from '../components/Card';
import {LatestCountries} from '../components/LatestCountries';
import {LineChart, BarChart} from '../components/Charts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(4),
      height: '100%',
    },
  })
);

function IndexPage() {
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [selectedCountryCode, setSelectedCountryCode] = useState('US');
  const [world, setWorld] = useState({
    totalCases: 1529401,
    totalDeaths: 89416,
    totalRecovered: 337164,
  });
  const [continents, setContinents] = useState([{name: 'm', totalCases: 0}]);
  const [healthRedis, setHealthRedis] = useState([]);
  const [latestCountries, setLatestCountries] = useState([]);
  const [timeline, setTimeline] = useState({});
  const classes = useStyles();

  useEffect(() => {
    fetch('/health')
      .then((response) => response.json())
      .then((response) => setHealthRedis(response));
  }, []);

  useEffect(() => {
    fetch('/worldNew')
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

  return (
    <MainLayout>
      <Helmet title='Dashboard Countries' />
      <div className={classes.container}>
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <pre>{JSON.stringify(healthRedis, null, 2)}</pre>
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card title='Cases' numberValue={world.totalCases} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card title='Deaths' numberValue={world.totalDeaths} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card title='Recovered' numberValue={world.totalRecovered} />
          </Grid>

          {continents.map((item) => (
            <Grid item lg={3} sm={6} xl={3} xs={12} key={item.name}>
              <Card title={item.name} numberValue={item.totalCases} />
            </Grid>
          ))}

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
          <Grid item lg={6} md={6} xl={12} xs={12}>
            <LineChart dataSet={timeline} countryCode={selectedCountryCode} />
          </Grid>
          <Grid item lg={6} md={6} xl={12} xs={12}>
            <BarChart dataSet={timeline} countryCode={selectedCountryCode} />
          </Grid>
        </Grid>
      </div>
    </MainLayout>
  );
}

export default IndexPage;
