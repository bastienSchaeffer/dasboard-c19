import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appTitle: {
    color: theme.palette.common.white,
    flexGrow: 1,
    fontSize: 40,
  },

  container: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,

    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    },

    [theme.breakpoints.up('lg')]: {
      padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
    },
  },
}));

const dt = new Date();
const options = {
  timeZone: 'UTC',
  hour12: false,
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

const Topbar = () => {
  const classes = useStyles();
  return (
    <AppBar>
      <Toolbar className={classes.container}>
        <Typography gutterBottom variant='h1' className={classes.appTitle}>
          Dashboard
        </Typography>
        {dt.toLocaleString('en-GB', options)}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
