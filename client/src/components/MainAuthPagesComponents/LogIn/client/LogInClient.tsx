import AuthFooterLink from "../../../../shared/AuthFooterLink/AuthFooterLink";
import styles from "./LogInClient.module.css";

import LogInComponent from "../LogInComponent";
import { useState } from "react";
import ForgetPasswordComponent from "../forgetPassword/ForgetPasswordComponent";
import { logIn } from "../../../../services/UserServices";
import { useNavigate } from "react-router-dom";
import authStore from "../../../../store/AuthStore";

interface LogInClientProps {
  role: string;
  placeholder: string;
}

const LogInClient = ({ role, placeholder }: LogInClientProps) => {
  const [step, setStep] = useState<number>(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser, setLoading } = authStore();

  const handleLogin = async (data: { [key: string]: string }) => {
    setError("");
    const payload = { ...data, role: role };

    try {
      const response = await logIn(payload);

      setUser(response.payload);
      setLoading(false);
      if (response.success === true) navigate("/dashboard");
    } catch (error: any) {
      if (error?.response?.data?.message)
        setError(error?.response?.data?.message);
    }
  };

  const handleResetPassword = () => {};

  return (
    <div className={styles.wrapper}>
      <div className="d-f f-dir-col">
        <div>
          <h1>Sign in to Takatuf</h1>
          <p className={styles.placeholder}>{placeholder}</p>
        </div>
        <div className={`${styles.formContainer} d-f f-dir-col`}>
          {step === 0 ? (
            <LogInComponent
              onLogin={handleLogin}
              onForgetPassword={() => setStep((prev) => prev + 1)}
            >
              {error && (
                <small className="errorMsg d-f align-center error">
                  {error}
                </small>
              )}
            </LogInComponent>
          ) : (
            <ForgetPasswordComponent
              moveBackward={() => setStep((prev) => prev - 1)}
              onReset={handleResetPassword}
            />
          )}
        </div>
      </div>

      <span className="line "></span>

      <AuthFooterLink
        text="Don't have an account?"
        link="Sign Up"
        redirectTo={`/auth/${role}/register`}
      />
    </div>
  );
};

export default LogInClient;
