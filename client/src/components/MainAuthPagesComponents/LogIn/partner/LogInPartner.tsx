import { useState } from "react";
import AuthFooterLink from "../../../../shared/AuthFooterLink/AuthFooterLink";
import LogInComponent from "../LogInComponent";
import styles from "./LogInPartner.module.css";
import { logIn, resetPassword } from "../../../../services/UserServices";
import authStore from "../../../../store/AuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ResetPasswordFlow from "../../ResetPassword/ResetPasswordFlow";
import { useTranslation } from "react-i18next";

type LogInClientProps = {
  role: string;
  placeholder: string;
};

const LogInPartner = ({ role, placeholder }: LogInClientProps) => {
  const { t } = useTranslation();

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

      if (response.success === true) {
        setTimeout(() => {
          setUser(response.payload);
          navigate("/dashboard");
          toast.success(t("Welcome back"));
        }, 1000);
      }
    } catch (error: any) {
      if ((error as any)?.data?.message)
        setError((error as any)?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (payload: {
    email: string;
    password: string;
    recoveryEmail: string;
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
                  setError("");
                  setStep(0);
                }}
                isSubmitting={authStore.getState().loading}
              />
            )}

            <span className="line"></span>

            <AuthFooterLink
              text={t("Don't have an account?")}
              link={t("Sign Up")}
              redirectTo={`/auth/${role}/register`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LogInPartner;
