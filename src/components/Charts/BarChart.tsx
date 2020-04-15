import React, {useState, useEffect} from 'react';
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

type Config = {
  key: string;
  color: string;
};

type BarChartProps = {
  dataSet: any;
  daysSelected: number[];
  config: Config[];
};

const BarChart: React.FC<BarChartProps> = ({dataSet, daysSelected, config}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let data = dataSet;
    if (data && data.length) {
      data = data.slice(daysSelected[0], daysSelected[1]);
    }
    setChartData(data);
  }, [dataSet, daysSelected]);

  return (
    <ResponsiveContainer width='100%' height={360} debounce={0}>
      <BarChartRecharts
        data={chartData}
        margin={{top: 20, right: 50, left: 0, bottom: 20}}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Legend />

        {config.map((item) => (
          <Bar key={item.key} dataKey={item.key} fill={item.color} />
        ))}
      </BarChartRecharts>
    </ResponsiveContainer>
  );
};
export default BarChart;
