import { useState } from 'react';
import { Button, Input, Form, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createLecture } from '../../../utils/api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError, isAxiosError } from 'axios';
import { ErrorResponse } from '../../../utils/types';

const lectureSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  price: z.number().positive('Price must be a positive number'),
  duration: z.number().positive('Duration must be a positive number'),
  rating: z.number().min(0).max(5, 'Rating must be between 0 and 5'),
  logo: z.any().refine(file => file?.type.includes('image'), 'Logo must be an image'),
  pdf: z.any().refine(file => file?.type === 'application/pdf', 'File must be a PDF'),
  video: z.any().refine(file => file?.type.includes('video'), 'File must be a video'),
});

type LectureFormData = z.infer<typeof lectureSchema>;

const AddLecture = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();


  const mutation = useMutation({
    mutationFn: createLecture,
    onSuccess: (data) => {
      console.log(data);
      messageApi.success('Lecture added successfully');
      navigate('/dashboard/lectures');
    },
    onError: (error) => {
      console.log(error);
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>
        console.log(axiosError.response);
        if (axiosError.response && axiosError.response.data && axiosError.response.data.message) {
          messageApi.error(axiosError.response?.data.message);
        } else {
          messageApi.error('An unexpected error occurred');
        }
      } else {
        messageApi.error('An unexpected error occurred');
      }

    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
    reset
  } = useForm<LectureFormData>({
    resolver: zodResolver(lectureSchema),
    mode: 'onChange',
  });

  const handleFileChange = (field: string, file: File) => {
    setValue(field as keyof LectureFormData, file);
    trigger(field as keyof LectureFormData);
  };

  const onSubmit = async (data: LectureFormData) => {

    const formData = new FormData();
    // Add text fields
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('duration', data.duration.toString());
    formData.append('rating', data.rating.toString());

    // Add file fields
    if (data.logo) formData.append('logo', data.logo);
    if (data.pdf) formData.append('pdfs', data.pdf);
    if (data.video) formData.append('videos', data.video);

    setLoading(true);
    try {
      await mutation.mutateAsync(formData);
      reset();
    } catch (error) {
      console.error('Error adding lecture:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setValue(field as keyof LectureFormData, value as any);
    trigger(field as keyof LectureFormData);
  };

  const titleValue = watch('title');
  const descriptionValue = watch('description');
  const priceValue = watch('price');
  const durationValue = watch('duration');
  const ratingValue = watch('rating');

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      {contextHolder}
      <h1 className='text-2xl font-bold py-5'>Add Lecture</h1>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className='w-full  xl:w-2/3'>
        <Form.Item label="Title" validateStatus={errors.title ? 'error' : ''} help={errors.title?.message as string}>
          <Input
            {...register('title')}
            value={titleValue}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Description" validateStatus={errors.description ? 'error' : ''} help={errors.description?.message as string}>
          <Input.TextArea
            {...register('description')}
            value={descriptionValue}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Price" validateStatus={errors.price ? 'error' : ''} help={errors.price?.message as string}>
          <Input
            type='number'
            {...register('price')}
            value={priceValue}
            onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
          />
        </Form.Item>

        <Form.Item label="Duration" validateStatus={errors.duration ? 'error' : ''} help={errors.duration?.message as string}>
          <Input
            type='number'
            {...register('duration')}
            value={durationValue}
            onChange={(e) => handleInputChange('duration', parseFloat(e.target.value))}
          />
        </Form.Item>

        <Form.Item label="Rating" validateStatus={errors.rating ? 'error' : ''} help={errors.rating?.message as string}>
          <Input
            type='number'
            {...register('rating')}
            value={ratingValue}
            onChange={(e) => handleInputChange('rating', parseFloat(e.target.value))}
          />
        </Form.Item>

        <Form.Item label="Logo" validateStatus={errors.logo ? 'error' : ''} help={errors.logo?.message as string}>
          <Upload
            beforeUpload={(file) => {
              handleFileChange('logo', file);
              return false; // Prevent automatic upload
            }}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Upload Logo</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="PDF" validateStatus={errors.pdf ? 'error' : ''} help={errors.pdf?.message as string}>
          <Upload
            beforeUpload={(file) => {
              handleFileChange('pdf', file);
              return false; // Prevent automatic upload
            }}
            accept="application/pdf"
          >
            <Button icon={<UploadOutlined />}>Upload PDF</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Video" validateStatus={errors.video ? 'error' : ''} help={errors.video?.message as string}>
          <Upload
            beforeUpload={(file) => {
              handleFileChange('video', file);
              return false; // Prevent automatic upload
            }}
            accept="video/*"
          >
            <Button icon={<UploadOutlined />}>Upload Video</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className='w-full'>
            Add Lecture
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddLecture;
