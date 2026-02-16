import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LogInClient.module.css";

import AuthFooterLink from "../../../../shared/AuthFooterLink/AuthFooterLink";
import LogInComponent from "../LogInComponent";

import { logIn, resetPassword } from "../../../../services/UserServices";
import authStore from "../../../../store/AuthStore";
import ResetPasswordFlow from "../../ResetPassword/ResetPasswordFlow";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface LogInClientProps {
  role: string;
  placeholder: string;
}

const LogInClient = ({ role, placeholder }: LogInClientProps) => {
  const { t } = useTranslation();

  const [step, setStep] = useState<number>(0);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser, setLoading } = authStore();

  const handleLogin = async (data: { [key: string]: string }) => {
    setError("");
    const payload = { ...data, role };

    try {
      setLoading(true);
      const response = await logIn(payload);
      if (response.success === true) {
        setTimeout(() => {
          setUser(response.payload);
          navigate("/dashboard", { replace: true });
          toast.success("Welcome back");
        }, 1000);
      }
    } catch (error: any) {
      setError((error as any)?.data?.message || "Login failed");
      toast.error(t("Login failed"));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (payload: {
    email: string;
    recoveryEmail: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      const response = await resetPassword(payload);
      if (response?.success) {
        toast.success(t("password reset successfully"));
        setStep(0);
      } else {
        toast.error(t("Password reset failed"));
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || t("Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className="d-f f-dir-col">
        <div>
          <h1>{t("Sign in to Takatuf")}</h1>
          <p className={styles.placeholder}>{t(placeholder)}</p>
        </div>

        {authStore.getState().loading && step !== 0 ? (
          <span className="loader"></span>
        ) : (
          <div className={`${styles.formContainer} d-f f-dir-col`}>
            {step === 0 && (
              <LogInComponent
                onLogin={handleLogin}
                onForgetPassword={() => {
                  setError("");
                  setStep(1);
                }}
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

export default LogInClient;
