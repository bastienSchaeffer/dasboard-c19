import React from 'react';
import {MainLayout} from '../layouts';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Helmet} from 'react-helmet';

import {Grid} from '@material-ui/core';

import dynamic from 'next/dynamic';
const Global = dynamic(import('../components/Global'));
const Continents = dynamic(import('../components/Continents'));
const Countries = dynamic(import('../components/Countries'));
const Country = dynamic(import('../components/Country'));
const ErrorBoundary = dynamic(import('../components/ErrorBoundary'));
// import Global from '../components/Global';
// import Continents from '../components/Continents';
// import Countries from '../components/Countries';
// import Country from '../components/Country';
// import ErrorBoundary from '../components/ErrorBoundary';

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

const IndexPage: React.FC = () => {
  const classes = useStyles();

  return (
    <MainLayout>
      <Helmet title='Dashboard Countries' />
      <div className={classes.container}>
        <Grid container spacing={4}>
          <ErrorBoundary>
            <>
              <Grid item xs={12}>
                <Global />
              </Grid>
              <Grid item xs={12}>
                <Continents />
              </Grid>
              <Grid item xs={12}>
                <Countries />
              </Grid>
              <Grid item xs={12}>
                <Country />
              </Grid>
            </>
          </ErrorBoundary>
        </Grid>
      </div>
    </MainLayout>
  );
};

export default IndexPage;
