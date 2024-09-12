import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { CheckStudentAccess } from '../../utils/api';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Result, Spin } from 'antd';


export const ProtectedLectureRoute = ({ children, lectureId }: { children: React.ReactNode, lectureId: string }) => {
  const navigate = useNavigate();

  const handleNavigate = (path :string) => {
    navigate(path);
  };

  const { data, error, isLoading , isError} = useQuery<{
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
    return <div className='w-full h-screen flex justify-center items-center'>
      <Result
        status="403"
        title="Enter Access Code "
        subTitle="Sorry, you must enter the access code to access this lecture."
        extra={
          <div>
            <Button className='mr-3' onClick={()=>handleNavigate(`/`)}>Back Home</Button>
            <Button type="primary" onClick={()=>handleNavigate(`/lecture/${lectureId}/access-code`)}>Enter Code</Button>
          </div>
        }
      />
    </div>;
  }


  return isLoading ? (
    <div className='w-full h-screen flex justify-center items-center'>
      <Spin indicator={<LoadingOutlined spin />} size='large' />
    </div>
  ) : (
    data?.hasAccess ? children : null
  )

};
