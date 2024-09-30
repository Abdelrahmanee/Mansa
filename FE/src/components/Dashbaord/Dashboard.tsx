import { Button, Layout, Menu, theme } from "antd"

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  VideoCameraOutlined,
  BarChartOutlined,
  UserOutlined,
  BarcodeOutlined
} from '@ant-design/icons';
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const getActiveMenuItem = () => {
    const path = location.pathname;
    if (path === '/dashboard') return '1';
    if (path.includes('/dashboard/students')) return '2';
    if (path.includes('/dashboard/lecturers')) return '3';
    if (path.includes('/dashboard/codes')) return '4';
    if (path.includes('/dashboard/lectures/add')) return '3';
    return '1'; 
  };


  return (
    <Layout className='min-h-screen'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard</title>
      </Helmet>
      <Sider trigger={null} breakpoint="lg"
        style={{backgroundColor: colorBgContainer}}
        collapsedWidth="0"
        className="bg-white"
        onBreakpoint={(broken) => {
          setCollapsed(broken)
        }}
        onCollapse={(collapsed, type) => {
        }} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical bg-white" />
        <Menu
          theme="light"
          mode="vertical"
          className='h-full bg-white'
          selectedKeys={[getActiveMenuItem()]}
          items={[
            {
              key: '1',
              icon: <BarChartOutlined />,
              label: 'Statistics',
              onClick: () => navigate('/dashboard'),
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'Students',
              onClick: () => navigate('/dashboard/students'),
            },
            {
              key: '3',
              icon: <VideoCameraOutlined />,
              label: 'Lecturers',
              onClick: () => navigate('/dashboard/lecturers'),
            },
            {
              key: '4',
              icon: <BarcodeOutlined />,
              label: 'Codes',
              onClick: () => navigate('/dashboard/codes'),
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
  )
}

export default Dashboard