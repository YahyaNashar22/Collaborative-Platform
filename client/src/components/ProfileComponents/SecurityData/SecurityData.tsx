import { useEffect, useState } from "react";
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

interface SecurityDataProps {
  email: string;
  isViewer?: boolean;
}

const SecurityData = ({ email, isViewer = false }: SecurityDataProps) => {
  const [securityTab, setSecurityTab] = useState<1 | 2 | 3>(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>(
    {}
  );

  // For OTP tab
  const [otpError, setOtpError] = useState<string | null>(null);

  const validateNewPasswords = (
    newPassword: string,
    confirmPassword: string
  ): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (!newPassword) errors.newPassword = "New password is required";
    if (!confirmPassword)
      errors.confirmPassword = "Please confirm new password";
    if (newPassword && confirmPassword && newPassword !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    return errors;
  };

  // For tab 3 (Reset password after OTP)
  const [SecurityDataData, setSecurityDataData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [SecurityDataErrors, setSecurityDataErrors] = useState<
    Record<string, string>
  >({});

  const navigate = useNavigate();

  const handlePasswordChange = (value: string, name: string) => {
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    let error = "";
    if (!value) error = "This field is required";
    else if (name === "confirmPassword" && value !== passwordData.newPassword)
      error = "Passwords do not match";

    setPasswordErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChangePasswordSubmit = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwordData;
    const passwordValidationErrors = validateNewPasswords(
      newPassword,
      confirmPassword
    );

    const newErrors: Record<string, string> = {
      ...passwordValidationErrors,
    };

    if (!oldPassword) newErrors.oldPassword = "Old password is required";

    if (Object.keys(newErrors).length > 0) {
      setPasswordErrors(newErrors);
      return;
    }
    setLoading(true);
    try {
      await changePassword({
        email,
        oldPassword,
        password: newPassword,
      });
      setPasswordErrors({});
      navigate("/dashboard");
    } catch (err) {
      setPasswordErrors({ oldPassword: "Incorrect old password" });
    } finally {
      setLoading(false);
    }
  };

  // ---- Handlers for Tab 2 (OTP) ----
  useEffect(() => {
    if (securityTab === 2) {
      (async () => {
        try {
          await sendOtp(email);
          setOtpError(null);
        } catch (error) {
          setOtpError("Failed to send OTP. Please try again.");
        }
      })();
    }
  }, [securityTab, email]);

  const handleOtpSubmit = async (otp: string) => {
    setIsVerifying(true);
    try {
      setOtpError(null);
      await verifyOtp(email, otp);
      setSecurityTab(3);
    } catch (error) {
      setOtpError("Invalid or expired OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSendOtpAgain = async () => {
    try {
      await sendOtp(email);
      setOtpError(null);
    } catch {
      setOtpError("Failed to resend OTP. Please try later.");
    }
  };

  // ---- Handlers for Tab 3 (Reset password after OTP) ----
  const handleSecurityDataChange = (value: string, name: string) => {
    setSecurityDataData((prev) => ({ ...prev, [name]: value }));
    let error = "";
    if (!value) error = "This field is required";
    else if (
      name === "confirmPassword" &&
      value !== SecurityDataData.newPassword
    )
      error = "Passwords do not match";

    setSecurityDataErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSecurityDataSubmit = async () => {
    const { newPassword, confirmPassword } = SecurityDataData;
    const newErrors = validateNewPasswords(newPassword, confirmPassword);

    if (Object.keys(newErrors).length > 0) {
      setSecurityDataErrors(newErrors);
      return;
    }
    setLoading(true);
    try {
      const payload = { email: email, password: newPassword };
      await resetPassword(payload);
      setSecurityDataErrors({});
      navigate("/dashboard");
    } catch (err) {
      setSecurityDataErrors({ newPassword: "Failed to reset password" });
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
              label="Old Password"
              placeholder="Old Password"
              type="text"
              required
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              errorMessage={passwordErrors.oldPassword}
              disabled={isViewer}
            />
            <TextInput
              name="newPassword"
              label="New Password"
              placeholder="New Password"
              type="text"
              required
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              errorMessage={passwordErrors.newPassword}
              disabled={isViewer}
            />
            <TextInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
              type="text"
              required
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              errorMessage={passwordErrors.confirmPassword}
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
                Forgot password? Reset via email
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
      {securityTab === 2 && (
        <OTPForm
          email={email}
          moveBackward={() => setSecurityTab(1)}
          onSubmit={handleOtpSubmit}
          errorMessage={otpError}
          isVerifying={isVerifying}
          allowResend={true}
          onResend={handleSendOtpAgain}
          isResetPassword={true}
        />
      )}

      {/* Tab 3: Reset Password after OTP */}
      {securityTab === 3 && !loading ? (
        <>
          <form className="d-f f-dir-col">
            <TextInput
              name="newPassword"
              label="New Password"
              placeholder="New Password"
              type="text"
              required
              value={SecurityDataData.newPassword}
              onChange={handleSecurityDataChange}
              errorMessage={SecurityDataErrors.newPassword}
            />
            <TextInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
              type="text"
              required
              value={SecurityDataData.confirmPassword}
              onChange={handleSecurityDataChange}
              errorMessage={SecurityDataErrors.confirmPassword}
            />
          </form>
          {!isViewer && (
            <div className={`${styles.buttons} d-f align-center justify-end`}>
              <LibButton label="Back" onSubmit={() => setSecurityTab(1)} />
              <LibButton label="Save" onSubmit={handleSecurityDataSubmit} />
            </div>
          )}
        </>
      ) : loading ? (
        <span className="loader"></span>
      ) : null}
    </div>
  );
};

export default SecurityData;
