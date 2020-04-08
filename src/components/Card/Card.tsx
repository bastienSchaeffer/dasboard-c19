import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {
  Card as CardMUI,
  CardContent,
  Grid,
  Typography,
  Avatar,
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Autorenew from '@material-ui/icons/Autorenew';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: theme.palette.info.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  differenceIcon: {
    color: theme.palette.error.dark,
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1),
  },
}));

const Card = () => {
  const classes = useStyles();

  return (
    <CardMUI className={classes.root}>
      <CardContent>
        <Grid container justify='space-between'>
          <Grid item>
            <Typography
              className={classes.title}
              color='textSecondary'
              gutterBottom
              variant='body2'
            >
              CARD
            </Typography>
            <Typography variant='h3'>Title Card</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <Autorenew className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant='body2'>
            12%
          </Typography>
          <Typography variant='caption'>Since last month</Typography>
        </div>
      </CardContent>
    </CardMUI>
  );
};

export default Card;
