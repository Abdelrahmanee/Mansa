import {  Control, FieldErrors } from "react-hook-form"
import FormInputField from "./ReusableInputField";
import { IFormInput } from "../utils/signup.modal";

type PersonalInfoProps = {
  control: Control<IFormInput>;
  errors: FieldErrors<IFormInput>;
};

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ control, errors }) => {
  return (
    <>

      <FormInputField
        name="firstName"
        label="Firstname"
        control={control}
        errors={errors}
      />

      <FormInputField
        name="lastName"
        label="Lastname"
        control={control}
        errors={errors}
      />
      <FormInputField
        name="password"
        label="Password"
        control={control}
        errors={errors}
        type="password"
      />
      <FormInputField
        name="email"
        label="Email"
        control={control}
        errors={errors}
        placeholder="xxxx@gmail.com"
      />
      <FormInputField
        name="mobileNumber"
        label="Phone"
        control={control}
        errors={errors}
      />

    </>
  )
}
