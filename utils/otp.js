export const generateOtp = () => {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); 

    return otp;
}

export const generateExpiryDate = () => {
    // Set expiry to 5 minutes
    const expiryDate = new Date(Date.now() + 5 * 60 * 1000);

    return expiryDate;
}