import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';

const Topbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography gutterBottom variant='h1'>
          New Dashboard Countries - step 5
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
