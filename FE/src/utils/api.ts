import axios from "axios";

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
  const res = await axios.post(`${baseUrl}/auth/login`, data);
  return res.data;
};
