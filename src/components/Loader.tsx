import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {motion} from 'framer-motion';

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
    <motion.div initial={{scale: 0.5}} animate={{scale: 1}}>
      <div className={classes.root}>
        <CircularProgress variant='indeterminate' disableShrink size={80} />
      </div>
    </motion.div>
  );
}
