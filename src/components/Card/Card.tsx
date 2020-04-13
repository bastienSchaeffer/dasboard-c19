import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {
  Card as CardMUI,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
  },
  content: {
    alignItems: 'center',
    display: 'flex',
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
  title: string;
  numberValue: number;
};

const Card: React.FC<CardProps> = ({title, numberValue}) => {
  const classes = useStyles();

  return (
    <CardMUI className={classes.root}>
      <CardContent>
        <Grid container justify='space-between' spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h2' className={classes.title}>
              {title}
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
            <Typography className={classes.dataValue} variant='h2'>
              {numberValue}
            </Typography>
            <Typography variant='caption' className={classes.caption}>
              DEATHS
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.dataValue} variant='h2'>
              {numberValue}
            </Typography>
            <Typography variant='caption' className={classes.caption}>
              NEW CASES
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </CardMUI>
  );
};

export default Card;
