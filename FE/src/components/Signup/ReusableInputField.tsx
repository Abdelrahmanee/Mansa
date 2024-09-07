import React from "react";
import { Input } from "antd";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { IFormInput } from "../../utils/models";


interface FormInputFieldProps {
  name: keyof IFormInput;
  label: string;
  control: Control<IFormInput>;
  errors: FieldErrors<IFormInput>;
  type?: "text" | "password";
  placeholder?: string;
}

const FormInputField: React.FC<FormInputFieldProps> = ({
  name,
  label,
  control,
  errors,
  type = "text",
  placeholder,
}) => {
  return (
    <div>
      <label htmlFor={name as string} className="text-gray-800 text-sm mb-1 block">
        {label}:
      </label>
      <div className="relative flex items-center mb-6">
        <Controller
          name={name}
          control={control}
          render={({ field }) =>
            type === "password" ? (
              <Input.Password
                {...field}
                status={errors[name] ? "error" : undefined}
                id={name}
                placeholder={placeholder}
                value={field.value as string}
              />
            ) : (
              <Input
                {...field}
                status={errors[name] ? "error" : undefined}
                id={name}
                placeholder={placeholder}
                value={field.value as string}
              />
            )
          }
        />

          <span className={`absolute ${errors[name] ? 'top-full opacity-100 left-0' : 'top-[70%] opacity-0'} transition-all duration-500 z-10 text-red-500 md:min-w-[300px] text-sm`}>
            {errors[name]?.message}
          </span>

      </div>
    </div>
  );
};

export default FormInputField;
