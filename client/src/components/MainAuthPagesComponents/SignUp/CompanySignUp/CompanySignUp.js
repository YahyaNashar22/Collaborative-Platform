import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SimpleFormView from "../StepOneForm/SimpleFormView";
import useFormStore from "../../../../store/FormsStore";
import styles from "./CompanySignUp.module.css";
import ProgressBar from "../../../../shared/ProgressBar/ProgressBar";
import AuthFooterLink from "../../../../shared/AuthFooterLink/AuthFooterLink";
import OrgInformationForm from "./StepTwoForm/OrgInformationForm";
import OTPForm from "../StepThreeForm/OTPForm";
import { useState } from "react";
import authStore from "../../../../store/AuthStore";
import { sendOtp, verifyOtp, signUpCompanyClient, } from "../../../../services/UserServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CompanySignUp = ({ title, placeholder, formData, }) => {
    const [, setIsLoading] = useState(false);
    const { increaseStep, role, type, decreaseStep, getFormValues, setStep } = useFormStore();
    const { setUser, setLoading } = authStore();
    const [error, setError] = useState("");
    const [otpEmail, setOtpEmail] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const navigate = useNavigate();
    const step = useFormStore((state) => state.step);
    const data = formData.formData[step] || [];
    const formTitle = data.formTitle;
    const handleSendOtpAndProceed = async () => {
        const payload = getFormValues(role, type);
        const email = payload?.email;
        if (!email) {
            setError("Email is required before proceeding.");
            return;
        }
        try {
            await sendOtp(email);
            setOtpEmail(email);
            setError("");
            increaseStep();
        }
        catch (err) {
            toast.error(error?.response?.data?.message || "Error Sending OTP!");
            setError(err?.response?.data?.message || "Failed to send OTP");
        }
    };
    const handleSignUp = async (otpCode) => {
        const payload = getFormValues(role, type);
        setIsLoading(true);
        setIsVerifying(true);
        try {
            const isVerified = await verifyOtp(otpEmail, otpCode.toString());
            if (!isVerified.success) {
                setError("Invalid or expired OTP.");
                return;
            }
            const newPayload = { ...payload, accountType: "company" };
            const result = await signUpCompanyClient(newPayload);
            setUser(result);
            setLoading(false);
            toast.success("Signed up successfully!");
            setError("");
            navigate("/dashboard/requests");
        }
        catch (error) {
            setStep(0);
            setError(error?.response?.data?.message || "Sign-up failed");
        }
        finally {
            setIsLoading(false);
            setIsVerifying(false);
        }
    };
    let content;
    switch (step) {
        case 0:
            content = (_jsx(SimpleFormView, { data: data, title: formTitle, moveForward: increaseStep, error: error }));
            break;
        case 1:
            content = (_jsx(OrgInformationForm, { data: data, title: formTitle, moveForward: handleSendOtpAndProceed, moveBackward: decreaseStep }));
            break;
        case 2:
            content = (_jsx(OTPForm, { onSubmit: handleSignUp, moveBackward: decreaseStep, email: otpEmail, errorMessage: error, isVerifying: isVerifying }));
            break;
        default:
            content = (_jsx(SimpleFormView, { data: data, title: formTitle, moveForward: increaseStep }));
    }
    return (_jsxs("div", { className: styles.wrapper, children: [_jsxs("div", { className: "d-f gap-05 f-wrap", children: [_jsx("h1", { children: title }), _jsx(ProgressBar, { currentNode: step, nodes: formData.steps })] }), _jsx("p", { className: styles.placeholder, children: placeholder }), content, _jsx("span", { className: "line" }), _jsx(AuthFooterLink, { text: "Already have an account?", link: "Log In", redirectTo: `/auth/${role}/login` })] }));
};
export default CompanySignUp;
