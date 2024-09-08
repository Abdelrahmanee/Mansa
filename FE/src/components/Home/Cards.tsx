import React from 'react';
import { Badge, Button, Card, Col, Row } from 'antd';
import Meta from 'antd/es/card/Meta';

const Cards: React.FC = () => (

  <div className='max-w-[80%] mx-auto mt-10 '>
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
    <Row gutter={[16,16]}>
      <Col lg={8} sm={12} xs={24} >
        <Badge.Ribbon text="Best Seller">
          <Card bordered={true} className='hover:shadow transition-all duration-300' cover={<img alt="example" src="https://img-b.udemycdn.com/course/240x135/1672410_9ff1_5.jpg" />}>
            <Meta
              title="Node.js, Express, MongoDB & More: The Complete Bootcamp"
              description="This is the description of the course.This is the description of the course.This is the description of the course.This is the description of the course.This is the description of the course."
            />
            <div className='flex justify-between items-center mt-3 font-Roboto'>
              <p>7hrs</p>
              <p className='text-blue-500 text-lg'>500$</p>
            </div>
            <Button type="default" block className='mt-5'>Go to Course</Button>
          </Card>
        </Badge.Ribbon>
      </Col>
      <Col lg={8} sm={12} xs={24}>
        <Card bordered={true} className='hover:shadow transition-all duration-300' cover={<img alt="example" src="https://img-b.udemycdn.com/course/240x135/5733206_875e.jpg" />}>
          <Meta
            title="Node.js, Express, MongoDB & More: The Complete Bootcamp"
            description="This is the description of the course.This is the description of the course.This is the description of the course.This is the description of the course.This is the description of the course."
          />
          <div className='flex justify-between items-center mt-3 font-Roboto'>
            <p>7hrs</p>
            <p className='text-blue-500 text-lg'>500$</p>
          </div>
          <Button type="default" block className='mt-5'>Go to Course</Button>
        </Card>
      </Col>
      <Col lg={8} sm={12} xs={24}>
        <Card bordered={true} className='hover:shadow transition-all duration-300' cover={<img alt="example" src="	https://img-b.udemycdn.com/course/240x135/5620946_7c11.jpg" />}>
          <Meta
            title="Node.js, Express, MongoDB & More: The Complete Bootcamp"
            description="This is the description of the course.This is the description of the course.This is the description of the course.This is the description of the course.This is the description of the course."
          />
          <div className='flex justify-between items-center mt-3 font-Roboto'>
            <p>7hrs</p>
            <p className='text-blue-500 text-lg'>500$</p>
          </div>
          <Button type="default" block className='mt-5'>Go to Course</Button>
        </Card>
      </Col>
    </Row>
  </div>
);

export default Cards;