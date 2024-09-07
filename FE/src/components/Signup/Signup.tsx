import logo from '../../Assets/Group.png';
import { ErrorResponse, IFormInput } from "../../utils/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "./signup.validations";
import { useMutation } from "@tanstack/react-query";
import { AdditionalInfo } from "./AdditionalInfo";
import { AxiosError, isAxiosError } from "axios";
import { UploadPicture } from "./UploadPicture";
import { PersonalInfo } from "./PersonalInfo";
import { useForm } from "react-hook-form";
import { signup } from "../../utils/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Steps } from "antd";
import { useState } from "react";

export const Signup = () => {

  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const { control, handleSubmit, formState: { errors }, trigger, reset, getValues } = useForm<IFormInput>({
    defaultValues: {
      firstName: '', lastName: '', password: '', email: '', DOB: '', city: '', GOV: '', mobileNumber: '', files: []
    },
    resolver: zodResolver(signupSchema),
    mode: 'all',
  });

  const resetForm = () => {
    reset({
      mobileNumber: '',
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      city: '',
      DOB: '',
      GOV: '',
      sex: '',
      files: []
    });
  };


  const mutatuion = useMutation({
    mutationFn: async (formData: FormData) => {
      return await signup(formData)
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
      setIsLoading(false);
    },
    onSuccess: () => {
      toast.success('Signup successful!');
      setIsLoading(false);
      resetForm();
    },
    retry: false
  })


  const onSubmit = async (data: IFormInput) => {
    // handle form submission
    setIsLoading(true);

    const formData = new FormData();

    for (const key in data) {
      if (key === 'files') {
        formData.append('profilePicture', data[key][0]);
      } else {
        const value = data[key as keyof IFormInput];
        if (typeof value === 'string') {
          formData.append(key, value);
        } else if (value instanceof File) {
          formData.append(key, value);
        }
      }
    }

    await mutatuion.mutateAsync(formData)
    setCurrentStep(0)
  }


  const nextStep = async (failedFields: (keyof IFormInput)[]) => {
    const isValid = await trigger(failedFields);
    if (isValid) {
      setCurrentStep((prevStep) => prevStep + 1);
      reset({ ...getValues() });
    }
  };
  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const steps = [
    {
      title: 'Personal Info',
      content: <PersonalInfo control={control} errors={errors} />,
    },
    {
      title: 'Additional Info',
      content: <AdditionalInfo control={control} errors={errors} />,
    },
    {
      title: 'Last Step',
      content: <UploadPicture control={control} errors={errors} />,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title, description: "this is a discription" }));


  return (
    <>
      <div className="font-[sans-serif] bg-white flex items-center md:h-screen p-4">
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-16 bg-gray-50 shadow w-full sm:p-8 p-6 rounded-xl relative md:h-[646px]">
            <div>
              <div className="mb-10">
                <Link to='/'><img
                  src={logo} alt="logo" className='w-36 inline-block' />
                </Link>
              </div>

              <div className="space-y-8 h-full">
                <Steps direction="vertical" current={currentStep} items={items} className="h-full md:h-2/3" />
              </div>
            </div>

            <form className="md:max-w-full w-fullmx-auto" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <h3 className="text-gray-800 font-Roboto text-3xl font-extrabold">Register</h3>
              </div>

              <div className="space-y-4">

                {steps[currentStep].content}
              </div>

              <div className="mt-12 text-right">
              {currentStep > 0 && (
                  <Button style={{ margin: '0 8px' }} onClick={prevStep}>
                    Previous
                  </Button>
                )}
                {currentStep < steps.length - 1 && (
                  <Button type="primary" onClick={() => {
                    if (currentStep === 0) {
                      return nextStep(['firstName', 'lastName', 'email', 'password', 'mobileNumber'])
                    } else if (currentStep === 1) {
                      return nextStep(['DOB', 'city', 'GOV', 'sex'])
                    } else if (currentStep === 2) {
                      return nextStep(['files'])
                    }
                  }}>
                    Next
                  </Button>
                )}
                {currentStep === steps.length - 1 && (
                  <Button type="primary" loading={isLoading} htmlType="submit">
                    {isLoading ? 'Loading' : 'Submit'}
                  </Button>
                )}
              </div>

              <p className="text-sm text-gray-800  mt-6 text-center">Already have an account? <Link to='/login' className="text-blue-600 font-semibold hover:underline ml-1">Login here</Link></p>
            </form>
            <div className="divider absolute left-[33.333%] top-[-3%]  w-1 h-full border-l border-gray-400 max-md:hidden"></div>
          </div>
        </div>
      </div></>
  )
}
