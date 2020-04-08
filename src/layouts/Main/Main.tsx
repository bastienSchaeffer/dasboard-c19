import React from 'react';
import Topbar from '../Topbar';
import Footer from '../Footer';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.background.default,
      paddingTop: 64,
      height: '100%',
    },
    content: {
      height: '100%',
    },
  })
);

type MainProps = {
  children: React.ReactNode;
};

const Main: React.FC<MainProps> = ({children}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Topbar />
      <main role='main' className={classes.content}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Main;
