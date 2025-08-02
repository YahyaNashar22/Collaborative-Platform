import { useState } from "react";

import styles from "./ResetPasswordFlow.module.css";
import { sendOtp, verifyOtp } from "../../../services/UserServices";
import { Validate } from "../../../utils/Validate";
import ForgetPasswordComponent from "../LogIn/forgetPassword/ForgetPasswordComponent";
import OTPForm from "../SignUp/StepThreeForm/OTPForm";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import LibButton from "../../../libs/common/lib-button/LibButton";

interface ResetPasswordFlowProps {
  onSubmit: (data: { email: string; password: string }) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

const ResetPasswordFlow = ({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ResetPasswordFlowProps) => {
  const [step, setStep] = useState(1);
  const [otpEmail, setOtpEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const [passwordError, setPasswordError] = useState({
    password: "",
    confirmPassword: "",
  });
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSendOtp = async (email: string) => {
    if (!email) {
      return;
    }

    try {
      setIsSendingOtp(true);
      await sendOtp(email);
      setOtpEmail(email);
      setStep(2);
    } catch (err: any) {
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async (otpCode: string) => {
    setIsVerifying(true);
    try {
      const result = await verifyOtp(otpEmail, otpCode);
      if (!result.success) {
        return;
      }
      setStep(3);
    } catch (err: any) {
      //   setStep(1);
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePasswordChange = (name: string, value: string) => {
    setNewPassword((prev) => ({ ...prev, [name]: value }));

    setPasswordError((prev) => ({ ...prev, [name]: "" }));
    const err = Validate(name, value, true, "text");

    if (err) {
      setPasswordError((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleSubmit = () => {
    const { password, confirmPassword } = newPassword;

    let hasError = false;
    if (!password) {
      setPasswordError((prev) => ({
        ...prev,
        password: "Password is required",
      }));
      hasError = true;
    }
    if (!confirmPassword) {
      setPasswordError((prev) => ({
        ...prev,
        confirmPassword: "Confirm password is required",
      }));
      hasError = true;
    }

    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordError((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      hasError = true;
    }

    if (hasError) return;

    setPasswordError({ password: "", confirmPassword: "" });
    onSubmit({ email: otpEmail, password: password });
  };

  return (
    <div className={styles.resetPasswordFlow}>
      {step === 1 && !isSendingOtp ? (
        <ForgetPasswordComponent
          moveBackward={onCancel}
          onReset={handleSendOtp}
        />
      ) : isSendingOtp ? (
        <span className="loader"></span>
      ) : null}

      {step === 2 && (
        <OTPForm
          email={otpEmail}
          onSubmit={handleVerifyOtp}
          moveBackward={() => setStep(1)}
          isVerifying={isVerifying}
        />
      )}

      {step === 3 && (
        <>
          <TextInput
            name="password"
            label="New Password"
            placeholder="New Password"
            type="text"
            required
            value={newPassword.password}
            onChange={(value, name) => handlePasswordChange(name, value)}
            errorMessage={passwordError.password}
          />
          <TextInput
            name="confirmPassword"
            label="Confirm New Password"
            placeholder="Confirm New Password"
            type="text"
            required
            value={newPassword.confirmPassword}
            onChange={(value, name) => handlePasswordChange(name, value)}
            errorMessage={passwordError.confirmPassword}
          />

          <div className={styles.btn}>
            <LibButton
              label={isSubmitting ? "Resetting..." : "Reset Password"}
              onSubmit={handleSubmit}
              backgroundColor="#825beb"
              hoverColor="#6c46d9"
              padding="0 10px"
              disabled={isSubmitting}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ResetPasswordFlow;
