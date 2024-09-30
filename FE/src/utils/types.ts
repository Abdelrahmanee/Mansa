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
  status:string;
  message: string;
  user: User;
  token: string;
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
  teacherId: string;
  videos: string[];
}

// Define the API response type
export interface AccessResponse {
  status: string;
  message: string;
}

export interface updateUserResponse {
  status: string;
  message: string;
  data: User;
}

export interface Lecture {
  _id: string;
  title: string;
  description: string;
  teacherId: string;
  price: number;
  duration: number;
  rating: number;
  pdfs: string[];
  videos: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  logo: string;
}

export interface LectureByID {
  status: string;
  data: Lecture;
}


export interface StudentLecturesResponse {
  lectureCount: number
  lectures: Lecture[];
}

export interface OnlinePaymentResponse {
  url: string;
}

export interface Code {
  _id: string;
  price: number;
  lectureId: string;
  code: string;
  isUsed: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

