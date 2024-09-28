import React from 'react';
import { ArrowDownOutlined, ArrowUpOutlined ,UserOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

const StatCards: React.FC = () => (
  <Row gutter={[16,16]}>
    <Col lg={6} md={12} sm={12} xs={24}>
      <Card bordered={true} className='border-1 border-gray-300'>
        <Statistic
          title="Active Users"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    <Col lg={6} md={12} sm={12} xs={24}>
      <Card bordered={true} className='border-1 border-gray-300'>
        <Statistic
          title="Idle "
          value={9.3}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    <Col lg={6} md={12} sm={12} xs={24}>
      <Card bordered={true} className='border-1 border-gray-300 '>
        <Statistic
          title="Total Users"
          precision={2}
          value={50}
          valueStyle={{ color: '#3b82f6' }}
          prefix={<UserOutlined />}
        />
      </Card>
    </Col>
    <Col lg={6} md={12} sm={12} xs={24}>
      <Card bordered={true} className='border-1 border-gray-300'>
        <Statistic
          title="Total Income"
          value={2100}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="$"
        />
      </Card>
    </Col>
  </Row>
);

export default StatCards;