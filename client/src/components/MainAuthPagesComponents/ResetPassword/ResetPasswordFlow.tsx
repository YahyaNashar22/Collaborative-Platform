import { useState } from "react";

import styles from "./ResetPasswordFlow.module.css";
import {
  sendOtp,
  verifyEmailReset,
  verifyOtp,
} from "../../../services/UserServices";
import { Validate } from "../../../utils/Validate";
import ForgetPasswordComponent from "../LogIn/forgetPassword/ForgetPasswordComponent";
import OTPForm from "../SignUp/StepThreeForm/OTPForm";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import LibButton from "../../../libs/common/lib-button/LibButton";
import { toast } from "react-toastify";
import ResetPasswordBy from "../ResetPasswordBy/ResetPasswordBy";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ResetPasswordFlowProps {
  onSubmit: (data: {
    email: string;
    recoveryEmail: string;
    password: string;
  }) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

const ResetPasswordFlow = ({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ResetPasswordFlowProps) => {
  const { t } = useTranslation();

  const [step, setStep] = useState(1);
  const [otpEmail, setOtpEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [resetEmailsData, setResetEmailsData] = useState<{
    email: string;
    recoveryEmail: string;
  }>({
    email: "",
    recoveryEmail: "",
  });

  const [passwordError, setPasswordError] = useState({
    password: "",
    confirmPassword: "",
  });
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const { pathname } = useLocation();

  const checkEmailExist = async (email: string) => {
    const role = pathname.split("/")[2];
    try {
      const response = await verifyEmailReset(email, role);
      if (!response.exists) {
        toast.error(t("Email does not exist"));
        return false;
      }
      setResetEmailsData(response.data);
      setStep(2);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || t("Failed to check email"));
      return false;
    }
  };

  const handleSendOtp = async (email: string) => {
    if (!email) {
      return;
    }

    try {
      setIsSendingOtp(true);
      await sendOtp(email);
      setOtpEmail(email);
      setStep(3);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || t("Failed to send OTP"));
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
      setStep(4);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || t("Failed to verify OTP"));
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePasswordChange = (name: string, value: string) => {
    setNewPassword((prev) => ({ ...prev, [name]: value }));

    setPasswordError((prev) => ({ ...prev, [name]: "" }));
    const err = t(Validate(name, value, true, "text"));

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
        password: t("Password is required"),
      }));
      hasError = true;
    }
    if (!confirmPassword) {
      setPasswordError((prev) => ({
        ...prev,
        confirmPassword: t("Confirm password is required"),
      }));
      hasError = true;
    }

    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordError((prev) => ({
        ...prev,
        confirmPassword: t("Passwords do not match"),
      }));
      hasError = true;
    }

    if (hasError) return;

    setPasswordError({ password: "", confirmPassword: "" });
    onSubmit({
      email: resetEmailsData.email,
      recoveryEmail: resetEmailsData.recoveryEmail,
      password: password,
    });
  };

  return (
    <div className={styles.resetPasswordFlow}>
      {step === 1 && !isSendingOtp ? (
        <ForgetPasswordComponent
          moveBackward={onCancel || (() => {})}
          onReset={checkEmailExist}
        />
      ) : isSendingOtp ? (
        <span className="loader"></span>
      ) : null}

      {step === 2 && (
        <ResetPasswordBy
          moveBackward={() => setStep(1)}
          moveForward={(email: string) => {
            handleSendOtp(email);
          }}
          userEmail={resetEmailsData.email || ""}
          recoveryEmail={resetEmailsData.recoveryEmail || ""}
        />
      )}
      {step === 3 && (
        <OTPForm
          email={otpEmail}
          onSubmit={handleVerifyOtp}
          moveBackward={() => setStep(2)}
          isVerifying={isVerifying}
        />
      )}

      {step === 4 && (
        <>
          <TextInput
            name="password"
            label={t("New Password")}
            placeholder={t("New Password")}
            type="text"
            required
            value={newPassword.password}
            onChange={(value, name) => handlePasswordChange(name, value)}
            errorMessage={passwordError.password}
          />
          <TextInput
            name="confirmPassword"
            label={t("Confirm New Password")}
            placeholder={t("Confirm New Password")}
            type="text"
            required
            value={newPassword.confirmPassword}
            onChange={(value, name) => handlePasswordChange(name, value)}
            errorMessage={passwordError.confirmPassword}
          />

          <div className={`${styles.buttons} d-f align-center justify-between`}>
            <LibButton
              label="Cancel"
              onSubmit={() => setStep(1)}
              bold={true}
              padding="0"
              outlined
              color="var(--deep-purple)"
              hoverColor="#8563c326"
            />
            <LibButton
              label={isSubmitting ? t("Resetting...") : t("Reset Password")}
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
