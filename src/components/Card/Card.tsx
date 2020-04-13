import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {
  Card as CardMUI,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import {Continent} from '../../types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
  },
  title: {
    color: theme.palette.primary.main,
  },
  caption: {
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  dataValue: {
    color: theme.palette.error.main,
    marginRight: theme.spacing(1),
  },
}));

type CardProps = {
  continent: Continent;
};

const Card: React.FC<CardProps> = ({continent}) => {
  const classes = useStyles();

  const {name, totalCases, totalDeaths, totalRecovered} = continent;
  return (
    <CardMUI className={classes.root}>
      <CardContent>
        <Grid
          container
          justify='space-between'
          alignItems='flex-end'
          spacing={2}
        >
          <Grid item xs={12}>
            <Typography
              data-testid='title'
              variant='h2'
              className={classes.title}
            >
              {name}
            </Typography>
            <Typography
              className={classes.caption}
              color='textSecondary'
              gutterBottom
              variant='caption'
            >
              CONTINENT
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              data-testid='total-cases'
              className={classes.dataValue}
              variant='h2'
            >
              {totalCases}
            </Typography>
            <Typography variant='caption' className={classes.caption}>
              TOTAL CASES
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography
              data-testid='total-deaths'
              className={classes.dataValue}
              variant='h5'
            >
              {totalDeaths}
            </Typography>
            <Typography variant='caption' className={classes.caption}>
              DEATHS
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography
              data-testid='total-recovered'
              className={classes.dataValue}
              variant='h5'
            >
              {totalRecovered}
            </Typography>
            <Typography variant='caption' className={classes.caption}>
              RECOVERED
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </CardMUI>
  );
};

export default Card;
