import { useState } from "react";
import AuthFooterLink from "../../../../shared/AuthFooterLink/AuthFooterLink";
import LogInComponent from "../LogInComponent";
import styles from "./LogInPartner.module.css";
import ForgetPasswordComponent from "../forgetPassword/ForgetPasswordComponent";
import { logIn, resetPassword } from "../../../../services/UserServices";
import authStore from "../../../../store/AuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ResetPasswordFlow from "../../ResetPassword/ResetPasswordFlow";

type LogInClientProps = {
  role: string;
  placeholder: string;
};

const LogInPartner = ({ role, placeholder }: LogInClientProps) => {
  const [step, setStep] = useState<number>(0);
  const [error, setError] = useState("");
  const { setUser, setLoading } = authStore();
  const navigate = useNavigate();

  const handleLogin = async (data: { [key: string]: string }) => {
    setError("");
    const payload = { ...data, role: role };

    try {
      setLoading(true);
      const response = await logIn(payload);

      setUser(response.payload);

      if (response.success === true) {
        navigate("/dashboard/requests");
        toast.success("Welcome back");
      }
    } catch (error: any) {
      if (error?.response?.data?.message)
        setError(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (payload: {
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      const response = await resetPassword(payload);
      if (response?.success) {
        toast.success("password reset successfuly");
        setStep(0);
      } else {
        toast.error("Password reset failed");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className="d-f f-dir-col">
        <div>
          <h1>Sign in to Takatuf</h1>
          <p className={styles.placeholder}>{placeholder}</p>
        </div>
        {authStore.getState().loading ? (
          <span className="loader"></span>
        ) : (
          <div className={`${styles.formContainer} d-f f-dir-col`}>
            {step === 0 && (
              <LogInComponent
                onLogin={handleLogin}
                onForgetPassword={() => setStep(1)}
              >
                {error && (
                  <small className="errorMsg d-f align-center error">
                    {error}
                  </small>
                )}
              </LogInComponent>
            )}
            {step === 1 && (
              <ResetPasswordFlow
                onSubmit={handlePasswordReset}
                onCancel={() => {
                  setStep(0);
                }}
                isSubmitting={authStore.getState().loading}
              />
            )}

            <span className="line"></span>

            <AuthFooterLink
              text="Don't have an account?"
              link="Sign Up"
              redirectTo={`/auth/${role}/register`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LogInPartner;
