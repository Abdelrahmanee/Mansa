import { Card, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import SignupForm from './SignupForm';
import register from '../../Assets/register.png'
import { DefaultStepper } from './Stepper';



function Signup() {

  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  return (
    <div className='w-full  flex flex-col md:flex-row justify-center items-center font-QuickSand'>
      <div className="w-full xl:w-1/2 py-5 px-5  min-h-[90vh] flex justify-center items-center">
        <Card color="transparent" shadow={true} className="shadow-lg   px-8 py-5 border border-main-100 min-w-[98%] md:min-w-[600px]">
          <div className='hidden md:block'>
            {/* <h1 className='text-2xl mb-2 font-QuickSand font-bold  text-secondary-100 text-center '>Create your account</h1> */}
            <h2 className="flex flex-row flex-nowrap items-center mb-4">
              <span className="flex-grow block border-t border-blue-500"></span>
              <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-blue-500 text-white">
                Create your account
              </span>
              <span className="flex-grow block border-t border-blue-500"></span>
            </h2>
            <DefaultStepper handleNext={handleNext} handlePrev={handlePrev} activeStep={activeStep} setActiveStep={setActiveStep} isLastStep={isLastStep} setIsFirstStep={setIsFirstStep} isFirstStep={isFirstStep} setIsLastStep={setIsLastStep} />
          </div>
          <div className='block md:hidden'>
            <Typography variant="h3"  className='mt-2 font-bold font-QuickSand text-blue-500'>
              Register
            </Typography>
            <Typography color="gray" className="mt-1 font-normal text-[0.9rem] font-QuickSand">
              Nice to meet you! Enter your details to register.
            </Typography>          </div>
          <SignupForm handleNext={handleNext} handlePrev={handlePrev} activeStep={activeStep} setActiveStep={setActiveStep} />
        </Card>
      </div>
      {/* <div className='hidden xl:block xl:w-1/2 h-full'>
        <div className=' p-5 text-center flex flex-col justify-center items-center'>
          <Typography variant='h2' className='text-main-100 font-QuickSand font-extrabold'>
            Create a new account now
          </Typography>
          <Typography variant='paragraph' className='max-w-[80%]'>
            Unlimited access to 7,000+ world-class courses, hands-on projects, and job-ready certificate programs—all included in your subscription
          </Typography>
        </div>

        <div className='w-full mx-auto flex justify-center items-center'>
          <img src={register} alt="" />
        </div>

      </div> */}
    </div>

  );
}

export default Signup;