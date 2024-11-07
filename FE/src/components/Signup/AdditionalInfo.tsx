import { Control, Controller, FieldErrors } from "react-hook-form";
import { DatePicker, Select } from "antd";
import React from "react";
import FormInputField from "./ReusableInputField";
import { IFormInput } from "../../utils/types";
import dayjs from 'dayjs';

type PersonalInfoProps = {
  control: Control<IFormInput>;
  errors: FieldErrors<IFormInput>;
};

export const AdditionalInfo: React.FC<PersonalInfoProps> = ({ control, errors }) => {
  return (
    <>
      <div>
        <label htmlFor='BOD' className="text-gray-800 text-sm mb-1 block">
          BOD:
        </label>
        <div className="relative flex items-center mb-6">
          <Controller
            name="DOB"
            control={control}
            render={({ field }) => (
              <DatePicker
                placeholder="Select your date of birth"
                className="w-full"
                status={errors.DOB ? "error" : undefined}
                {...field}
                value={field.value ? dayjs(field.value, 'YYYY-MM-DD') : null}
                onChange={(date, dateString) => {
                  field.onChange(date ? dayjs(date).format('YYYY-MM-DD') : null);
                }}
              />
            )}
          />


          <span className={`absolute ${errors.DOB ? 'top-full opacity-100 left-0' : 'top-[70%] opacity-0'} transition-all duration-500 z-10 text-red-500 md:min-w-[300px] text-sm`}>
            {errors.DOB && errors.DOB.message}
          </span>

        </div>
      </div>


      <FormInputField
        name="city"
        label="city"
        control={control}
        errors={errors}
      />

      <FormInputField
        name="GOV"
        label="GOV"
        control={control}
        errors={errors}
      />


      <div>
        <label htmlFor="gender" className="text-gray-800 text-sm mb-1 block">Gender: </label>
        <div className="relative flex items-center mb-6">
          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <Select
                placeholder="Select your gender"
                className="w-full"
                status={errors.sex ? "error" : undefined}
                {...field}
                options={[
                  { value: 'male', label: 'male' },
                  { value: 'female', label: 'female' },
                ]}
              />
            )}
          />
          <span className={`absolute ${errors.sex ? 'top-full opacity-100 left-0' : 'top-0 opacity-0'} transition-all duration-300 -z-10  text-red-500 md:min-w-[300px] text-sm`}>
            {errors.sex && errors.sex.message}
          </span>
        </div>
      </div>




    </>
  )
}
