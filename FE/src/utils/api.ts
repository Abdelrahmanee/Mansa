import axios from "axios";
import {
  AllLectureResponse,
  LectureByID,
  LoginResponse,
  StudentLecturesResponse,
  updateUserResponse,
  User,
} from "./types";
import api from "./apiRequestWithToken";

const baseUrl: string = "https://mansasc-system.vercel.app/api/v1";

// const headers: { token: string } = {
//   token: localStorage.getItem("token") || "",
// };

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
}): Promise<LoginResponse> => {
  const res = await axios.post(`${baseUrl}/auth/login`, data);
  return res.data;
};

export const getLectures = async (): Promise<{
  data: AllLectureResponse[];
  message: string;
}> => {
  try {
    const response = await api.get("/lectures");
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
  const response = await api.post(`/lectures/check_student_access`, {
    lectureId,
  });
  return response.data;
};

export const giveUserAccess = async (
  lectureId: string,
  code: string
): Promise<{
  status: string;
  message: string;
}> => {
  const response = await api.post(`/lectures/lecture_access_request`, {
    lectureId,
    code,
  });
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
  const res = await api.put(`${baseUrl}/users/update_account`, data);
  return res.data;
};

// ForgetPassword and Send OTP
export const forgetPassword = async (data: {
  identifier: string;
}): Promise<{
  status: string;
  message: string;
}> => {
  const res = await axios.put(`${baseUrl}/users/send_otp`, data);
  return res.data;
};

export const setNewPassword = async (data: {
  identifier: string;
  new_password: string;
  otp: string;
}): Promise<{
  status: string;
  message: string;
  user: User;
}> => {
  const res = await axios.put(`${baseUrl}/users/reset_password`, data);
  return res.data;
};

export const getLectureByID = async (
  lectureId: string
): Promise<LectureByID> => {
  const res = await api.get(`/lectures/getLectureByID/${lectureId}`);
  return res.data;
};

export const getUserLectures = async (): Promise<StudentLecturesResponse> => {
  const res = await api.get(`/users/my_lectures`);
  return res.data;
};


