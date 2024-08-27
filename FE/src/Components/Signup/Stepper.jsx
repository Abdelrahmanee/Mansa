import React from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";

export function DefaultStepper({ handlePrev, handleNext, activeStep, setActiveStep, setIsLastStep, setIsFirstStep }) {


  return (
    <div className="w-full py-4 px-8">
      <Stepper
        // lineClassName="bg-main-100"
        // activeLineClassName="bg-main-300"
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step
          // className="w-fit px-2 rounded-lg  !bg-main-100 text-white/75 cursor-pointer"
          // activeClassName="ring-0 !bg-main-100 !text-white"
          // completedClassName="!bg-main-300 !text-white"
          >1</Step>
        <Step
          // className=" w-fit px-2 rounded-lg  !bg-main-100 text-white/75 cursor-pointer"
          // activeClassName="ring-0 !bg-main-100 text-white"
          // completedClassName="!bg-main-300 text-white"
          >2</Step>
        <Step
          // className=" w-fit px-2 rounded-lg  !bg-main-100 text-white/75 cursor-pointer"
          // activeClassName="ring-0 !bg-main-100 text-white"
          // completedClassName="!bg-main-300 text-white"
          >3</Step>
      </Stepper>
    </div>
  );
}