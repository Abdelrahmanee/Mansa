import { Card, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import SignupForm from './SignupForm';
import register from '../../Assets/register.png'



function Signup() {

  return (
    <div className='w-full flex flex-col md:flex-row justify-center items-center'>
      <div className="py-5 px-5 min-h-[90vh] flex justify-center items-center">
        <Card color="transparent" shadow={true} className="shadow-lg px-8 py-5 border border-main-100 md:min-w-[700px]">
          <Typography variant="h3" color="blue-gray" className='mt-2'>
            Register
          </Typography>
          <Typography color="gray" className="mt-1 font-normal text-[0.9rem]">
            Nice to meet you! Enter your details to register.
          </Typography>
          <SignupForm />
        </Card>
      </div>
      <div className='w-full h-full'>
        <div className=' p-5 text-center flex flex-col justify-center items-center'>
          <Typography variant='h2' className='text-main-100'>
            Create a new account now
          </Typography>
          <Typography variant='paragraph' className='max-w-[80%]'>
            Unlimited access to 7,000+ world-class courses, hands-on projects, and job-ready certificate programs—all included in your subscription
          </Typography>
        </div>

        <div className='w-full mx-auto flex justify-center items-center'>
        <img src={register} alt="" />
        </div>

      </div>
    </div>

  );
}

export default Signup;
