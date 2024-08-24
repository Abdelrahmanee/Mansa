import { Button, Card, Input, Option, Select, Typography } from '@material-tailwind/react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from '@tanstack/react-query';
import { signupSchema } from './Validation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { signup } from '../../utils/api';


function SignupForm() {

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false)

  const mutation = useMutation({
    mutationFn: async (formData) => {
      return await signup(formData);
    },
    onError: (error) => {
      console.log('Error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred');
      }
      setIsLoading(false)
    },
    onSuccess: (data) => {
      console.log('Data:', data);
      toast.success('Signup successful!');
      setIsLoading(false)
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000, // 1 minute
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });



  const { register, handleSubmit, control, formState: { errors }, setValue ,trigger} = useForm({
    // resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true)

    const formData = new FormData();

    for (const key in data) {
      if (key === 'profilePicture') {
        formData.append(key, data.profilePicture[0])
      } else {
        formData.append(key, data[key])
      }
    }


    try {
      const res = await mutation.mutateAsync(formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }

  };

  const handleNextStep = async (faildName) => {
    const valid = await trigger(faildName);
    console.log(valid);
    
    if (valid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-8 mb-2 flex flex-col gap-4' autoComplete='false'>
      {currentStep === 1 && (<>
        <div className='flex flex-col sm:flex-row  items-center gap-4 '>
          <div className='w-full md:w-1/2'>
            <Input
              className='w-full'
              type="text"
              label="First Name"
              {...register("firstName",{required: {value: true ,message:"firstName is required"} ,})}
              error={!!errors.firstName}
              variant='standard'
            />
            {errors.firstName && <Typography
              variant="small"
              color="gray"
              className="mt-2 flex items-center gap-1 font-normal text-red-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-px h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.firstName?.message}
            </Typography>}
          </div>
          <div className='w-full md:w-1/2'>
            <Input
              className='w-full'
              type="text"
              label="Last Name"
              variant='standard'
              {...register("lastName")}
              error={!!errors.lastName}
            />
            {errors.lastName && <Typography
              variant="small"
              color="gray"
              className="mt-2 flex items-center gap-1 font-normal text-red-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-px h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.lastName?.message}
            </Typography>}
          </div>
        </div>
        <Button onClick={()=>handleNextStep(['firstName','lastName'])} className="mt-2 bg-main-300">Next</Button>
      </>)}


      {currentStep === 2 && (<>
        <div>
          <Input
            className='w-full'
            type="email"
            label="Email"
            variant='standard'
            {...register("email")}
            error={!!errors.email}
          />
          {errors.email && <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal text-red-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-px h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            {errors.email?.message}
          </Typography>}
        </div>
        <div>
          <Input
            className='w-full'
            type="password"
            label="Password"
            variant='standard'
            {...register("password")}
            error={!!errors.password}
          />
          {errors.password && <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal text-red-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-px h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            {errors.password?.message}
          </Typography>}
        </div>

        <div className='flex justify-between'>
          <Button onClick={handlePrevStep} className="mt-2 bg-gray-400">Previous</Button>
          <Button onClick={()=>handleNextStep(['email','password'])} className="mt-2 bg-main-300">Next</Button>
        </div>
      </>)}



      {currentStep == 3 && (<>


        <div>
          <Input
            className='w-full'
            type="tel"
            label="Mobile Number"
            variant='standard'
            {...register("mobileNumber")}
            error={!!errors.mobileNumber}
          />
          {errors.mobileNumber && <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal text-red-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-px h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            {errors.mobileNumber?.message}
          </Typography>}
        </div>


        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Choose your profile picture</span>
            </div>
            <input type="file" className="file-input file-input-bordered file-input-sm w-full max-w-xs" {...register('profilePicture')} />
          </label>
          {errors.profilePicture && <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal text-red-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-px h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            {errors.profilePicture?.message}
          </Typography>}
        </div>

        <div className='flex justify-between'>
          <Button onClick={handlePrevStep} className="mt-2 bg-gray-400">Previous</Button>
          <Button type="submit" className="mt-2 bg-main-300">Submit</Button>
        </div>

      </>)}






      {isLoading ? <Button type="submit" loading={isLoading} className="flex justify-center items-center text-center mt-2">Loading</Button> : <Button type="submit" className="mt-2 bg-main-300">Submit</Button>}

    </form>
  )
}

export default SignupForm