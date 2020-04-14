import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
      justifyContent: 'center',
      padding: 50,
    },
  })
);

export default function Loader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress variant='indeterminate' disableShrink size={80} />
    </div>
  );
}
