import React from 'react';
import {MainLayout} from '../layouts';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Helmet} from 'react-helmet';
import fetch from 'node-fetch';
import {Grid} from '@material-ui/core';

import dynamic from 'next/dynamic';
const Global = dynamic(import('../components/Global'));
const Continents = dynamic(import('../components/Continents'));
// const Countries = dynamic(import('../components/Countries'));
// const Country = dynamic(import('../components/Country'));
const ErrorBoundary = dynamic(import('../components/ErrorBoundary'));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      // overflowY: 'hidden',
      backgroundColor: theme.palette.background.default,
      height: '100%',
      padding: theme.spacing(2),

      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
      },

      [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(4),
      },
    },
  })
);

const IndexPage: React.FC = ({health, world, continents}: any) => {
  const classes = useStyles();
  console.log(world);
  return (
    <MainLayout>
      <Helmet title='Dashboard Countries' />
      <div className={classes.container}>
        <Grid container spacing={4}>
          <ErrorBoundary>
            <>
              <Grid item xs={12}>
                <Global health={health} world={world} />
              </Grid>
              <Grid item xs={12}>
                <Continents continents={continents} />
              </Grid>
              {/* <Grid item xs={12}>
                <Countries />
              </Grid>
              <Grid item xs={12}>
                <Country />
              </Grid> */}
            </>
          </ErrorBoundary>
        </Grid>
      </div>
    </MainLayout>
  );
};

export async function getStaticProps() {
  // const res = await fetch('https://dashboard-c19.herokuapp.com/countries');
  // Health
  const resHealth = await fetch('https://dashboard-c19.herokuapp.com/health');
  const jsonHealth = await resHealth.json(); // better use it inside try .. catch
  // World
  const resWorld = await fetch('https://dashboard-c19.herokuapp.com/world');
  const jsonWorld = await resWorld.json();
  // Continents
  const resContinents = await fetch(
    'https://dashboard-c19.herokuapp.com/continents'
  );
  const jsonContinents = await resContinents.json(); // better use it inside try .. catch

  return {
    props: {
      health: jsonHealth,
      world: jsonWorld,
      continents: jsonContinents,
    },
  };
}

export default IndexPage;
