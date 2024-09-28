import { useEffect, useRef } from 'react';
import { Column } from '@ant-design/plots';
import { Bar } from '@antv/g2plot';

const BarChart = () => {
  const data = [
    { letter: 'Cairo', frequency: 5 },
    { letter: 'Giza', frequency: 10 },
    { letter: 'Alexandria', frequency: 25 },
    { letter: 'Asyut', frequency: 20 },
    { letter: 'Suez', frequency: 13 },
    { letter: 'Luxor', frequency: 5 },
    { letter: 'Aswan', frequency: 8 },
  ];



  const config = {
    data,
    xField: 'letter',
    yField: 'frequency',
    onReady: (plotInstance: Bar) => {
      plotInstance.on('afterrender', () => {
        try {
          const container = plotInstance.chart.getCanvas().get('container');
          const { height } = container.getBoundingClientRect();  // Accessing the correct container
          
          const tooltipItem = data[Math.floor(Math.random() * data.length)];

          plotInstance.chart.emit('tooltip:show', {
            data: {
              data: tooltipItem,
            },
            offsetY: height / 2 - 60,
          });
        } catch (e) {
          console.error(e);
        }
      });
    },
  };

  return <Column {...config} />;
};

export default BarChart;