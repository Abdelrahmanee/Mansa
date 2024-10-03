import { useQuery } from '@tanstack/react-query';
import { CheckStudentAccess } from '../../utils/api';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import AccessCodeError from './AccessCodeError';
import { Helmet } from 'react-helmet-async';


export const ProtectedLectureRoute = ({ children, lectureId }: { children: React.ReactNode, lectureId: string }) => {




  const { data, error, isLoading, isError } = useQuery<{
    status: string;
    message: string;
    hasAccess: boolean;
  }>({
    queryKey: ['check-student-access', lectureId],
    queryFn: () => CheckStudentAccess(lectureId),
    refetchOnWindowFocus: false,
    enabled: !!lectureId,
    retry: 1,
  });





  if (isError || error || (data && !data.hasAccess)) {
    return <AccessCodeError lectureId={lectureId} />;
  }


  return isLoading ? (
    <div className='w-full h-screen flex justify-center items-center'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Lecture</title>
      </Helmet>
      <Spin indicator={<LoadingOutlined spin />} size='large' />
    </div>
  ) : (
    data?.hasAccess ? children : null
  )

};
