// @ts-nocheck

import { useState } from "react";
import styles from "./SecurityData.module.css";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import LibButton from "../../../libs/common/lib-button/LibButton";
import OTPForm from "../../MainAuthPagesComponents/SignUp/StepThreeForm/OTPForm";
import { useNavigate } from "react-router-dom";
import {
  changePassword,
  resetPassword,
  sendOtp,
  verifyOtp,
} from "../../../services/UserServices";
import { toast } from "react-toastify";
import ResetPasswordBy from "../../MainAuthPagesComponents/ResetPasswordBy/ResetPasswordBy";
import { Validate } from "../../../utils/Validate";
import { useTranslation } from "react-i18next";

interface SecurityDataProps {
  email: string;
  recoveryEmail: string;
  isViewer?: boolean;
}

const SecurityData = ({
  email,
  recoveryEmail,
  isViewer = false,
}: SecurityDataProps) => {
  const { t } = useTranslation();

  const [securityTab, setSecurityTab] = useState<1 | 2 | 3 | 4>(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [securityData, setSecurityData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [otpEmail, setOtpEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  // For OTP tab
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChangePasswordSubmit = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwordData;

    const passwordValidationErrors = {
      oldPassword: t(Validate("oldPassword", oldPassword, true)),
      newPassword: t(Validate("newPassword", newPassword, true)),
      confirmPassword:
        t(Validate("confirmPassword", confirmPassword, true) ||
        (newPassword !== confirmPassword ? t("Passwords do not match") : "")),
    };

    if (Object.values(passwordValidationErrors).some((error) => error)) {
      setErrors(passwordValidationErrors);
      return;
    }

    setLoading(true);
    try {
      await changePassword({
        email,
        oldPassword,
        password: newPassword,
      });
      setErrors({});
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setErrors({ oldPassword: t("Incorrect old password") });
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (email: string) => {
    if (!email) {
      return;
    }
    setOtpError("");
    try {
      setIsSendingOtp(true);
      await sendOtp(email);
      setOtpEmail(email);
      setSecurityTab(3);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || t("Failed to send OTP"));
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    setIsVerifying(true);
    try {
      setOtpError(null);
      const result = await verifyOtp(otpEmail, otp);
      if (!result.success) {
        return;
      }
      setErrors({});
      setSecurityData({ newPassword: "", confirmPassword: "" });
      setSecurityTab(4);
    } catch (error) {
      console.error(error);
      setOtpError(t("Invalid or expired OTP. Please try again."));
    } finally {
      setIsVerifying(false);
    }
  };

  // ---- Handlers for Tab 3 (Reset password after OTP) ----
  const handleChange = (
    value: string,
    name: string,
    isPasswordData: boolean = true,
  ) => {
    const targetState = isPasswordData ? passwordData : securityData;
    const setTargetState = isPasswordData ? setPasswordData : setSecurityData;

    setTargetState((prev: any) => ({ ...prev, [name]: value }));

    let error = t(Validate(name, value, true, "text"));

    if (name === "confirmPassword" && value !== targetState.newPassword) {
      error = t("Passwords do not match");
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSecurityDataSubmit = async () => {
    const { newPassword, confirmPassword } = securityData;

    const securityValidationErrors = {
      newPassword: t(Validate("newPassword", newPassword, true)),
      confirmPassword:
        t(Validate("confirmPassword", confirmPassword, true) ||
        (newPassword !== confirmPassword ? t("Passwords do not match") : "")),
    };

    if (Object.values(securityValidationErrors).some((error) => error)) {
      setErrors(securityValidationErrors);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email: email,
        password: newPassword,
        recoveryEmail: recoveryEmail,
      };
      await resetPassword(payload);
      setErrors({});
      navigate("/dashboard");
    } catch {
      toast.error(t("Failed to reset password"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Tab 1: Change Password */}
      {securityTab === 1 && (
        <>
          <form className="d-f f-dir-col">
            <TextInput
              name="oldPassword"
              label={t("Old Password")}
              placeholder={t("Old Password")}
              type="text"
              required
              value={passwordData.oldPassword}
              onChange={(value, name) => handleChange(value, name, true)}
              errorMessage={errors.oldPassword}
              disabled={isViewer}
            />
            <TextInput
              name="newPassword"
              label={t("New Password")}
              placeholder={t("New Password")}
              type="text"
              required
              value={passwordData.newPassword}
              onChange={(value, name) => handleChange(value, name, true)}
              errorMessage={errors.newPassword}
              disabled={isViewer}
            />
            <TextInput
              name="confirmPassword"
              label={t("Confirm Password")}
              placeholder={t("Confirm Password")}
              type="text"
              required
              value={passwordData.confirmPassword}
              onChange={(value, name) => handleChange(value, name, true)}
              errorMessage={errors.confirmPassword}
              disabled={isViewer}
            />
          </form>

          {!isViewer && (
            <div
              className={`${styles.resetPasswordHolder} d-f align-center justify-between`}
            >
              <p
                className={styles.switchMethod}
                onClick={() => setSecurityTab(2)}
              >
                {t("Forgot password? Reset via email")}
              </p>
              <LibButton
                label="Save"
                onSubmit={handleChangePasswordSubmit}
                padding="0"
              />
            </div>
          )}
        </>
      )}

      {/* Tab 2: OTP */}
      {securityTab === 2 && !isSendingOtp ? (
        <ResetPasswordBy
          moveBackward={() => {
            setErrors({});
            setPasswordData({
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
            setSecurityTab(1);
          }}
          moveForward={(email: string) => {
            handleSendOtp(email);
          }}
          userEmail={email || ""}
          recoveryEmail={recoveryEmail || ""}
        />
      ) : isSendingOtp ? (
        <span className="loader"></span>
      ) : null}

      {securityTab === 3 && (
        <>
          <OTPForm
            email={otpEmail}
            onSubmit={handleVerifyOtp}
            moveBackward={() => setSecurityTab(2)}
            errorMessage={otpError || ""}
            isVerifying={isVerifying}
          />
        </>
      )}

      {securityTab === 4 && (
        <>
          <form className="d-f f-dir-col">
            <TextInput
              name="newPassword"
              label={t("New Password")}
              placeholder={t("New Password")}
              type="text"
              required
              value={securityData.newPassword}
              onChange={(value, name) => handleChange(value, name, false)}
              errorMessage={errors.newPassword}
            />
            <TextInput
              name="confirmPassword"
              label={t("Confirm Password")}
              placeholder={t("Confirm Password")}
              type="text"
              required
              value={securityData.confirmPassword}
              onChange={(value, name) => handleChange(value, name, false)}
              errorMessage={errors.confirmPassword}
            />
          </form>
          {!isViewer && (
            <div
              className={`${styles.buttons} d-f align-center justify-between`}
            >
              <LibButton
                label="Cancel"
                onSubmit={() => setSecurityTab(1)}
                bold={true}
                padding="0"
                outlined
                color="var(--deep-purple)"
                hoverColor="#8563c326"
              />
              <LibButton label="Save" onSubmit={handleSecurityDataSubmit} />
            </div>
          )}
          {}
        </>
      )}
    </div>
  );
};

export default SecurityData;
