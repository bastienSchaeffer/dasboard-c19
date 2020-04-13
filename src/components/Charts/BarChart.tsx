import React, {useState, useEffect} from 'react';
import {Card, CardHeader, Divider} from '@material-ui/core';
import {useTheme} from '@material-ui/core/styles';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart as BarChartRecharts,
  Bar,
  ResponsiveContainer,
} from 'recharts';

type BarChartProps = {
  dataSet: any;
  countryCode: string;
  daysSelected: number[];
};

const BarChart: React.FC<BarChartProps> = ({
  dataSet,
  countryCode,
  daysSelected,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let data = dataSet[countryCode];
    if (data && data.length) {
      data = data.slice(daysSelected[0], daysSelected[1]);
    }
    setData(data);
  }, [dataSet, countryCode, daysSelected]);

  const theme = useTheme();
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.graphs.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.success.main,
  ];

  return (
    <Card>
      <CardHeader title='Evolution' />
      <Divider />
      <ResponsiveContainer width='100%' height={360} debounce={0}>
        {data && data.length ? (
          <BarChartRecharts
            data={data}
            margin={{top: 20, right: 10, left: 0, bottom: 20}}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='confirmed' fill={COLORS[0]} />
            <Bar dataKey='deaths' fill={COLORS[1]} />
          </BarChartRecharts>
        ) : (
          <p>loading</p>
        )}
      </ResponsiveContainer>
    </Card>
  );
};
export default BarChart;
