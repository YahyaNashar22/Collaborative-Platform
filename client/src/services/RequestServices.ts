import axiosInstance from "../Config/axiosInstence";
import { RequestDataType } from "../interfaces/request";
import authStore from "../store/AuthStore";
import axios from "axios";

const AuthBaseURL = "/requests";

export const createRequest = async (
  data: RequestDataType,
  onProgress?: (percent: number) => void
) => {
  const { user } = authStore.getState();

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("serviceId", data.serviceId);
  formData.append("clientId", user?._id || "");
  formData.append("budget", data.budget.toString());
  formData.append("offerDeadline", new Date(data.offerDeadline).toISOString());
  formData.append(
    "projectDeadline",
    new Date(data.projectDeadline).toISOString()
  );

  if (data.document) {
    formData.append("document", data.document);
  }
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}${AuthBaseURL}/create`,
    formData,
    {
      onUploadProgress: (e) => {
        if (onProgress && e.total) {
          const percent = Math.round((e.loaded * 100) / e.total);
          onProgress(percent);
        }
      },
    }
  );
  return response.data.payload.result;
};

export const getAllRequests = async (userId: string) => {
  const payload = { userId: userId };
  const response = await axiosInstance.post(`${AuthBaseURL}/get-all`, payload);
  return response.data.payload;
};
