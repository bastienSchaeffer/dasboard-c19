import React from 'react';
import {Typography} from '@material-ui/core';
import {Theme, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(4),
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.container}>
      <Typography variant='caption'>Created in 2020</Typography>
    </footer>
  );
};

export default Footer;
