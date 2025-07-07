import axios from "../Config/axiosInstence";

// OTP services
export const sendOtp = async (email: string) => {
  const response = await axios.post("/otp/send-email-otp", { email });
  return response.data;
};

export const verifyOtp = async (email: string, emailOtp: string) => {
  const response = await axios.post("/otp/verify-email-otp", {
    email,
    emailOtp,
  });
  return response.data;
};

const AuthBaseURL = "/users";

export const clientSignUp = async (payload) => {
  const response = await axios.post(`${AuthBaseURL}/new-client`, payload);
  return response.data.payload;
};
