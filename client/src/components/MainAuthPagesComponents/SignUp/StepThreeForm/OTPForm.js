import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import styles from "./OTPForm.module.css";
import LibButton from "../../../../libs/common/lib-button/LibButton";
import { sendOtp } from "../../../../services/UserServices";
const OTPForm = ({ moveBackward, onSubmit, email, errorMessage, isVerifying, isResetPassword = false, }) => {
    const inputRefs = useRef([]);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [number, setNumber] = useState(["", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(5 * 60);
    useEffect(() => {
        if (timeLeft <= 0)
            return;
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };
    const isNumber = (value) => !isNaN(Number(value));
    const handleChange = (value, index) => {
        if (!isNumber(value))
            return;
        const newNumber = [...number];
        newNumber[index] = value;
        setNumber(newNumber);
        setErrorMsg("");
        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };
    const handleResend = async () => {
        if (timeLeft > 0)
            return;
        try {
            await sendOtp(email);
            setTimeLeft(5 * 60);
        }
        catch (err) {
            toast.error(error?.response?.data?.message || "Error Resending OTP!");
        }
    };
    const handleVerify = async () => {
        if (number.some((digit) => digit === "")) {
            setErrorMsg("* Please enter all 4 digits of the code.");
            return;
        }
        if (!isResetPassword && !agreedToTerms) {
            setErrorMsg("* You must agree to the subscription terms.");
            return;
        }
        onSubmit(number.join(""));
    };
    return (_jsxs("div", { className: `${styles.formContainer} d-f f-dir-col`, children: [_jsx("h1", { children: "Enter Verification Code" }), _jsx("small", { children: "Verification code has been sent to your email" }), _jsx("form", { className: `${styles.form} d-f align-center`, children: Array.from({ length: 4 }).map((_, index) => (_jsx("div", { className: `${styles.inputHolder} d-f align-center`, children: _jsx("input", { type: "text", maxLength: 1, ref: (el) => (inputRefs.current[index] = el), className: `w-100 ${selectedIndex === index ? styles.selected : ""} pointer`, value: number[index], onFocus: () => {
                            setSelectedIndex(index);
                            setErrorMsg("");
                        }, autoFocus: index === 0, onChange: (e) => handleChange(e.target.value, index), onKeyDown: (e) => {
                            if (e.key === "Backspace" &&
                                number[index] === "" &&
                                index > 0) {
                                inputRefs.current[index - 1]?.focus();
                            }
                        } }) }, index))) }), _jsxs("div", { className: `${styles.otpActionBtn} d-f purple bold`, children: [_jsx("p", { className: `${timeLeft > 0 ? styles.disabled : ""} pointer`, onClick: handleResend, children: "Resend Code" }), _jsx("p", { children: formatTime(timeLeft) })] }), !isResetPassword && (_jsxs("div", { className: ` ${styles.terms} d-f align-center`, children: [_jsx("input", { type: "checkbox", name: "terms", id: "terms", className: "pointer", checked: agreedToTerms, onChange: (e) => {
                            setAgreedToTerms(e.target.checked);
                            setErrorMsg("");
                        } }), _jsxs("label", { htmlFor: "terms", className: "pointer", children: ["I agree to the", " ", _jsx("span", { className: "purple pointer bold", children: "Takatuf Subscription Agreement" })] })] })), (errorMsg || errorMessage) && (_jsx("small", { className: `error ${styles.otpError}`, children: errorMsg || errorMessage })), _jsxs("div", { className: `${styles.buttons} d-f align-center justify-start`, children: [_jsx(LibButton, { label: "Back", onSubmit: moveBackward, backgroundColor: "#57417e", hoverColor: "#49356a", padding: "2px 36.2px" }), _jsx(LibButton, { label: isVerifying
                            ? "Verifying..."
                            : isResetPassword
                                ? "Reset Password"
                                : "Create Account", onSubmit: handleVerify, backgroundColor: "#825beb", disabled: isVerifying, hoverColor: " #6c46d9", padding: "2px 20px" })] })] }));
};
export default OTPForm;
