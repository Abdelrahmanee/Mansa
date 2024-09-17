import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button, Input } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod";
import { forgetPassword } from "../../utils/api";
import { toast } from "react-toastify";
import { AxiosError, isAxiosError } from "axios";
import { ErrorResponse } from "../../utils/types";
import { useAppDispatch } from "../../Hooks/StoreHooks";
import { setIdentifier } from "../../Store/ResetpasswordSlice";

export const ForgetPassword = () => {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()

  const mutation = useMutation({
    mutationFn: async (data: { identifier: string }) => {
      return await forgetPassword(data)
    },
    onSuccess: () => {
      toast.success('OTP Sent Successfully!');
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

  const validationSchema = z.object({
    identifier: z.string({ message: "Email Is Required " }).email({ message: 'Please enter a valid identifier' }),
  });

  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      identifier: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof validationSchema>) => {
    setIsLoading(true)
    try {
      // Perform the mutation and wait for it to resolve
      const response = await mutation.mutateAsync(data);
  
      // Since `mutateAsync` resolves on success, this block will run only if it's successful
      if (response) {
        dispatch(setIdentifier({ identifier: data.identifier }));
        navigate('/resetPassword');
      }
    } catch (error) {
      console.error('Error occurred during mutation:', error);
      // Handle the error if needed
    } finally {
      setIsLoading(false); // Ensure loading state is updated after the request
    }
  }

  return (
    <div className="w-full min-h-[80vh] flex justify-center items-center">
      <div className="w-full md:w-1/2 p-5 pb-3 shadow rounded-xl border-blue-500 border border-spacing-1">
        <h1 className="font-Roboto mb-2 text-xl">Enter your email : </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative flex items-center ">
            <Controller
              name='identifier'
              control={control}
              render={({ field }) =>
                <Input
                  {...field}
                  status={errors.identifier ? "error" : undefined}
                  id='identifier'
                  placeholder='Please enter your access identifier'
                  value={field.value as string}
                />
              }
            />
            <span className={`absolute ${errors.identifier ? 'top-full opacity-100' : 'top-0 opacity-0'} transition-all duration-300 -z-10  text-red-500 md:min-w-[300px] text-sm`}>
              {errors.identifier && errors.identifier.message}
            </span>
          </div>
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
