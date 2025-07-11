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

export const signUp = async (payload, type: string) => {
  let url = "";
  if (type === "individual" || type === "company") {
    url = `${AuthBaseURL}/new-client`;
  } else {
    url = `${AuthBaseURL}/new-provider`;
  }
  const response = await axios.post(url, payload);
  return response.data.payload;
};

export const signOut = async () => {
  const response = await axios.post(`${AuthBaseURL}/log-out`);
  return response;
};

export const logIn = async (payload) => {
  const response = await axios.post(`${AuthBaseURL}/log-in`, payload);
  return response.data.payload;
};
