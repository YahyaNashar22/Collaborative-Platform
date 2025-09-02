import { useEffect, useRef, useState } from "react";
import styles from "./OTPForm.module.css";
import LibButton from "../../../../libs/common/lib-button/LibButton";
import { sendOtp } from "../../../../services/UserServices";
import { toast } from "react-toastify";

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
}) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [number, setNumber] = useState<string[]>(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const isNumber = (value: string) => !isNaN(Number(value));

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

  const handleChange = (value: string, index: number) => {
    if (!isNumber(value)) return;

    const newNumber = [...number];
    newNumber[index] = value;
    setNumber(newNumber);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (
      index === inputRefs.current.length - 1 &&
      newNumber.every((digit) => digit && digit.trim() !== "")
    ) {
      onSubmit(newNumber.join(""));
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0) return;

    try {
      await sendOtp(email);
      setTimeLeft(5 * 60);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error Resending OTP!");
    }
  };

  return (
    <div className={`${styles.formContainer} d-f f-dir-col`}>
      <h1>Enter Verification Code</h1>
      <p>
        Verification code has been sent to:{" "}
        <span className="purple bold">{email}</span>
      </p>
      {isVerifying ? (
        <span className="loader"></span>
      ) : (
        <>
          <form className={`${styles.form} d-f align-center`}>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                className={`${styles.inputHolder} d-f align-center`}
                key={index}
              >
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
        </>
      )}

      <div className={styles.errorInvalidOtp}>
        {errorMessage && (
          <small
            className="errorMsg d-f align-center error"
            style={{ margin: "1px" }}
          >
            {errorMessage}
          </small>
        )}
      </div>

      <div className={`${styles.buttons} d-f align-center justify-start`}>
        <LibButton
          label="Back"
          onSubmit={moveBackward}
          backgroundColor="#57417e"
          hoverColor="#49356a"
          padding="2px 36.2px"
        />
      </div>
    </div>
  );
};

export default OTPForm;
