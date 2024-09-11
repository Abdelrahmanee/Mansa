import { Button, Card, Col, Form, Input, message, Row, Typography } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { validationSchema } from './updateUserValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../Hooks/StoreHooks';
import { useMutation } from '@tanstack/react-query';
import { updateUser } from '../../utils/api';
import { useState } from 'react';
import { AxiosError, isAxiosError } from 'axios';
import { ErrorResponse, updateUserResponse } from '../../utils/types';
import { toast } from 'react-toastify';
import { setUser } from '../../Store/AuthSlice';


type FormData = z.infer<typeof validationSchema>;

export const UserProfileDetailsPage = () => {

  const user = useAppSelector((state) => state.auth.user)
  const [isLoading, setIsLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch()


  const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    mode: 'all',
    defaultValues: {
      id: user?._id,
      firstName: user?.userName.split(' ')[0],
      lastName: user?.userName.split(' ')[1],
      mobileNumber: user?.mobileNumber,
      city: user?.city,
      GOV: user?.GOV,
      DOB: user?.DOB.slice(0, 10),
    }
  });

  // Define initial values
  const initialValues: FormData = {
    id: user?._id || '',
    firstName: user?.userName.split(' ')[0] || '',
    lastName: user?.userName.split(' ')[1] || '',
    mobileNumber: user?.mobileNumber || '',
    city: user?.city || '',
    GOV: user?.GOV || '',
    DOB: user?.DOB ? user?.DOB.slice(0, 10) : '',
  };

  const getChangedFields = (values: FormData) => {
    const changedFields: Partial<FormData> = {};
    Object.keys(values).forEach((key) => {
      if (values[key as keyof FormData] !== initialValues[key as keyof FormData]) {
        changedFields[key as keyof FormData] = values[key as keyof FormData];
      }
    });
    return changedFields;
  };

  const mutation = useMutation({
    mutationFn: async (data: Partial<{
      id: string;
      firstName: string;
      lastName: string;
      GOV: string;
      city: string;
      mobileNumber: string;
      DOB: string;
    }>) => {
      return await updateUser(data)
    },
    onSuccess: () => {
      toast.success('Signup successful!');
      setIsLoading(false)
    },
    onError: (error) => {
      console.log('Error:', error);
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
      setIsLoading(false)
    }
  })


  const onFinish = async (values: z.infer<typeof validationSchema>) => {
    setIsLoading(true)
    const changedValues = getChangedFields(values);
    console.log('Changed Fields:', changedValues);
    if (Object.keys(changedValues).length === 0) {
      console.log('No changes to submit.');
      messageApi.open({
        type: 'error',
        content: 'No changes to submit.',
      });
      setIsLoading(false)
      return;
    }

    const res = await mutation.mutateAsync(changedValues) as updateUserResponse
    console.log(res);
    dispatch(setUser(res.data))

  };


  return (
    <Card className='w-full'>
      {contextHolder}
      <form onSubmit={handleSubmit(onFinish)}>
        <Row gutter={[16, 0]}>
          <Col xs={24} lg={24}>
            <Form.Item<z.infer<typeof validationSchema>>
              label="User ID"
              className='w-full'
            >
              <Input
                value={user?._id}
                readOnly={true}
                suffix={
                  <Typography.Paragraph
                    copyable={{ text: user?._id }}
                    style={{ margin: 0 }}
                  ></Typography.Paragraph>
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <div className="relative w-full">
              <Controller
                name='firstName'
                control={control}
                render={({ field }) => (
                  <Form.Item<z.infer<typeof validationSchema>>
                    label="First name"
                  >
                    <Input {...field} />
                  </Form.Item>
                )}
              />
              <span className={`absolute ${errors.firstName ? 'top-full opacity-100 ' : 'top-0 opacity-0 '} transition-all duration-300 z-10  text-red-500 md:min-w-[300px] text-xs`}>
                {errors.firstName && errors.firstName.message}
              </span>
            </div>
          </Col>
          <Col xs={24} lg={12}>
          <div className="relative w-full">
            <Controller
              name='lastName'
              control={control}
              render={({ field }) => (
                <Form.Item<z.infer<typeof validationSchema>>
                  label="Last name"
                >
                  <Input {...field} />
                </Form.Item>
              )}
            />
            <span className={`absolute ${errors.lastName ? 'top-full opacity-100 ' : 'top-0 opacity-0 '} transition-all duration-300 z-10  text-red-500 md:min-w-[300px] text-xs`}>
                {errors.lastName && errors.lastName.message}
              </span>
            </div>
          </Col>
          <Col xs={24} lg={24}>
          <div className="relative w-full">
            <Controller
              name='mobileNumber'
              control={control}
              render={({ field }) => (
                <Form.Item<z.infer<typeof validationSchema>>
                  label="Phone"
                >
                  <Input {...field} />
                </Form.Item>
              )}
            />
            <span className={`absolute ${errors.mobileNumber ? 'top-full opacity-100 ' : 'top-0 opacity-0 '} transition-all duration-300 z-10  text-red-500 md:min-w-[300px] text-xs`}>
                {errors.mobileNumber && errors.mobileNumber.message}
              </span>
            </div>
          </Col>
          <Col xs={24} lg={8}>
          <div className="relative w-full">
            <Controller
              name='DOB'
              control={control}
              render={({ field }) => (
                <Form.Item<z.infer<typeof validationSchema>>
                  label="Date of Birth"
                >
                  <Input {...field} />
                </Form.Item>
              )}
            />
            <span className={`absolute ${errors.DOB ? 'top-full opacity-100 ' : 'top-0 opacity-0 '} transition-all duration-300 z-10  text-red-500 md:min-w-[300px] text-xs`}>
                {errors.DOB && errors.DOB.message}
              </span>
            </div>
          </Col>
          <Col xs={24} lg={8}>
          <div className="relative w-full">
            <Controller
              name='city'
              control={control}
              render={({ field }) => (
                <Form.Item<z.infer<typeof validationSchema>>
                  label="City"
                >
                  <Input {...field} />
                </Form.Item>
              )}
            />
            <span className={`absolute ${errors.city ? 'top-full opacity-100 ' : 'top-0 opacity-0 '} transition-all duration-300 z-10  text-red-500 md:min-w-[300px] text-xs`}>
                {errors.city && errors.city.message}
              </span>
            </div>
          </Col>
          <Col xs={24} lg={8}>
          <div className="relative w-full">
            <Controller
              name='GOV'
              control={control}
              render={({ field }) => (
                <Form.Item<z.infer<typeof validationSchema>>
                  label="GOV"
                >
                  <Input {...field} />
                </Form.Item>
              )}
            />
            <span className={`absolute ${errors.GOV ? 'top-full opacity-100 ' : 'top-0 opacity-0 '} transition-all duration-300 z-10  text-red-500 md:min-w-[300px] text-xs`}>
                {errors.GOV && errors.GOV.message}
              </span>
            </div>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" loading={isLoading} htmlType="submit" icon={<SaveOutlined />}>
            Save changes
          </Button>
        </Form.Item>
      </form>
    </Card>
  );
};