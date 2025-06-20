import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Your backend URL

/**
 * Registers a new employer.
 * Sends FormData including text fields and files.
 */
export const registerEmployer = async (formData: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/api/users/register`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Essential for sending files
    },
  });
  return response.data;
};

/**
 * Registers a new job seeker.
 * Sends FormData including text fields and files (profilePic, resume), skills (stringified array),
 * qualifications (stringified array of objects), and experiences (stringified array of objects).
 */
export const registerJobseeker = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/users/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Essential for file uploads
      },
    });
    return response.data;
  } catch (error: any) {
    // Propagate the error with more detail if available
    throw error.response?.data || error.message;
  }
};


interface OtpVerificationPayload {
  email: string;
  otp: string;
}


/**
 * Verifies the One-Time Password (OTP) for a given email.
 */
export const verifyOtp = async (payload: OtpVerificationPayload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/users/verify-otp`, payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};
interface ResendOtpPayload {
  email: string;
}

/**
 * Requests a new One-Time Password (OTP) to be sent to the given email.
 */
export const resendOtp = async (payload: ResendOtpPayload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/users/resend-otp`, payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};


interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Logs in a user with the provided email and password.
 */
export const loginUser = async (payload: LoginPayload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/users/login`, payload);
    return response.data;
  } catch (error: any) {
    // Propagate the error message from the backend if available
    throw error.response?.data || error.message;
  }
};
