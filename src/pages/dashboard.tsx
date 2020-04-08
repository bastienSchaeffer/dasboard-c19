import React, {useState, useEffect} from 'react';
import {MainLayout} from '../layouts';
import {Typography} from '@material-ui/core';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';

import {Grid} from '@material-ui/core';
import Card from '../components/Card';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(4),
      height: '100%',
    },
  })
);

function DashboardsPage() {
  const [data, setData] = useState();
  const classes = useStyles();

  useEffect(() => {
    fetch('/url')
      .then((response) => response.json())
      .then((response) => setData(response));
  }, []);

  return (
    <MainLayout>
      <div className={classes.container}>
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Typography>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </Typography>
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            {/* <TasksProgress /> */}
            <Card />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            {/* <TotalProfit /> */}
            <Card />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            {/* <LatestSales /> */}
            <Card />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            {/* <UsersByDevice /> */}
            <Card />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            {/* <LatestProducts /> */}
            <Card />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            {/* <LatestOrders /> */}
            <Card />
          </Grid>
        </Grid>
      </div>
    </MainLayout>
  );
}

export default DashboardsPage;
