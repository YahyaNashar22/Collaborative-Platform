import axiosInstance from "../Config/axiosInstence";

const AuthBaseURL = "/services";
export const createService = async (payload: {
  name: string;
  description: string;
}) => {
  const response = await axiosInstance.post(`${AuthBaseURL}/create`, payload);
  return response;
};

export const getAllServices = async () => {
  const response = await axiosInstance.get(`${AuthBaseURL}/get-all`);
  return response.data.payload;
};
