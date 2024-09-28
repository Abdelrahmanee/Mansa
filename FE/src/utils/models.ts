export interface User {
  email: string;
  userName: string;
  role: string;
  status: string;
  sex: string;
  age: number;
  profilePicture: string;
  mobileNumber: string;
  city: string;
  GOV: string;
  DOB: string;
  _id: string;
}

export interface ErrorResponse {
  message: string;
}

export interface LoginResponse {
  user: User;
}

export interface IFormInput {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  DOB: string;
  city: string;
  GOV: string;
  mobileNumber: string;
  sex: string;
  files: File[];
}


export interface AllLectureResponse {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  duration: number;
  logo: string;
  pdfs: string[];
  price: number;
  rating: number;
  teacherId: string
  videos: string[];
}

// Define the API response type
export interface AccessResponse {
  status: string;
  message: string;
}