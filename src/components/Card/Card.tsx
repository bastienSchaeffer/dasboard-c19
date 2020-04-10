import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {
  Card as CardMUI,
  CardContent,
  Grid,
  Typography,
  Avatar,
} from '@material-ui/core';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
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
    height: 28,
    width: 28,
  },
  icon: {
    height: 16,
    width: 16,
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

type CardProps = {
  title: string;
  numberValue: number;
};

const Card: React.FC<CardProps> = ({title, numberValue}) => {
  const classes = useStyles();

  return (
    <CardMUI className={classes.root}>
      <CardContent>
        <Grid container justify='space-between'>
          <Grid item>
            <Typography variant='h3'>{title}</Typography>
            <Typography
              className={classes.title}
              color='textSecondary'
              gutterBottom
              variant='caption'
            >
              WORLDWIDE
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <Autorenew className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          {/* <ArrowDownwardIcon className={classes.differenceIcon} /> */}
          <Typography className={classes.differenceValue} variant='h1'>
            {numberValue}
          </Typography>
          <Typography variant='caption'>Since 1 / 22 / 2020</Typography>
        </div>
      </CardContent>
    </CardMUI>
  );
};

export default Card;
