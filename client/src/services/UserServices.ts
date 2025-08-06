import axiosInstance from "../Config/axiosInstence";
import axios from "axios";
// OTP services
export const sendOtp = async (email: string) => {
  const response = await axiosInstance.post("/otp/send-email-otp", { email });
  return response.data;
};

export const verifyOtp = async (email: string, emailOtp: string) => {
  const response = await axiosInstance.post("/otp/verify-email-otp", {
    email,
    emailOtp,
  });
  return response.data;
};

const AuthBaseURL = "/users";

export const signUpIndividualClient = async (payload: object) => {
  const url = `${AuthBaseURL}/new-client`;
  const response = await axiosInstance.post(url, payload);
  return response.data.payload;
};

export const signUpCompanyClient = async (payload: { [key: string]: any }) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}${AuthBaseURL}/new-client`;
  const formData = new FormData();

  for (const key in payload) {
    if (!payload[key]) continue;

    const value = payload[key];

    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  }
  const response = await axios.post(url, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.payload.payload;
};

export const signUpProvider = async (payload: { [key: string]: any }) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}${AuthBaseURL}/new-provider`;
  const formData = new FormData();

  for (const key in payload) {
    if (Object.prototype.hasOwnProperty.call(payload, key)) {
      const value = payload[key];

      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    }
  }

  const response = await axios.post(url, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.payload;
};

export const signOut = async () => {
  const response = await axiosInstance.post(`${AuthBaseURL}/log-out`);
  return response;
};

export const logIn = async (payload) => {
  const response = await axiosInstance.post(`${AuthBaseURL}/log-in`, payload);
  return response.data.payload;
};

export const getUserData = async (userId: string) => {
  const response = await axiosInstance.get(
    `${AuthBaseURL}/get-single/${userId}`
  );
  return response.data.payload;
};

export const updateProfileData = async (
  userId: string,
  payload: { [key: string]: string | File }
) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => formData.append(`${key}[]`, v));
    } else {
      formData.append(key, value);
    }
  });

  const response = await axios.patch(
    `${import.meta.env.VITE_BACKEND_URL}${AuthBaseURL}/update/${userId}`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const changePassword = async (payload: { [key: string]: string }) => {
  const result = await axiosInstance.patch(
    `${AuthBaseURL}/change-password`,
    payload
  );

  return result.data.payload;
};

export const getALlUsers = async () => {
  const result = await axiosInstance.post(`${AuthBaseURL}/get-all`);
  return result.data.payload;
};

export const changeUserBannedStatus = async (
  userId: string,
  isBanned: boolean
) => {
  const result = await axiosInstance.patch(`${AuthBaseURL}/ban/${userId}`, {
    banned: isBanned,
  });
  return result.data.payload;
};

export const resetPassword = async (payload: {
  email: string;
  password: string;
}) => {
  const result = await axiosInstance.patch(
    `${AuthBaseURL}/reset-password`,
    payload
  );
  return result.data;
};
