import React from 'react';
import { Badge, Button, Card, Col, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useQuery } from '@tanstack/react-query';
import { getLectures } from '../../utils/api';
import { AllLectureResponse } from '../../utils/models';
import { useNavigate } from 'react-router-dom';

const Cards: React.FC = () => {



  const navigate = useNavigate()
  const { data, isLoading ,isError} = useQuery<{ data: AllLectureResponse[], message: string }>({
    queryKey: ['lectures'],
    queryFn: async () => {
      const res = await getLectures();
      return res;
    }
  })

  if (isError) {
    return <div>Error...</div>;
  }
  

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  const handleNavigate = (lectureId: string) => {
    navigate(`/lecture/${lectureId}`);
  };

  return <>
    {isLoading ? <div>loading</div> : <div className='max-w-[80%] mx-auto mt-10 '>
      <div className='w-full flex justify-center items-center mb-5'>
        <div className='relative w-fit mx-auto md:mx-0'>
          <h1
            className='relative font-Acme font-bold font-QuickStand text-4xl  mb-5 pb-0  text-shadow text-black'
          >Features Courses
          </h1>
          <div className='w-3/4 h-1/4 bg-secondary-200 absolute top-[35%]
          left-[12.5%] -z-10'></div>
        </div>
      </div>
      <Row gutter={[16, 16]}>
        {data?.data.slice(0, 6).map((lecture, index) => (
          <Col lg={8} sm={12} xs={24} key={lecture._id}>
            {index === 0 || index === 2 ? (
              <Badge.Ribbon text="Best Seller">
                <Card bordered={true} className="hover:shadow transition-all duration-300" cover={<img alt="example" src={lecture.logo} />}>
                  <Meta title={lecture.title} description={lecture.description} />
                  <div className="flex justify-between items-center mt-3 font-Roboto">
                    <p>{lecture.duration}hrs</p>
                    <p className="text-blue-500 text-lg">{formatPrice(lecture.price)}</p>
                  </div>
                  <Button type="default" onClick={() => handleNavigate(lecture._id)} block className="mt-5">Go to Course</Button>
                </Card>
              </Badge.Ribbon>
            ) : (
              <Card bordered={true} className="hover:shadow transition-all duration-300" cover={<img alt="example" src={lecture.logo} />}>
                <Meta title={lecture.title} description={lecture.description} />
                <div className="flex justify-between items-center mt-3 font-Roboto">
                  <p>{lecture.duration}hrs</p>
                  <p className="text-blue-500 text-lg">{formatPrice(lecture.price)}</p>
                </div>
                <Button type="default" onClick={() => handleNavigate(lecture._id)} block className="mt-5">Go to Course</Button>
              </Card>
            )}
          </Col>
        ))}
      </Row>
    </div>}

  </>
}

export default Cards;