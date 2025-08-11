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

export const getAllRequestsBy = (role: string, userId: string) => {
  switch (role) {
    case "admin":
      return getAllAdminRequests({ role: role });
      break;

    case "client":
      return getAllClientRequests({ userId: userId });
      break;
    case "provider":
      return getAllProviderRequests({ userId: userId });
      break;
    case "default":
      return;
  }
};

export const getAllAdminRequests = async (query: {
  [key: string]: string | undefined;
}) => {
  const response = await axiosInstance.post(`${AuthBaseURL}/get-all`, query);
  return response.data.payload;
};

export const getAllRequests = async () => {
  const response = await axiosInstance.post(`${AuthBaseURL}/get-all`);
  return response.data.payload;
};

export const getAllClientRequests = async (query: {
  [key: string]: string | undefined;
}) => {
  const response = await axiosInstance.post(
    `${AuthBaseURL}/get-all-client`,
    query
  );
  return response.data.payload;
};

export const getAllProviderRequests = async (query: {
  [key: string]: string | undefined;
}) => {
  const response = await axiosInstance.post(
    `${AuthBaseURL}/get-all-provider-requests`,
    query
  );
  return response.data.payload;
};

export const assignToProvider = async (payload: {
  requestId: string;
  providerIds: string[];
}) => {
  const response = await axiosInstance.patch(
    `${AuthBaseURL}/pass-request-to-provider`,
    payload
  );
  return response.data;
};

export const getAllUnassignedProvider = async (
  requestId: string,
  query: string
) => {
  const response = await axiosInstance.get(
    `${AuthBaseURL}/get-all-providers/${requestId}`,
    {
      params: { query },
    }
  );
  return response.data.payload;
};

export const approveRequest = async (
  requestId: string,
  quotationIds: string[]
) => {
  const response = await axiosInstance.patch(
    `${AuthBaseURL}/approve-quotation`,
    {
      requestId,
      quotationIds,
    }
  );
  return response.data.approvedQuotations;
};

export const approveProposalByClient = async (
  requestId: string,
  quotationId: string
) => {
  const response = await axiosInstance.patch(
    `${AuthBaseURL}/select-quotation`,
    {
      requestId,
      quotationId,
    }
  );
  return response.data;
};

export const cancelRequestByClient = async (requestId: string) => {
  const response = await axiosInstance.patch(`${AuthBaseURL}/cancel-request`, {
    requestId,
  });

  return response.data;
};

export const getRequestsForDashboard = async () => {
  const response = await axiosInstance.get(
    `${AuthBaseURL}/getRequestsForDashboard`
  );

  return response.data.result;
};

export const interestBy = async (requestId: string, userId: string) => {
  const response = await axiosInstance.post(
    `${AuthBaseURL}/interested/${requestId}`,
    {
      userId,
    }
  );

  return response.data;
};
