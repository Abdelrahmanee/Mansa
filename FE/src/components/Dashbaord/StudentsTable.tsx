import React from 'react';
import { Button, Result, Spin, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { getAllStudents } from '../../utils/api';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { User } from '../../utils/types';

interface DataType {
  key: string;
  name: string;
  email: string;
  city: string;
  phone: string;
  age: number;
  status: string;

}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => {
      const color = status === 'offline' ? 'red' : 'green';
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    },
  },
];



const SudentsTable: React.FC = () => {


  const navigate = useNavigate();
  const { data: response, isLoading, isError, error } = useQuery<{status: string, data: User[], message: string}>({
    queryKey: ['students'],
    queryFn: getAllStudents,
  });

  const data = response?.data.map((student) => ({
    key: student._id,
    name: student.userName,
    email: student.email,
    age: student.age,
    phone: student.mobileNumber,
    city: student.city,
    status: student.status,
  }));

  if (isError) {
    return <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={<Button type="primary" onClick={() => navigate('/')}>Back Home</Button>}
    />
  }

  if (isLoading) return <div className='w-[80%] mx-auto mt-10 min-h-[250px] flex justify-center items-center'><Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} size="large" /></div>;

  return <Table<DataType> columns={columns} dataSource={data} pagination={false} />;

}

export default SudentsTable;