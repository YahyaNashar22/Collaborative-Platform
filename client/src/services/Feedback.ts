import axiosInstance from "../Config/axiosInstence";
import { Feedback } from "../interfaces/Project";

const AuthBaseURL = "/feedbacks";

export const submitFedback = async (payload: Feedback) => {
  const url = `${AuthBaseURL}/send`;

  const result = await axiosInstance.post(url, payload);
  return result.data;
};

export const getSingleFeedback = async (projectId: string) => {
  const url = `${AuthBaseURL}/get-single/${projectId}`;

  const result = await axiosInstance.get(url);
  return result.data.payload;
};
