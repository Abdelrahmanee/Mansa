import React, { useState } from 'react';
import { Button, Input, message, Popover, Result, Space, Spin, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteAccessCode, getCodes } from '../../../utils/api';
import { Code, ErrorResponse } from '../../../utils/types';
import moment from 'moment';
import useLectures from '../../../Hooks/useLecutres';
import GenerateCodeModel from './GenerateCodeModel';
import { AxiosError, isAxiosError } from 'axios';

interface DataType {
  key: string;
  code: string;
  price: number;
  createdAt: string;
  lectureId: string;
  isUsed: boolean;
}

const CodesTable: React.FC = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); 
  const [search, setSearch] = useState<string>('');

  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery<{ status: string, data: Code[], message: string }>({
    queryKey: ['codes'],
    queryFn: getCodes,
    select: (data) => data,
  });

  const { data: lectures } = useLectures();

  const getLectureName = (lectureId: string) => {
    const lecture = lectures?.data?.find((lec) => lec._id === lectureId);
    return lecture?.title || 'Unknown Lecture';
  };

  const filteredData = data?.data.filter((code) => code.code.includes(search));


  const mutation = useMutation({
    mutationFn: deleteAccessCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['codes'] });
      messageApi.success('Code deleted successfully');
    },
    onError: (error) => {
      if(isAxiosError(error)){
        const axiosError  = error as AxiosError<ErrorResponse>
        if(axiosError.response && axiosError.response.data && axiosError.response.data.message){
          messageApi.error(axiosError.response.data.message)
        }else{
          messageApi.error('Failed to delete code')
        }
      } else {
        messageApi.error('An unexpected error occurred');
      }
    },
    onSettled: () => {
      setDeleteLoading(null)
    }
  });

  const handleDelete = async (key: string) => {
    setDeleteLoading(key)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    mutation.mutate(key)
    
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      render: (text) => <a
      onClick={() => {
        navigator.clipboard.writeText(text)
          .then(() => {
            message.success('Code copied to clipboard!');
          })
          .catch((err) => {
            console.error('Failed to copy: ', err);
            message.error('Failed to copy code');
          });
      }}
      style={{ cursor: 'pointer' }}
    >
      {text}
    </a>,
    },
    {
      title: 'LectureId',
      dataIndex: 'lectureId',
      key: 'lectureId',
      render: (text) => (
        <>
          <Popover content={getLectureName(text)} title="Lecture Name">
            <a>{text}</a>
          </Popover>
        </>
      ),
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <>{moment(text).format('MMMM Do YYYY')}</>,
    },
    {
      title: 'IsUsed',
      dataIndex: 'isUsed',
      key: 'isUsed',
      render: (_, { isUsed }) => {
        const color = isUsed ? 'red' : 'green';
        return (
          <Tag color={color} key={0}>
            {isUsed ? 'Used' : 'Not Used'}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className='min-w-[100px]'>
          <Button danger loading={deleteLoading === record.key} onClick={() => handleDelete(record.key)}>Delete</Button>
        </div>
      ),
    },
  ];

  const mappedData = filteredData?.map((code) => ({
    key: code._id,
    code: code.code,
    price: code.price,
    createdAt: code.createdAt,
    lectureId: code.lectureId,
    isUsed: code.isUsed,
  }));

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

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
    <>
      {contextHolder}
      <div className="w-full">
        <div className="w-full flex justify-between items-center my-2 p-5">
          <Input
            placeholder="Search Code"
            onChange={(e) => setSearch(e.target.value)}
            className="md:w-[40%] w-1/2"
          />
          <GenerateCodeModel setOpen={setOpen} open={open} />
        </div>
        <Table<DataType>
          columns={columns}
          dataSource={mappedData}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: mappedData?.length,
            showSizeChanger: true, // Allows users to change the number of rows per page
            pageSizeOptions: ['5', '10', '20', '50'],
          }}
          onChange={handleTableChange} // Update pagination when page changes
        />
      </div>
    </>
  );
};

export default CodesTable;
