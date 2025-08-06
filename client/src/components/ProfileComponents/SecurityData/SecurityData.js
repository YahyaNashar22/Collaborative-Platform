import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import styles from "./SecurityData.module.css";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import LibButton from "../../../libs/common/lib-button/LibButton";
import OTPForm from "../../MainAuthPagesComponents/SignUp/StepThreeForm/OTPForm";
import { useNavigate } from "react-router-dom";
import { changePassword, resetPassword, sendOtp, verifyOtp, } from "../../../services/UserServices";
const SecurityData = ({ email, isViewer = false }) => {
    const [securityTab, setSecurityTab] = useState(1);
    const [isVerifying, setIsVerifying] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [passwordErrors, setPasswordErrors] = useState({});
    // For OTP tab
    const [otpError, setOtpError] = useState(null);
    const validateNewPasswords = (newPassword, confirmPassword) => {
        const errors = {};
        if (!newPassword)
            errors.newPassword = "New password is required";
        if (!confirmPassword)
            errors.confirmPassword = "Please confirm new password";
        if (newPassword && confirmPassword && newPassword !== confirmPassword)
            errors.confirmPassword = "Passwords do not match";
        return errors;
    };
    // For tab 3 (Reset password after OTP)
    const [SecurityDataData, setSecurityDataData] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [SecurityDataErrors, setSecurityDataErrors] = useState({});
    const navigate = useNavigate();
    const handlePasswordChange = (value, name) => {
        setPasswordData((prev) => ({ ...prev, [name]: value }));
        let error = "";
        if (!value)
            error = "This field is required";
        else if (name === "confirmPassword" && value !== passwordData.newPassword)
            error = "Passwords do not match";
        setPasswordErrors((prev) => ({ ...prev, [name]: error }));
    };
    const handleChangePasswordSubmit = async () => {
        const { oldPassword, newPassword, confirmPassword } = passwordData;
        const passwordValidationErrors = validateNewPasswords(newPassword, confirmPassword);
        const newErrors = {
            ...passwordValidationErrors,
        };
        if (!oldPassword)
            newErrors.oldPassword = "Old password is required";
        if (Object.keys(newErrors).length > 0) {
            setPasswordErrors(newErrors);
            return;
        }
        setLoading(true);
        try {
            await changePassword({
                email,
                oldPassword,
                password: newPassword,
            });
            setPasswordErrors({});
            navigate("/dashboard");
        }
        catch (err) {
            setPasswordErrors({ oldPassword: "Incorrect old password" });
        }
        finally {
            setLoading(false);
        }
    };
    // ---- Handlers for Tab 2 (OTP) ----
    useEffect(() => {
        if (securityTab === 2) {
            (async () => {
                try {
                    await sendOtp(email);
                    setOtpError(null);
                }
                catch (error) {
                    setOtpError("Failed to send OTP. Please try again.");
                }
            })();
        }
    }, [securityTab, email]);
    const handleOtpSubmit = async (otp) => {
        setIsVerifying(true);
        try {
            setOtpError(null);
            await verifyOtp(email, otp);
            setSecurityTab(3);
        }
        catch (error) {
            setOtpError("Invalid or expired OTP. Please try again.");
        }
        finally {
            setIsVerifying(false);
        }
    };
    const handleSendOtpAgain = async () => {
        try {
            await sendOtp(email);
            setOtpError(null);
        }
        catch {
            setOtpError("Failed to resend OTP. Please try later.");
        }
    };
    // ---- Handlers for Tab 3 (Reset password after OTP) ----
    const handleSecurityDataChange = (value, name) => {
        setSecurityDataData((prev) => ({ ...prev, [name]: value }));
        let error = "";
        if (!value)
            error = "This field is required";
        else if (name === "confirmPassword" &&
            value !== SecurityDataData.newPassword)
            error = "Passwords do not match";
        setSecurityDataErrors((prev) => ({ ...prev, [name]: error }));
    };
    const handleSecurityDataSubmit = async () => {
        const { newPassword, confirmPassword } = SecurityDataData;
        const newErrors = validateNewPasswords(newPassword, confirmPassword);
        if (Object.keys(newErrors).length > 0) {
            setSecurityDataErrors(newErrors);
            return;
        }
        setLoading(true);
        try {
            const payload = { email: email, password: newPassword };
            await resetPassword(payload);
            setSecurityDataErrors({});
            navigate("/dashboard");
        }
        catch (err) {
            setSecurityDataErrors({ newPassword: "Failed to reset password" });
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { children: [securityTab === 1 && (_jsxs(_Fragment, { children: [_jsxs("form", { className: "d-f f-dir-col", children: [_jsx(TextInput, { name: "oldPassword", label: "Old Password", placeholder: "Old Password", type: "text", required: true, value: passwordData.oldPassword, onChange: handlePasswordChange, errorMessage: passwordErrors.oldPassword, disabled: isViewer }), _jsx(TextInput, { name: "newPassword", label: "New Password", placeholder: "New Password", type: "text", required: true, value: passwordData.newPassword, onChange: handlePasswordChange, errorMessage: passwordErrors.newPassword, disabled: isViewer }), _jsx(TextInput, { name: "confirmPassword", label: "Confirm Password", placeholder: "Confirm Password", type: "text", required: true, value: passwordData.confirmPassword, onChange: handlePasswordChange, errorMessage: passwordErrors.confirmPassword, disabled: isViewer })] }), !isViewer && (_jsxs("div", { className: `${styles.resetPasswordHolder} d-f align-center justify-between`, children: [_jsx("p", { className: styles.switchMethod, onClick: () => setSecurityTab(2), children: "Forgot password? Reset via email" }), _jsx(LibButton, { label: "Save", onSubmit: handleChangePasswordSubmit, padding: "0" })] }))] })), securityTab === 2 && (_jsx(OTPForm, { email: email, moveBackward: () => setSecurityTab(1), onSubmit: handleOtpSubmit, errorMessage: otpError, isVerifying: isVerifying, allowResend: true, onResend: handleSendOtpAgain, isResetPassword: true })), securityTab === 3 && !loading ? (_jsxs(_Fragment, { children: [_jsxs("form", { className: "d-f f-dir-col", children: [_jsx(TextInput, { name: "newPassword", label: "New Password", placeholder: "New Password", type: "text", required: true, value: SecurityDataData.newPassword, onChange: handleSecurityDataChange, errorMessage: SecurityDataErrors.newPassword }), _jsx(TextInput, { name: "confirmPassword", label: "Confirm Password", placeholder: "Confirm Password", type: "text", required: true, value: SecurityDataData.confirmPassword, onChange: handleSecurityDataChange, errorMessage: SecurityDataErrors.confirmPassword })] }), !isViewer && (_jsxs("div", { className: `${styles.buttons} d-f align-center justify-end`, children: [_jsx(LibButton, { label: "Back", onSubmit: () => setSecurityTab(1) }), _jsx(LibButton, { label: "Save", onSubmit: handleSecurityDataSubmit })] }))] })) : loading ? (_jsx("span", { className: "loader" })) : null] }));
};
export default SecurityData;
