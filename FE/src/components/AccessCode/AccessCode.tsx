import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, message } from "antd";
import { giveUserAccess } from "../../utils/api";
import { useMutation } from "@tanstack/react-query";
import { AccessResponse } from "../../utils/models";
import { AxiosError } from "axios";

export const AccessCode = () => {

  const { lectureId } = useParams<{ lectureId: string }>();
  const naviagte = useNavigate()

  // useMutation for making the POST request
  const { mutateAsync, data: resData } = useMutation<AccessResponse, Error, { lectureId: string; code: string }>({
    mutationFn: ({ lectureId, code }) => giveUserAccess(lectureId, code), // Make POST request
    onSuccess: (data) => {
      // Handle success, e.g., display a success message
      message.success(data.message);
      naviagte(`/lecture/${lectureId}`); // Navigate to the lecture page
    },
    onError: (error: Error) => {
      // Cast the error as AxiosError to check if it's an AxiosError
      const axiosError = error as AxiosError;
    
      if (axiosError.response && axiosError.response.data) {
        // If the error is an Axios error, display the message from the response
        message.error((axiosError.response.data as { message: string }).message);
      } else {
        // Otherwise, handle as a regular error
        message.error(error.message || 'An error occurred');
      }

    },  });

  const validationSchema = z.object({
    code: z.string().min(1, { message: "Access code is required" }).regex(/^[A-Za-z0-9]{12}$/, {
      message: "Access code must be alphanumeric and 12 characters long",
    })
  })

  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      code: "",
    }
  })

  const onSubmit = async (data: z.infer<typeof validationSchema>) => {
    const { code } = data;

    // Call the mutation function with lectureId and code
    if (lectureId) {
      await mutateAsync({ lectureId, code });
      console.log(resData);

    }
  };



  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className="p-5 w-[95%] md:w-1/2 border rounded-lg shadow border-gray-300 flex flex-col gap-4">
        <h1 className="font-QuickStand font-bold md:text-xl">Enter your access code : </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative flex items-center ">
            <Controller
              name='code'
              control={control}
              render={({ field }) =>
                <Input
                  {...field}
                  status={errors.code ? "error" : undefined}
                  id='code'
                  placeholder='Please enter your access code'
                  value={field.value as string}
                />
              }
            />
            <span className={`absolute ${errors.code ? 'top-full opacity-100' : 'top-0 opacity-0'} transition-all duration-300 -z-10  text-red-500 md:min-w-[300px] text-sm`}>
              {errors.code && errors.code.message}
            </span>
          </div>
          <Button type="primary" htmlType="submit" className="mt-6 " block>Submit</Button>
        </form>
      </div>
    </div>
  )
}
