import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./ResetPasswordFlow.module.css";
import { sendOtp, verifyOtp } from "../../../services/UserServices";
import { Validate } from "../../../utils/Validate";
import ForgetPasswordComponent from "../LogIn/forgetPassword/ForgetPasswordComponent";
import OTPForm from "../SignUp/StepThreeForm/OTPForm";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import LibButton from "../../../libs/common/lib-button/LibButton";
const ResetPasswordFlow = ({ onSubmit, onCancel, isSubmitting = false, }) => {
    const [step, setStep] = useState(1);
    const [otpEmail, setOtpEmail] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [passwordError, setPasswordError] = useState({
        password: "",
        confirmPassword: "",
    });
    const [newPassword, setNewPassword] = useState({
        password: "",
        confirmPassword: "",
    });
    const handleSendOtp = async (email) => {
        if (!email) {
            return;
        }
        try {
            setIsSendingOtp(true);
            await sendOtp(email);
            setOtpEmail(email);
            setStep(2);
        }
        catch (err) {
        }
        finally {
            setIsSendingOtp(false);
        }
    };
    const handleVerifyOtp = async (otpCode) => {
        setIsVerifying(true);
        try {
            const result = await verifyOtp(otpEmail, otpCode);
            if (!result.success) {
                return;
            }
            setStep(3);
        }
        catch (err) {
            //   setStep(1);
        }
        finally {
            setIsVerifying(false);
        }
    };
    const handlePasswordChange = (name, value) => {
        setNewPassword((prev) => ({ ...prev, [name]: value }));
        setPasswordError((prev) => ({ ...prev, [name]: "" }));
        const err = Validate(name, value, true, "text");
        if (err) {
            setPasswordError((prev) => ({ ...prev, [name]: err }));
        }
    };
    const handleSubmit = () => {
        const { password, confirmPassword } = newPassword;
        let hasError = false;
        if (!password) {
            setPasswordError((prev) => ({
                ...prev,
                password: "Password is required",
            }));
            hasError = true;
        }
        if (!confirmPassword) {
            setPasswordError((prev) => ({
                ...prev,
                confirmPassword: "Confirm password is required",
            }));
            hasError = true;
        }
        if (password && confirmPassword && password !== confirmPassword) {
            setPasswordError((prev) => ({
                ...prev,
                confirmPassword: "Passwords do not match",
            }));
            hasError = true;
        }
        if (hasError)
            return;
        setPasswordError({ password: "", confirmPassword: "" });
        onSubmit({ email: otpEmail, password: password });
    };
    return (_jsxs("div", { className: styles.resetPasswordFlow, children: [step === 1 && !isSendingOtp ? (_jsx(ForgetPasswordComponent, { moveBackward: onCancel, onReset: handleSendOtp })) : isSendingOtp ? (_jsx("span", { className: "loader" })) : null, step === 2 && (_jsx(OTPForm, { email: otpEmail, onSubmit: handleVerifyOtp, moveBackward: () => setStep(1), isVerifying: isVerifying })), step === 3 && (_jsxs(_Fragment, { children: [_jsx(TextInput, { name: "password", label: "New Password", placeholder: "New Password", type: "text", required: true, value: newPassword.password, onChange: (value, name) => handlePasswordChange(name, value), errorMessage: passwordError.password }), _jsx(TextInput, { name: "confirmPassword", label: "Confirm New Password", placeholder: "Confirm New Password", type: "text", required: true, value: newPassword.confirmPassword, onChange: (value, name) => handlePasswordChange(name, value), errorMessage: passwordError.confirmPassword }), _jsx("div", { className: styles.btn, children: _jsx(LibButton, { label: isSubmitting ? "Resetting..." : "Reset Password", onSubmit: handleSubmit, backgroundColor: "#825beb", hoverColor: "#6c46d9", padding: "0 10px", disabled: isSubmitting }) })] }))] }));
};
export default ResetPasswordFlow;
