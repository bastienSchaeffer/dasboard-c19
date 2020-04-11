import React, {useState, useEffect} from 'react';
import {Card, CardHeader, Divider} from '@material-ui/core';
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
};

const BarChart: React.FC<BarChartProps> = ({dataSet, countryCode}) => {
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
          <BarChartRecharts
            data={data}
            margin={{top: 20, right: 10, left: 0, bottom: 20}}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='confirmed' fill={'#0288D1'} />
            <Bar dataKey='deaths' fill={'#26C6DA'} />
          </BarChartRecharts>
        ) : (
          <p>loading</p>
        )}
      </ResponsiveContainer>
    </Card>
  );
};
export default BarChart;
