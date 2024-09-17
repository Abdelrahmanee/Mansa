import { Button, Input } from "antd"
import { UserOutlined } from '@ant-design/icons';
import { Controller, useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError, isAxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/api";
import { useAppDispatch } from "../../Hooks/StoreHooks";
import { setUser } from "../../Store/AuthSlice";
import { ErrorResponse, LoginResponse } from "../../utils/types";
import { useState } from "react";




export const Login = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const validationSchema = z.object({
    identifier: z.string().refine((value) => {
      // Regular expression for validating phone numbers (example: must be 10 digits)
      const isPhoneNumber = /^\d{11}$/.test(value); 
      
      // Check if the value is a valid email
      const isEmail = z.string().email().safeParse(value).success;
  
      // Pass validation if it's either a valid phone number or a valid email
      return isPhoneNumber || isEmail;
    }, {
      message: "Please enter a valid email or phone number"
    }),
    password: z.string().min(6),
  });


  const mutation = useMutation({
    mutationFn: async (data: { identifier: string, password: string }) => {
      return await login(data)
    },
    onSuccess: () => {
      toast.success('Signup successful!');
      navigate('/')
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


  const { handleSubmit, formState: { errors }, control } = useForm<z.infer<typeof validationSchema>>({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: zodResolver(validationSchema),
    mode: 'all'
  })

  const onSubmit = async (data: z.infer<typeof validationSchema>) => {
    setIsLoading(true)
    const res = await mutation.mutateAsync(data) as LoginResponse
    dispatch(setUser({ user: res.user, token: res.token }))

  }


  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">Sign in to your account and explore a world of possibilities. Your journey begins here.</p>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">User name</label>
                <div className="relative flex items-center mb-6">
                  <Controller
                    name="identifier"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} size="large" type="text" placeholder="Enter user name" prefix={<UserOutlined />} />
                    )}

                  />
                  <span className={`absolute ${errors.identifier ? 'top-full opacity-100' : 'top-0 opacity-0'} transition-all duration-300 -z-10  text-red-500 md:min-w-[300px] text-sm`}>
                    {errors.identifier && errors.identifier.message}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center mb-7">

                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input.Password {...field} size="large" type="password" placeholder="Enter password" />
                    )}
                  />
                  <span className={`absolute ${errors.password ? 'top-full opacity-100' : 'top-0 opacity-0'} transition-all duration-300 -z-10  text-red-500 md:min-w-[300px] text-sm`}>
                    {errors.password && errors.password.message}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to='/forgetPassword' className="text-blue-600 hover:underline font-semibold">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div className="!mt-8">
                {isLoading ? <Button type="primary" block size="large" loading>
                  Loading
                </Button> : <Button htmlType="submit" type="primary" block size="large">
                  Log in
                </Button>}

              </div>

              <p className="text-sm !mt-8 text-center text-gray-800">Don't have an account <Link to='/signup' className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</Link></p>
            </form>
          </div>
          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
            <img src="https://readymadeui.com/login-image.webp" className="w-full h-full max-md:w-4/5 mx-auto block object-cover" alt="Dining Experience" />
          </div>
        </div>
      </div>
    </div>
  )
}
