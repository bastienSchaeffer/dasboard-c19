import React, {useState, useEffect} from 'react';
import {Card, CardHeader, Divider} from '@material-ui/core';
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
};

const LineChart: React.FC<LineChartProps> = ({dataSet, countryCode}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataSet[countryCode]);
  }, [dataSet, countryCode]);

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
              stroke='#0288D1'
              activeDot={{r: 8}}
              strokeWidth={2}
            />
            <Line
              type='monotone'
              dataKey='deaths'
              stroke='#26C6DA'
              activeDot={{r: 8}}
              strokeWidth={2}
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
