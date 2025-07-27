import axiosInstance from "../Config/axiosInstence";

const AuthBaseURL = "/projects";

export const getAllProjects = async () => {
  const url = `${AuthBaseURL}/get-all`;
  const result = await axiosInstance.post(url);
  return result.data.payload;
};
