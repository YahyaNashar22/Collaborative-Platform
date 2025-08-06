import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LogInClient.module.css";
import AuthFooterLink from "../../../../shared/AuthFooterLink/AuthFooterLink";
import LogInComponent from "../LogInComponent";
import { logIn, resetPassword } from "../../../../services/UserServices";
import authStore from "../../../../store/AuthStore";
import ResetPasswordFlow from "../../ResetPassword/ResetPasswordFlow";
import { toast } from "react-toastify";
const LogInClient = ({ role, placeholder }) => {
    const [step, setStep] = useState(0);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setUser, setLoading } = authStore();
    const handleLogin = async (data) => {
        setError("");
        const payload = { ...data, role };
        try {
            setLoading(true);
            const response = await logIn(payload);
            if (response.success === true) {
                setUser(response.payload);
                navigate("/dashboard/requests", { replace: true });
                toast.success("Welcome back");
            }
        }
        catch (error) {
            setError(error?.response?.data?.message || "Login failed");
            toast.error("Login failed");
        }
        finally {
            setLoading(false);
        }
    };
    const handlePasswordReset = async (payload) => {
        try {
            setLoading(true);
            const response = await resetPassword(payload);
            if (response?.success) {
                toast.success("password reset successfuly");
                setStep(0);
            }
            else {
                toast.error("Password reset failed");
            }
        }
        catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: styles.wrapper, children: _jsxs("div", { className: "d-f f-dir-col", children: [_jsxs("div", { children: [_jsx("h1", { children: "Sign in to Takatuf" }), _jsx("p", { className: styles.placeholder, children: placeholder })] }), authStore.getState().loading && step !== 0 ? (_jsx("span", { className: "loader" })) : (_jsxs("div", { className: `${styles.formContainer} d-f f-dir-col`, children: [step === 0 && (_jsx(LogInComponent, { onLogin: handleLogin, onForgetPassword: () => {
                                setStep(1);
                            }, children: error && (_jsx("small", { className: "errorMsg d-f align-center error", children: error })) })), step === 1 && (_jsx(ResetPasswordFlow, { onSubmit: handlePasswordReset, onCancel: () => {
                                setStep(0);
                            }, isSubmitting: authStore.getState().loading })), _jsx("span", { className: "line" }), _jsx(AuthFooterLink, { text: "Don't have an account?", link: "Sign Up", redirectTo: `/auth/${role}/register` })] }))] }) }));
};
export default LogInClient;
