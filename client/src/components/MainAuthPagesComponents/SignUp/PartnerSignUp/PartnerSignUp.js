import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SimpleFormView from "../StepOneForm/SimpleFormView";
import useFormStore from "../../../../store/FormsStore";
import styles from "./PartnerSignUp.module.css";
import ProgressBar from "../../../../shared/ProgressBar/ProgressBar";
import AuthFooterLink from "../../../../shared/AuthFooterLink/AuthFooterLink";
import OTPForm from "../StepThreeForm/OTPForm";
import CompanyForm from "./StepTwoForm/CompanyForm";
import AddressForm from "./StepThreeForm/AddressForm";
import BankForm from "./StepFourForm/BankForm";
import DocumentsForm from "./StepFiveForm/DocumentsForm";
import authStore from "../../../../store/AuthStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp, signUpProvider, } from "../../../../services/UserServices";
import { toast } from "react-toastify";
const PartnerSignUp = ({ title, placeholder, formData, }) => {
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
    const handleOtpStep = async () => {
        const payload = getFormValues(role, type);
        const email = payload?.email;
        if (!email) {
            setError("Email is required to send verification code.");
            return;
        }
        try {
            await sendOtp(email);
            setOtpEmail(email);
            setError("");
            increaseStep();
        }
        catch (err) {
            setError(err?.response?.data?.message || "Failed to send OTP");
        }
    };
    const handleSignUp = async (otpCode) => {
        const rawPayload = getFormValues(role, type);
        // Transform services field (if it exists and is an array)
        const payload = {
            ...rawPayload,
            services: Array.isArray(rawPayload.services)
                ? rawPayload.services.map((s) => s.value)
                : [],
        };
        setIsLoading(true);
        setIsVerifying(true);
        setError(""); // Clear any previous error
        try {
            const isVerified = await verifyOtp(otpEmail, otpCode.toString());
            if (!isVerified?.success) {
                setError("Invalid or expired OTP.");
                return;
            }
            const result = await signUpProvider(payload, type);
            setUser(result.payload);
            toast.success("Signed up successfully!");
            navigate("/dashboard/requests");
        }
        catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured!");
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
            content = (_jsx(CompanyForm, { data: data, title: formTitle, moveForward: increaseStep, moveBackward: decreaseStep }));
            break;
        case 2:
            content = (_jsx(AddressForm, { data: data, title: formTitle, moveForward: increaseStep, moveBackward: decreaseStep }));
            break;
        case 3:
            content = (_jsx(BankForm, { data: data, title: formTitle, moveForward: increaseStep, moveBackward: decreaseStep }));
            break;
        case 4:
            content = (_jsx(DocumentsForm, { data: data, title: formTitle, moveForward: handleOtpStep, moveBackward: decreaseStep }));
            break;
        case 5:
            content = (_jsx(OTPForm, { onSubmit: handleSignUp, moveBackward: decreaseStep, email: otpEmail, isVerifying: isVerifying, errorMessage: error }));
            break;
        default:
            content = null;
    }
    return (_jsxs("div", { className: styles.wrapper, children: [_jsxs("div", { className: "d-f gap-05 f-wrap", children: [_jsx("h1", { children: title }), _jsx(ProgressBar, { currentNode: step, nodes: formData.steps })] }), _jsx("p", { className: styles.placeholder, children: placeholder }), content, _jsx("span", { className: "line" }), _jsx(AuthFooterLink, { text: "Already have an account?", link: "Sign In", redirectTo: `/auth/${role}/login` })] }));
};
export default PartnerSignUp;
