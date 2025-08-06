import axiosInstance from "../Config/axiosInstence";
import axios from "axios";
// OTP services
export const sendOtp = async (email) => {
    const response = await axiosInstance.post("/otp/send-email-otp", { email });
    return response.data;
};
export const verifyOtp = async (email, emailOtp) => {
    const response = await axiosInstance.post("/otp/verify-email-otp", {
        email,
        emailOtp,
    });
    return response.data;
};
const AuthBaseURL = "/users";
export const signUpIndividualClient = async (payload) => {
    const url = `${AuthBaseURL}/new-client`;
    const response = await axiosInstance.post(url, payload);
    return response.data.payload;
};
export const signUpCompanyClient = async (payload) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}${AuthBaseURL}/new-client`;
    const formData = new FormData();
    for (const key in payload) {
        if (!payload[key])
            continue;
        const value = payload[key];
        if (value instanceof File) {
            formData.append(key, value);
        }
        else if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
        }
        else {
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
export const signUpProvider = async (payload) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}${AuthBaseURL}/new-provider`;
    const formData = new FormData();
    for (const key in payload) {
        if (Object.prototype.hasOwnProperty.call(payload, key)) {
            const value = payload[key];
            if (value instanceof File) {
                formData.append(key, value);
            }
            else if (Array.isArray(value)) {
                formData.append(key, JSON.stringify(value));
            }
            else if (value !== undefined && value !== null) {
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
export const getUserData = async (userId) => {
    const response = await axiosInstance.get(`${AuthBaseURL}/get-single/${userId}`);
    return response.data.payload;
};
export const updateProfileData = async (userId, payload) => {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((v) => formData.append(`${key}[]`, v));
        }
        else {
            formData.append(key, value);
        }
    });
    const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}${AuthBaseURL}/update/${userId}`, formData, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
export const changePassword = async (payload) => {
    const result = await axiosInstance.patch(`${AuthBaseURL}/change-password`, payload);
    return result.data.payload;
};
export const getALlUsers = async () => {
    const result = await axiosInstance.post(`${AuthBaseURL}/get-all`);
    return result.data.payload;
};
export const changeUserBannedStatus = async (userId, isBanned) => {
    const result = await axiosInstance.patch(`${AuthBaseURL}/ban/${userId}`, {
        banned: isBanned,
    });
    return result.data.payload;
};
export const resetPassword = async (payload) => {
    const result = await axiosInstance.patch(`${AuthBaseURL}/reset-password`, payload);
    return result.data;
};
