import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800,
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  status: {
    marginRight: theme.spacing(1),
  },
  actions: {
    justifyContent: 'flex-end',
  },
  container: {
    maxHeight: 440,
  },
}));

type Country = {
  country: string;
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
};

type LatestCountriesProps = {
  countries: Array<Country>;
};

const LatestCountries: React.FC<LatestCountriesProps> = ({countries}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title='Latest Countries Data' />
      <Divider />
      <CardContent className={classes.content}>
        <div className={classes.inner}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Country</TableCell>
                  <TableCell>Confirmed</TableCell>
                  <TableCell>Deaths</TableCell>
                  <TableCell>Recovered</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countries.map((country: any) => (
                  <TableRow hover key={country?.country}>
                    <TableCell>{country?.country}</TableCell>
                    <TableCell>{country?.confirmed}</TableCell>
                    <TableCell>{country?.deaths}</TableCell>
                    <TableCell>{country?.recovered}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button color='primary' size='small' variant='text'>
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default LatestCountries;
