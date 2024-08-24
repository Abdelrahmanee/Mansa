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
    return res.data; // Return the data on success
  } catch (error) {
    console.log('API Error:', error);
    // Rethrow the error to be handled by the caller
    throw error;
  }
};