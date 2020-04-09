import React, {useState, useEffect} from 'react';
import {MainLayout} from '../layouts';
import {Typography} from '@material-ui/core';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Helmet} from 'react-helmet';

import {Grid} from '@material-ui/core';
import Card from '../components/Card';
import LatestCountries from '../components/LatestCountries';

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
  const [world, setWorld] = useState({
    cases: 1529401,
    deaths: 89416,
    recovered: 337164,
  });
  const [dummyRedis, setDummyRedis] = useState([]);
  const [latestCountries, setLatestCountries] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch('/health')
      .then((response) => response.json())
      .then((response) => setDummyRedis(response));
  }, []);

  useEffect(() => {
    fetch('/world')
      .then((response) => response.json())
      .then((response) => setWorld(response));
  }, []);

  useEffect(() => {
    fetch('/countries')
      .then((response) => response.json())
      .then((response) => setLatestCountries(response));
  }, []);

  return (
    <MainLayout>
      <Helmet title='Dashboard Countries' />
      <div className={classes.container}>
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Typography>Data</Typography>
            {/* <pre>{JSON.stringify(world, null, 2)}</pre> */}
            <pre>{JSON.stringify(dummyRedis, null, 2)}</pre>
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card title='Cases' number={world.cases} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card title='Deaths' number={world.deaths} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card title='Recovered' number={world.recovered} />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestCountries countries={latestCountries} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            {/* <pre>{JSON.stringify(latestCountries, null, 2)}</pre> */}
            <LatestCountries countries={latestCountries} />
          </Grid>
        </Grid>
      </div>
    </MainLayout>
  );
}

export default IndexPage;
