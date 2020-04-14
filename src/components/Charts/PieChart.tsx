import React from 'react';
import {
  PieChart as PieChartRecharts,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {Continent} from '../../types';

type PieChartProps = {
  dataSet: Continent[];
  colors: string[];
};

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
//   index,
// }: any) => {
//   console.log(outerRadius, index);
//   const newOuter = 260;
//   const radius = innerRadius + (newOuter - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill='red'
//       style={{fontWeight: 600, fontSize: 11}}
//       textAnchor={x > cx ? 'start' : 'end'}
//       dominantBaseline='central'
//     >
//       {`${(percent * 100).toFixed(2)}%`}
//     </text>
//   );
// };

const PieChart: React.FC<PieChartProps> = ({dataSet, colors}) => {
  return (
    <ResponsiveContainer width='100%' height={360} debounce={0}>
      <PieChartRecharts margin={{top: 0, right: 0, left: 0, bottom: 0}}>
        <Legend
          height={40}
          layout='horizontal'
          align='center'
          verticalAlign='bottom'
        />
        <Pie
          startAngle={40}
          endAngle={320}
          data={dataSet}
          cx={'50%'}
          cy={160}
          innerRadius='60%'
          outerRadius='90%'
          fill='#8884d8'
          paddingAngle={1}
          dataKey='totalCases'
          // label={renderCustomizedLabel}
        >
          {dataSet.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
      </PieChartRecharts>
    </ResponsiveContainer>
  );
};
export default PieChart;
