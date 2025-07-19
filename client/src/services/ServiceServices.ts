import axios from "../Config/axiosInstence";

const AuthBaseURL = "/services";
export const createService = async (payload: {
  name: string;
  description: string;
}) => {
  const response = await axios.post(`${AuthBaseURL}/create`, payload);
  return response;
};

export const getAllServices = async () => {
  const response = await axios.get(`${AuthBaseURL}/get-all`);
  return response.data.payload;
};
