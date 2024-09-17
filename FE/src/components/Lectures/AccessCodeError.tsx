import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from 'react-router-dom';


interface AccessCodeErrorProps {
  lectureId: string;
}

const AccessCodeError: React.FC<AccessCodeErrorProps> = ({ lectureId }) => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };


  return (
    <div className='w-full h-[80vh] flex justify-center items-center'>
      <Result
        status="403"
        title="Enter Access Code "
        subTitle="Sorry, you must enter the access code to access this lecture."
        extra={
          <div>
            <Button className='mr-3' onClick={() => handleNavigate('/')}>Buy Access Code</Button>
            <Button type="primary"  onClick={() => handleNavigate(`/lecture/${lectureId}/access-code`)}>Enter Code</Button>
          </div>
        }
      />
    </div>
  );
};

export default AccessCodeError;