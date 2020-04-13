import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import {Country} from '../../types';

interface Data {
  name: string;
  population: number;
  percentage: number;
  totalCases: number;
  totalDeaths: number;
  countryCode: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: {[key in Key]: number | string},
  b: {[key in Key]: number | string}
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {id: 'name', numeric: false, label: 'Country'},
  {id: 'population', numeric: true, label: 'Population'},
  {id: 'percentage', numeric: true, label: 'Percentage'},
  {id: 'totalCases', numeric: true, label: 'Cases'},
  {id: 'totalDeaths', numeric: true, label: 'Deaths'},
];

interface EnhancedTableHeadProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const {classes, order, orderBy, onRequestSort} = props;
  const createSortHandler = (property: keyof Data) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
    content: {
      padding: 0,
    },
    table: {
      minWidth: 400,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    container: {
      maxHeight: 470,
    },
  })
);

type LatestCountriesProps = {
  countries: Array<Country>;
  setSelectedCountry: any;
  setSelectedCountryCode: any;
};

const LatestCountries: React.FC<LatestCountriesProps> = ({
  countries,
  setSelectedCountry,
  setSelectedCountryCode,
}) => {
  const rows = countries;

  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('totalCases');
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (
    _event: React.MouseEvent<unknown>,
    name: string,
    countryCode: string
  ) => {
    setSelected([name]);
    setSelectedCountry(name);
    setSelectedCountryCode(countryCode);
    // console.log(setSelectedCountry);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  return (
    <Card className={classes.root}>
      <CardHeader title='Latest Countries Data' />
      <Divider />
      <CardContent className={classes.content}>
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            size={'medium'}
            aria-label='enhanced table'
            stickyHeader
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy)).map(
                (row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        handleClick(event, row.name, row.countryCode)
                      }
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='default'
                      >
                        {row.name}
                        <br />
                        <img
                          src={row.flag}
                          style={{maxWidth: 50}}
                          alt={row.name}
                        />
                      </TableCell>
                      <TableCell align='right'>
                        {row.population}
                        <br />
                        Medium age: {row.mediumAge}
                      </TableCell>
                      <TableCell align='right'>
                        {Number(row.percentage)}
                      </TableCell>
                      <TableCell align='right'>
                        {row.totalCases}
                        <br />
                        today: {row.newCases}
                      </TableCell>
                      <TableCell align='right'>
                        {row.totalDeaths}
                        <br />
                        today: {row.newDeaths}
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default LatestCountries;
