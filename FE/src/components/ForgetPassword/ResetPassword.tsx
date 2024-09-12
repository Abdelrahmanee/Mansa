import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Button, Col, Form, Input, Row } from "antd"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { setNewPassword } from "../../utils/api"
import { AxiosError, isAxiosError } from "axios"
import { ErrorResponse } from "../../utils/types"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const ResetPassword = () => {


  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const validationSchema = z.object({
    identifier: z.string({ message: "Email Is Required " }).email({ message: 'Please enter a valid identifier' }),
    new_password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    otp: z.string().min(6, { message: 'OTP must be at least 6 numbers' })
  })


  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof validationSchema>>({
    defaultValues: {
      identifier: '',
      new_password: '',
      otp: ''
    },
    resolver: zodResolver(validationSchema),
    mode: 'all'
  })


  const mutation = useMutation({
    mutationFn: async (data: {
      identifier: string;
      new_password: string;
      otp: string;
    }) => {
      return await setNewPassword(data)
    },
    onSuccess: () => {
      toast.success('Password reset successfully!');
      navigate('/')
      setIsLoading(false)
    },
    onError: (error) => {
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

  const onSubmit = async (data: z.infer<typeof validationSchema>) => {
    setIsLoading(true)
    console.log(data)
    await mutation.mutateAsync(data)
  }

  return (
    <div className="w-full min-h-[80vh] flex justify-center items-center">
      <div className="w-full md:w-1/2 p-5 pb-3 shadow rounded-xl border-blue-500 border border-spacing-1">
        <h1 className="font-Roboto font-bsemiold mb-2 text-xl">Enter your Detials : </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mt-4" gutter={[16,0]} >
          <Col xs={24} >
          <div className="relative w-full">
            <Controller
              name='identifier'
              control={control}
              render={({ field }) => (
                <Form.Item<z.infer<typeof validationSchema>>
                  label="Enter Email : "
                >
                  <Input {...field} status={errors.identifier ? 'error' : undefined} />
                </Form.Item>
              )}
            />
            <span className={`absolute ${errors.identifier ? 'top-full opacity-100 ' : 'top-0 opacity-0 '} transition-all duration-300 z-10  text-red-500 md:min-w-[300px] text-xs`}>
                {errors.identifier && errors.identifier.message}
              </span>
            </div>
          </Col>
          <Col xs={24} >
          <div className="relative w-full">
            <Controller
              name='new_password'
              control={control}
              render={({ field }) => (
                <Form.Item<z.infer<typeof validationSchema>>
                  label="New password : "
                >
                  <Input.Password {...field} status={errors.new_password ? 'error' : undefined} />
                </Form.Item>
              )}
            />
            <span className={`absolute ${errors.new_password ? 'top-full opacity-100 ' : 'top-0 opacity-0 '} transition-all duration-300 z-10  text-red-500 md:min-w-[300px] text-xs`}>
                {errors.new_password && errors.new_password.message}
              </span>
            </div>
          </Col>

          <Col xs={24} >
          <div className="relative w-full">
            <Controller
              name='otp'
              control={control}
              render={({ field }) => (
                <Form.Item<z.infer<typeof validationSchema>>
                  label="Enter your OTP : "
                >
                  <Input.OTP {...field} status={errors.otp ? 'error' : undefined} />
                </Form.Item>
              )}
            />
            <span className={`absolute ${errors.otp ? 'top-full opacity-100 ' : 'top-0 opacity-0 '} transition-all duration-300 z-10  text-red-500 md:min-w-[300px] text-xs`}>
                {errors.otp && errors.otp.message}
              </span>
            </div>
          </Col>

          </Row>
          <div className="w-full flex flex-row-reverse">
            <Button type="primary" htmlType="submit" loading={isLoading} className="mt-2 " >
              {isLoading ? 'Loading' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
