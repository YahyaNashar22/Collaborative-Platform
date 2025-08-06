import axiosInstance from "../Config/axiosInstence";
const AuthBaseURL = "/services";
export const createService = async (payload) => {
    const response = await axiosInstance.post(`${AuthBaseURL}/create`, payload);
    return response.data.payload;
};
export const getAllServices = async () => {
    const response = await axiosInstance.get(`${AuthBaseURL}/get-all`);
    return response.data.payload;
};
export const deleteService = async (serviceId) => {
    const response = await axiosInstance.delete(`${AuthBaseURL}/delete/${serviceId}`);
    return response.data.payload;
};
