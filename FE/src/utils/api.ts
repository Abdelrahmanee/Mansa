import axios from "axios";
import { AllLectureResponse, updateUserResponse } from "./types";

const baseUrl: string = "http://localhost:3000/api/v1";

// create new user
export const signup = async (formData: FormData): Promise<unknown> => {
  try {
    const res = await axios.post(`${baseUrl}/auth/sign_up`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log("API Error:", error);
    // Rethrow the error to be handled by the caller
    throw error;
  }
};

// login user
export const login = async (data: {
  identifier: string;
  password: string;
}): Promise<unknown> => {
  const res = await axios.post(`${baseUrl}/auth/login`, data, {
    withCredentials: true, // Include credentials to handle cookies
  });
  return res.data;
};

export const getLectures = async (): Promise<{
  data: AllLectureResponse[];
  message: string;
}> => {
  try {
    const response = await axios.get(`${baseUrl}/lectures/getAllLectures`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      data: [],
      message: "Failed to fetch lectures",
    };
  }
};

export const CheckStudentAccess = async (
  lectureId: string
): Promise<{
  status: string;
  message: string;
  hasAccess: boolean;
}> => {
  const response = await axios.post(
    `${baseUrl}/lectures/check_student_access`,
    {
      lectureId,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const giveUserAccess = async (
  lectureId: string,
  code: string
): Promise<{
  status: string;
  message: string;
}> => {
  const response = await axios.post(
    `${baseUrl}/lectures/lecture_access_request`,
    {
      lectureId,
      code,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const updateUser = async (
  data: Partial<{
    id: string;
    firstName: string;
    lastName: string;
    GOV: string;
    city: string;
    mobileNumber: string;
    DOB: string;
  }>
): Promise<updateUserResponse> => {
  const res = await axios.put(`${baseUrl}/users/update_account`, data, {
    withCredentials: true, // Include credentials to handle cookies
  });
  return res.data;
};
