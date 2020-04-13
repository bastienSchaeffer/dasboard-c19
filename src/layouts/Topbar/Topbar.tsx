import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appTitle: {
    color: theme.palette.common.white,
  },
}));

const Topbar = () => {
  const classes = useStyles();
  return (
    <AppBar>
      <Toolbar>
        <Typography gutterBottom variant='h1' className={classes.appTitle}>
          Dashboard coronaboule
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
