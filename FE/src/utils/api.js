import axios from "axios";

const baseUrl = 'http://localhost:3000/api/v1'

// Sign up the user
export const signup = async (formData) => {
  try {
    const res = await axios.post(`${baseUrl}/auth/sign_up`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.log('API Error:', error);
    // Rethrow the error to be handled by the caller
    throw error;
  }
};
export const login = async (data) => {
  try {
    const res = await axios.post(`${baseUrl}/auth/login`, data, {
      withCredentials: true, // Include credentials to handle cookies
    });
    return res.data;
  } catch (error) {
    console.log('API Error:', error);
    // Rethrow the error to be handled by the caller
    throw error;
  }
};