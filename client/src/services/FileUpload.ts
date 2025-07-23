// src/services/FileServices.ts

import { toast } from "react-toastify";

export const downloadFile = async (fileName: string): Promise<void> => {
  try {
    const fileUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/${fileName}`;

    const res = await fetch(fileUrl, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Download failed");

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("File download failed:", error);
    toast.error("Unable to download the file.");
  }
};
