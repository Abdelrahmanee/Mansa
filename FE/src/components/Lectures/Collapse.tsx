import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Section 1: Introduction to NodeJs',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'section 2 : advanced nodeJs',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'section 3 : final project',
    children: <p>{text}</p>,
  },
];

const Collapses: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return <Collapse className='w-full md:w-2/3' items={items} defaultActiveKey={['1']} onChange={onChange} />;
};

export default Collapses;