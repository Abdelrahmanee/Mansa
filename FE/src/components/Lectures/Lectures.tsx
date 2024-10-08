import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FilePdfOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


const { Header, Sider, Content } = Layout;

const Lectures: React.FC = () => {


  const { lectureId } = useParams()
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();






  return (
    <Layout className='min-h-screen'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Lecture</title>
      </Helmet>
      <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={0}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          className='h-full'
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Lecture Details',
              onClick: () => {
                navigate(`/lecture/${lectureId}`)
              }
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Videos',
              onClick: () => {
                navigate(`/lecture/${lectureId}/videos`)
              }
            },
            {
              key: '3',
              icon: <FilePdfOutlined />,
              label: 'Pdfs',
              onClick: () => {
                navigate(`/lecture/${lectureId}/pdfs`)
              }
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Lectures;