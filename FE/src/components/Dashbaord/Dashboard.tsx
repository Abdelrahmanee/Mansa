import { Button, Layout, Menu, theme } from "antd"

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  VideoCameraOutlined,
  BarChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {

  const navigate = useNavigate();
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();



  return (
    <Layout className='min-h-screen'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Sider trigger={null} breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          setCollapsed(broken)
        }}
        onCollapse={(collapsed, type) => {
        }} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          className='h-full'
          defaultSelectedKeys={['1']}
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