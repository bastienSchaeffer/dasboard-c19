import React, {useState, useEffect} from 'react';
import {Card, CardHeader, Divider} from '@material-ui/core';
import {useTheme} from '@material-ui/core/styles';
import {
  LineChart as LineChartRecharts,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type LineChartProps = {
  dataSet: any;
  countryCode: string;
  daysSelected: number[];
};

const LineChart: React.FC<LineChartProps> = ({
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
    // theme.palette.graphs.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ];

  return (
    <Card>
      <CardHeader title='Evolution' />
      <Divider />
      <ResponsiveContainer width='100%' height={360} debounce={0}>
        {data && data.length ? (
          <LineChartRecharts
            data={data}
            margin={{top: 20, right: 10, left: 0, bottom: 20}}
          >
            <XAxis dataKey='date' />
            <YAxis />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey='confirmed'
              stroke={COLORS[0]}
              activeDot={{r: 2}}
              strokeWidth={4}
            />
            <Line
              type='monotone'
              dataKey='deaths'
              stroke={COLORS[1]}
              activeDot={{r: 2}}
              strokeWidth={4}
            />
          </LineChartRecharts>
        ) : (
          <p>loading</p>
        )}
      </ResponsiveContainer>
    </Card>
  );
};
export default LineChart;
