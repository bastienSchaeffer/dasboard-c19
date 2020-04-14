import React, {useState, useEffect} from 'react';
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

type Config = {
  key: string;
  color: string;
};
type LineChartProps = {
  dataSet: any;
  countryCode: string;
  daysSelected: number[];
  config: Config[];
};

const LineChart: React.FC<LineChartProps> = ({
  dataSet,
  countryCode,
  daysSelected,
  config,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let data = dataSet[countryCode];
    if (data && data.length) {
      data = data.slice(daysSelected[0], daysSelected[1]);
    }
    setData(data);
  }, [dataSet, countryCode, daysSelected]);

  return (
    <ResponsiveContainer width='100%' height={360} debounce={0}>
      <LineChartRecharts
        data={data}
        margin={{top: 20, right: 50, left: 0, bottom: 20}}
      >
        <XAxis dataKey='date' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Legend />
        {config.map((item) => (
          <Line
            key={item.key}
            type='monotone'
            dataKey={item.key}
            stroke={item.color}
            activeDot={{r: 2}}
            strokeWidth={4}
          />
        ))}
      </LineChartRecharts>
    </ResponsiveContainer>
  );
};
export default LineChart;
