import { useState } from "react";
import AuthFooterLink from "../../../../shared/AuthFooterLink/AuthFooterLink";
import LogInComponent from "../LogInComponent";
import styles from "./LogInPartner.module.css";
import ForgetPasswordComponent from "../forgetPassword/ForgetPasswordComponent";

type LogInClientProps = {
  role: string;
  placeholder: string;
};

const LogInPartner = ({ role, placeholder }: LogInClientProps) => {
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

      <span className="line"></span>

      <AuthFooterLink
        text="Don't have an account?"
        link="Sign Up"
        redirectTo={`/auth/${role}/register`}
      />
    </div>
  );
};

export default LogInPartner;
