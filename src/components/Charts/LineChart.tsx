import React, {useState, useEffect} from 'react';
// import {
//   LineChart as LineChartRecharts,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';

type Config = {
  key: string;
  color: string;
};
type LineChartProps = {
  dataSet: any;
  daysSelected: number[];
  config: Config[];
};

const LineChart: React.FC<LineChartProps> = ({
  dataSet,
  daysSelected,
  config,
}) => {
  // const [chartData, setChartData] = useState([]);

  // useEffect(() => {
  //   let data = dataSet;
  //   if (data && data.length) {
  //     data = data.slice(daysSelected[0], daysSelected[1]);
  //   }
  //   setChartData(data);
  // }, [dataSet, daysSelected]);

  console.log('Linecharts');
  return (
    <div>
      {/* {config.map((item) => (
        <div>
          <p>{item.color}</p>
          <p>{item.key}</p>
        </div>
      ))} */}
      {/* {chartData &&
        chartData.map((item) => (
          <div>
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </div>
        ))} */}
      <pre>
        {JSON.stringify(config, null, 2)}
        {JSON.stringify(daysSelected, null, 2)}
        {JSON.stringify(dataSet, null, 2)}
      </pre>
    </div>

    // <ResponsiveContainer width='100%' height={360} debounce={0}>
    //   <LineChartRecharts
    //     data={chartData}
    //     margin={{top: 20, right: 50, left: 0, bottom: 20}}
    //   >
    //     <XAxis dataKey='date' />
    //     <YAxis />
    //     <CartesianGrid strokeDasharray='3 3' />
    //     <Tooltip />
    //     <Legend />
    //     {config.map((item) => (
    //       <Line
    //         key={item.key}
    //         type='monotone'
    //         dataKey={item.key}
    //         stroke={item.color}
    //         activeDot={{r: 2}}
    //         strokeWidth={4}
    //       />
    //     ))}
    //   </LineChartRecharts>
    // </ResponsiveContainer>
  );
};
export default LineChart;
