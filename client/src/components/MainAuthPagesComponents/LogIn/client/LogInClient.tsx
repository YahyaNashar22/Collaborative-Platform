import AuthFooterLink from "../../../../shared/AuthFooterLink/AuthFooterLink";
import styles from "./LogInClient.module.css";

import LogInComponent from "../LogInComponent";
import { useState } from "react";
import ForgetPasswordComponent from "../forgetPassword/ForgetPasswordComponent";

interface LogInClientProps {
  role: string;
  placeholder: string;
}

const LogInClient = ({ role, placeholder }: LogInClientProps) => {
  const [step, setStep] = useState<number>(0);

  const handleLogin = (data: { [key: string]: string }) => {
    console.log(data);
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
            />
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
