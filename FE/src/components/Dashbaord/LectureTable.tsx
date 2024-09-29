import React from 'react';
import { Button, Result, Space, Spin, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useLectures from '../../Hooks/useLecutres';

interface DataType {
  key: string;
  title: string;
  price: number;
  rating: number;
  duration: number;
}





const LecturesTable: React.FC = () => {


  const navigate = useNavigate();
  const { data, isLoading, isError } = useLectures();

  const handleEdit = (key: string) => {
    console.log(key);
  };

  const handleDelete = (key: string) => {
    console.log(key);
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <>{text} $</>,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (text) => <>{text} / 5</>,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <Space direction="horizontal">
          <Button type="primary" onClick={() => handleEdit(record.key)}>Edit</Button>
          <Button type="primary" onClick={() => handleDelete(record.key)}>Delete</Button>
        </Space>
      ),
    },
  ];


  const mappedData = data?.data.map((lecture) => ({
    key: lecture._id,
    title: lecture.title,
    price: lecture.price,
    rating: lecture.rating,
    duration: lecture.duration,
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

  return <Table<DataType> columns={columns} dataSource={mappedData} pagination={false} />;

}

export default LecturesTable;