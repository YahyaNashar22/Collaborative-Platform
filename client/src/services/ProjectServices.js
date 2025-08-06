import axios from "axios";
import axiosInstance from "../Config/axiosInstence";
const AuthBaseURL = "/projects";
export const getAllProjects = async () => {
    const url = `${AuthBaseURL}/get-all`;
    const result = await axiosInstance.post(url);
    return result.data.payload;
};
export const createStage = async (projectId, payload) => {
    const url = `${AuthBaseURL}/create-stage/${projectId}`;
    const result = await axiosInstance.post(url, payload);
    return result.data.stage;
};
export const updateStages = async (projectId, payload) => {
    const url = `${AuthBaseURL}/update-stage/${projectId}`;
    const result = await axiosInstance.patch(url, payload);
    return result.data.stages;
};
export const deleteStage = async (projectId, stageId) => {
    const url = `${AuthBaseURL}/delete-stage/${projectId}/${stageId}`;
    const result = await axiosInstance.delete(url);
    return result.data.stages;
};
export const setStageComplete = async (projectId, stageId) => {
    const url = `${AuthBaseURL}/complete-stage/${projectId}/${stageId}`;
    const result = await axiosInstance.patch(url);
    return result.data.stages;
};
export const uploadFile = async (projectId, stageId, file) => {
    try {
        const formData = new FormData();
        formData.append("projectFiles", file);
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}${AuthBaseURL}/upload-files/${projectId}/${stageId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.stage;
    }
    catch (error) {
        toast.error(error?.response?.data?.message || "Error Occured!");
        throw error;
    }
};
export const requestFiles = async (projectId, payload) => {
    const url = `${AuthBaseURL}/request-files/${projectId}`;
    const result = await axiosInstance.patch(url, payload);
    return result.data;
};
export const requestMeeting = async (projectId, payload) => {
    const url = `${AuthBaseURL}/request-meeting/${projectId}`;
    const result = await axiosInstance.post(url, { meetingLink: payload });
    return result.data;
};
