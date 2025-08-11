import { useEffect, useRef, useState } from "react";
import styles from "./OTPForm.module.css";
import LibButton from "../../../../libs/common/lib-button/LibButton";
import { sendOtp } from "../../../../services/UserServices";

interface OTPFormProps {
  moveBackward: () => void;
  onSubmit: (otpCode: string) => void;
  email: string;
  errorMessage?: string;
  isVerifying: boolean;
  isResetPassword?: boolean;
}

const OTPForm: React.FC<OTPFormProps> = ({
  moveBackward,
  onSubmit,
  email,
  errorMessage,
  isVerifying,
  isResetPassword = false,
}) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [number, setNumber] = useState<string[]>(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(5 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const isNumber = (value: string) => !isNaN(Number(value));

  const handleChange = (value: string, index: number) => {
    if (!isNumber(value)) return;

    const newNumber = [...number];
    newNumber[index] = value;
    setNumber(newNumber);
    setErrorMsg("");

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0) return;

    try {
      await sendOtp(email);
      setTimeLeft(5 * 60);
    } catch (err) {
      toast.error(error?.response?.data?.message || "Error Resending OTP!");
    }
  };

  const handleVerify = async () => {
    if (number.some((digit) => digit === "")) {
      setErrorMsg("* Please enter all 4 digits of the code.");
      return;
    }

    if (!isResetPassword && !agreedToTerms) {
      setErrorMsg("* You must agree to the subscription terms.");
      return;
    }

    onSubmit(number.join(""));
  };

  return (
    <div className={`${styles.formContainer} d-f f-dir-col`}>
      <h1>Enter Verification Code</h1>
      <small>
        Verification code has been sent to:{" "}
        <span className="purple bold">{email}</span>
      </small>

      <form className={`${styles.form} d-f align-center`}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div className={`${styles.inputHolder} d-f align-center`} key={index}>
            <input
              type="text"
              maxLength={1}
              ref={(el) => (inputRefs.current[index] = el)}
              className={`w-100 ${
                selectedIndex === index ? styles.selected : ""
              } pointer`}
              value={number[index]}
              onFocus={() => {
                setSelectedIndex(index);
                setErrorMsg("");
              }}
              autoFocus={index === 0}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => {
                if (
                  e.key === "Backspace" &&
                  number[index] === "" &&
                  index > 0
                ) {
                  inputRefs.current[index - 1]?.focus();
                }
              }}
            />
          </div>
        ))}
      </form>

      <div className={`${styles.otpActionBtn} d-f purple bold`}>
        <p
          className={`${timeLeft > 0 ? styles.disabled : ""} pointer`}
          onClick={handleResend}
        >
          Resend Code
        </p>
        <p>{formatTime(timeLeft)}</p>
      </div>

      {!isResetPassword && (
        <div className={` ${styles.terms} d-f align-center`}>
          <input
            type="checkbox"
            name="terms"
            id="terms"
            className="pointer"
            checked={agreedToTerms}
            onChange={(e) => {
              setAgreedToTerms(e.target.checked);
              setErrorMsg("");
            }}
          />
          <label htmlFor="terms" className="pointer">
            I agree to the{" "}
            <span className="purple pointer bold">
              Takatuf Subscription Agreement
            </span>
          </label>
        </div>
      )}

      {(errorMsg || errorMessage) && (
        <small className={`error ${styles.otpError}`}>
          {errorMsg || errorMessage}
        </small>
      )}

      <div className={`${styles.buttons} d-f align-center justify-start`}>
        <LibButton
          label="Back"
          onSubmit={moveBackward}
          backgroundColor="#57417e"
          hoverColor="#49356a"
          padding="2px 36.2px"
        />
        <LibButton
          label={
            isVerifying
              ? "Verifying..."
              : isResetPassword
              ? "Reset Password"
              : "Create Account"
          }
          onSubmit={handleVerify}
          backgroundColor="#825beb"
          disabled={isVerifying}
          hoverColor=" #6c46d9"
          padding="2px 20px"
        />
      </div>
    </div>
  );
};

export default OTPForm;
