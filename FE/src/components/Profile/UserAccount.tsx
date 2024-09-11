import {
  Card,
  Col,
  ConfigProvider,
  Descriptions,
  DescriptionsProps,
  Image,
  Row,
  theme,
  Typography,
} from 'antd';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../Hooks/StoreHooks';
import moment from 'moment';

const { Link } = Typography;






export const UserAccountLayout = () => {
  const {
    token: { borderRadius },
  } = theme.useToken();

  const user = useAppSelector((state)=> state.auth.user)

  const formattedDate = moment(user?.DOB).format('MMMM D, YYYY');


  const DESCRIPTION_ITEMS: DescriptionsProps['items'] = [
    {
      key: 'full-name',
      label: 'Name',
      children: <span>{user?.userName}</span>,
    },
    {
      key: 'job-title',
      label: 'Job title',
      children: <span>{user?.role}</span>,
    },
    {
      key: 'email',
      label: 'Email',
      children: <Link href={`mailto:${user?.email}`}>{user?.email}</Link>,
    },
    {
      key: 'telephone',
      label: 'Phone',
      children: <Link href={`tel:${user?.mobileNumber}`}>{user?.mobileNumber}</Link>,
    },
    {
      key: 'city',
      label: 'City',
      children: <span>{user?.city}</span>,
    },
    {
      key: 'gov',
      label: 'GOV',
      children: <span>{user?.GOV}</span>,
    },
    {
      key: 'gender',
      label: 'Gender',
      children: <span>{user?.sex}</span>,
    },
    {
      key: 'dob',
      label: 'Date of Birth',
      children: <span>{formattedDate}</span>,
    },

  ];

  return (
    <>
        <Card
          actions={[
            <ConfigProvider
              theme={{
                components: {
                  Tabs: {
                    colorBorderSecondary: 'none',
                  },
                },
              }}
            >
            </ConfigProvider>,
          ]}
        >
          <Row gutter={[20, 0]}>
            <Col xs={24} sm={8} lg={4}>
              <Image
                src={user?.profilePicture}
                alt="user profile image"
                height="100%"
                width="100%"
                style={{ borderRadius }}
              />
            </Col>
            <Col xs={24} sm={16} lg={20}>
              <Descriptions
                title="User Info"
                items={DESCRIPTION_ITEMS}
                column={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
              />
            </Col>
          </Row>
        </Card>
        <div style={{ marginTop: '1.5rem' }}>
          <Outlet />
        </div>
    </>
  );
};