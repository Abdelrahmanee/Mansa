import React, { useState } from 'react';
import { Button, Input, Result, Space, Spin, Table, Tag } from 'antd';
import type { TableProps, TablePaginationConfig } from 'antd';
import { LoadingOutlined, StarFilled, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useLectures from '../../../Hooks/useLecutres';

interface DataType {
  key: string;
  title: string;
  price: number;
  rating: number;
  duration: number;
}

const LecturesTable: React.FC = () => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data, isLoading, isError } = useLectures();

  const handleEdit = (key: string) => {
    console.log(key);
  };

  const handleDelete = (key: string) => {
    console.log(key);
  };

  // Filter lectures by search input
  const filteredData = data?.data.filter((lecture) =>
    lecture.title.toLowerCase().includes(search.toLowerCase())
  );

  // Handle pagination
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
  };

  // Map the data to match the Table format
  const mappedData = filteredData?.map((lecture) => ({
    key: lecture._id,
    title: lecture.title,
    price: lecture.price,
    rating: lecture.rating,
    duration: lecture.duration,
  }));

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
      render: (text) => <>{text}$ </>,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (text) => <>{text} <StarFilled /></>,
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

  if (isError) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary" onClick={() => navigate('/')}>Back Home</Button>}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="w-[80%] mx-auto mt-10 min-h-[250px] flex justify-center items-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} size="large" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center my-2 p-5">
        <Input
          placeholder="Search Lecture"
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-[40%] w-1/2"
        />
        <Button type="primary" onClick={() => navigate('/dashboard/lectures/add')}> <PlusOutlined /> Add Lecture</Button>
      </div>
      <Table<DataType>
        columns={columns}
        dataSource={mappedData}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: mappedData?.length,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50'],
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default LecturesTable;
