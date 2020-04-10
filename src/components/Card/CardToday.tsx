import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {Grid, Typography, Paper} from '@material-ui/core';
import {Continent} from '../../types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(0),
  },
  caption: {
    fontWeight: 700,
    color: theme.palette.primary.light,
  },

  box: {
    textAlign: 'center',
    padding: theme.spacing(2),
    '&:not(:last-of-type)': {
      borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
    },
    [theme.breakpoints.up('md')]: {
      '&:not(:last-of-type)': {
        borderBottom: 'none',
        borderRight: `1px solid ${theme.palette.primary.contrastText}`,
      },
    },
  },
}));

type CardProps = {
  readonly continent: Continent;
};

const CardToday: React.FC<CardProps> = ({continent}) => {
  const classes = useStyles();

  const {totalCases, totalDeaths, totalRecovered, activeCases} = continent;
  return (
    <Paper className={classes.root} elevation={3}>
      <Grid container justify='space-between'>
        <Grid item xs={12} md={3} className={classes.box}>
          <Typography data-testid='total-cases' variant='h1' color='inherit'>
            {totalCases}
          </Typography>
          <Typography
            className={classes.caption}
            color='inherit'
            gutterBottom
            variant='caption'
          >
            CASES WORLDWIDE
          </Typography>
        </Grid>
        <Grid item xs={12} md={3} className={classes.box}>
          <Typography data-testid='total-deaths' variant='h1' color='inherit'>
            {totalDeaths}
          </Typography>
          <Typography
            className={classes.caption}
            color='inherit'
            gutterBottom
            variant='caption'
          >
            DEATHS WORLDWIDE
          </Typography>
        </Grid>
        <Grid item xs={12} md={3} className={classes.box}>
          <Typography data-testid='active-cases' variant='h1' color='inherit'>
            {activeCases}
          </Typography>
          <Typography
            className={classes.caption}
            color='inherit'
            gutterBottom
            variant='caption'
          >
            ACTIVE CASES WORLDWIDE
          </Typography>
        </Grid>
        <Grid item xs={12} md={3} className={classes.box}>
          <Typography
            data-testid='total-recovered'
            variant='h1'
            color='inherit'
          >
            {totalRecovered}
          </Typography>
          <Typography
            className={classes.caption}
            color='inherit'
            gutterBottom
            variant='caption'
          >
            RECOVERED WORLDWIDE
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CardToday;
