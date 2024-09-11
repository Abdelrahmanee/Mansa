import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from '@ant-design/icons';
import React from 'react'
import { UploadProps } from "antd";
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { IFormInput } from "../../utils/types";



type PersonalInfoProps = {
  control: Control<IFormInput>;
  errors: FieldErrors<IFormInput>;
};

export const UploadPicture: React.FC<PersonalInfoProps> = ({control,errors  }) => {

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: () => false, // Prevent automatic upload
    onChange(info) {
      console.log('Selected files:', info.fileList);
    },
  };

  console.log(errors);
  
  return (
    <>


      <div className="flex  flex-nowrap justify-center items-center gap-2 my-7 md:min-h-[295px] ">
        <div className="relative  flex flex-col justify-center items-center">
          <Controller
            name="files"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Dragger
                {...uploadProps}
                onChange={(info) => {
                  // console.log('Files selected:', info.fileList);
                  const files = info.fileList.map(file => file.originFileObj as File);
                  field.onChange(files); // Update the form state with the selected files
                  // field.value = files
                  // console.log(field);

                }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to add to form data</p>
                <p className="ant-upload-hint">
                  Support for single or bulk upload. The files will not be uploaded automatically.
                </p>
              </Dragger>
            )}
          />
          <span className={`absolute ${errors.files ? 'top-full opacity-100 left-0' : 'top-98 opacity-0'} transition-all duration-300 z-10  text-red-500 md:min-w-[300px] text-sm`}>
            {errors.files && errors.files.message}
          </span>
        </div>
      </div>


    </>
  )
}
