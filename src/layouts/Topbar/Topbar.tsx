import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';

const Topbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography gutterBottom variant='h1'>
          Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
