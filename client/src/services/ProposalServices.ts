import axios from "axios";
import axiosInstance from "../Config/axiosInstence";

const AuthBaseURL = "/quotations";

export const createProposal = async (data: {
  [key: string]: string | File;
}) => {
  const formData = new FormData();
  formData.append("providerId", data.providerId);
  formData.append("requestId", data.requestId);
  formData.append("estimatedDeadline", data.estimatedDeadline);
  formData.append("amount", data.amount.toString());
  formData.append("description", data.description);

  if (data.file) formData.append("uploadedFile", data.file);
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}${AuthBaseURL}/create`,
    formData,
    {
      //   onUploadProgress: (e) => {
      //     if (onProgress && e.total) {
      //       const percent = Math.round((e.loaded * 100) / e.total);
      //       onProgress(percent);
      //     }
      //   },
    }
  );
  return response.data.quotation;
};

export const getProposals = async (requestId: string) => {
  const result = await axiosInstance.get(`${AuthBaseURL}/get-all/${requestId}`);
  return result.data.payload;
};
