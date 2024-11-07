import React, { useState } from 'react';
import { Button, Input, Modal, Select, Spin, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { generateAccessCode, getLectures } from '../../../utils/api'; // Assuming these APIs exist
import { Lecture } from '../../../utils/types'; // Assuming you have a Lecture type defined
import useLectures from '../../../Hooks/useLecutres';

interface GenerateCodeModelProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const { Option } = Select;
const { Text } = Typography;

const GenerateCodeModel: React.FC<GenerateCodeModelProps> = ({ setOpen, open }) => {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Track the current step (1 for selecting lecture, 2 for displaying code)
  const [selectedLecture, setSelectedLecture] = useState<string | null>(null); // Selected lecture ID
  const [generatedCode, setGeneratedCode] = useState<string | null>(null); // Store generated code

  // Fetch lectures
  const { data: lectures, isLoading: lecturesLoading } = useLectures();


  const {mutateAsync: generateCode} = useMutation({
    mutationFn: async (lectureId: string) => await generateAccessCode(lectureId),
    onSuccess: (data) => {
      setGeneratedCode(data.data.code);
      setStep(2);
      queryClient.invalidateQueries({ queryKey: ['codes'] })
    },
    onError: (error) => {
      console.error('Failed to generate code:', error);
    },
    onSettled: () => {
      setLoading(false);
    }
  })

  // Handle moving to the next step after selecting a lecture
  const handleNext = async () => {
    if (!selectedLecture) return;
    setLoading(true);

    try {
      await generateCode(selectedLecture);
      setStep(2); // Move to step 2 to display the code
    } catch (error) {
      console.error('Failed to generate code:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setStep(1); // Reset step to 1 when modal closes
    setSelectedLecture(null);
    setGeneratedCode(null);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        <PlusOutlined /> Generate Code
      </Button>
      <Modal
        open={open}
        title={step === 1 ? 'Select Lecture' : 'Generated Code'}
        onCancel={handleCancel}
        footer={step === 1 ? [
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" disabled={!selectedLecture} loading={loading} onClick={handleNext}>
            Next
          </Button>,
        ] : [
          <Button key="back" onClick={handleCancel}>
            Done
          </Button>,
        ]}
      >
        {step === 1 ? (
          <>
            <p>Select the lecture for which you want to generate a code:</p>
            {lecturesLoading ? (
              <Spin />
            ) : (
              <Select
                style={{ width: '100%', marginTop: '10px' }}
                placeholder="Select a lecture"
                onChange={(value) => setSelectedLecture(value)}
              >
                {lectures?.data.map((lecture) => (
                  <Option key={lecture._id} value={lecture._id}>
                    {lecture.title}
                  </Option>
                ))}
              </Select>
            )}
          </>
        ) : (
          <>
            <p>The code has been successfully generated for the selected lecture:</p>
            <Input
                value={generatedCode as string}
                className='mt-2'
                readOnly={true}
                suffix={
                  <Typography.Paragraph
                    copyable={{ text: generatedCode as string }}
                    style={{ margin: 0 }}
                  ></Typography.Paragraph>
                }
              />
          </>
        )}
      </Modal>
    </>
  );
};

export default GenerateCodeModel;
