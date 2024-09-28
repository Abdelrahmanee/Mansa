import React from 'react';
import { Pie } from '@ant-design/plots';
import { PieConfig } from '@ant-design/plots/es/components/pie';

const BieChart: React.FC = () => {
  const config: PieConfig = {
    data: [
      { type: 'male', value: 25 },
      { type: 'female', value: 10 },
      
    ],
    angleField: 'value',
    colorField: 'type',
    label: {
      type: 'inner', 
      offset: '-30%',
      content: ({ percent }: { percent: number }) => `${(percent * 100).toFixed(0)}%`, 
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      position: 'left',
      itemHeight: 20,
      itemWidth: 100,
    },
    interactions: [
      { type: 'element-selected' },
      { type: 'element-active' },
    ],
  };

  return <Pie {...config} />;
};

export default BieChart;
