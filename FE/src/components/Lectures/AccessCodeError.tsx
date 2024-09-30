import { Button, Result } from "antd";
import React, { useState } from "react";
import {  useNavigate } from 'react-router-dom';
import { onlinePayment } from "../../utils/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { ErrorResponse } from "../../utils/types";


interface AccessCodeErrorProps {
  lectureId: string;
}

const AccessCodeError: React.FC<AccessCodeErrorProps> = ({ lectureId }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const {mutateAsync} = useMutation({
    mutationFn: () => onlinePayment({ lectureId }),
    onSuccess: (data) => {
      console.log(data.url);
      window.location.href = data.url;
      setIsLoading(false);
    },
    onError: (error) => {
      console.log(error);
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response && axiosError.response.data && axiosError.response.data.message) {
          toast.error(axiosError.response.data.message);
        } else {
          toast.error('An unexpected error occurred');
        }
      } else {
        toast.error('An unexpected error occurred');
      }
      setIsLoading(false);
    }
  });

  const handleOnlinePayment = async () => {
    setIsLoading(true);
    await mutateAsync();
  };


  return (
    <div className='w-full h-[80vh] flex justify-center items-center'>
      <Result
        status="403"
        title="Enter Access Code "
        subTitle="Sorry, you must enter the access code to access this lecture."
        extra={
          <div>
            <Button className='mr-3' disabled={isLoading} loading={isLoading} onClick={() => handleOnlinePayment()}>Buy Access Code</Button>
            <Button type="primary" disabled={isLoading} onClick={() => handleNavigate(`/lecture/${lectureId}/access-code`)}>Enter Code</Button>
          </div>
        }
      />
    </div>
  );
};

export default AccessCodeError;