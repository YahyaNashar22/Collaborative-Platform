import { useEffect, useRef, useState } from "react";
import styles from "./OTPForm.module.css";
import LibButton from "../../../../libs/common/lib-button/LibButton";
import { sendOtp, verifyOtp } from "../../../../services/UserServices";
import useFormStore from "../../../../store/FormsStore";

interface OTPFromProps {
  moveBackward: () => void;
  onSubmit: () => void;
}
const OTPForm: React.FC<OTPFromProps> = ({ moveBackward, onSubmit }) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [number, setNumber] = useState<string[]>(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const { getFormValues, role, type } = useFormStore();

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formValues = getFormValues(role, type);
  const email = formValues?.email?.toString() || "";

  useEffect(() => {
    const send = async () => {
      try {
        await sendOtp(email);
        console.log("OTP sent");
      } catch (err) {
        console.error("Error sending OTP:", err);
      }
    };
    send();
  }, [email]);

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
      console.log("OTP resent");
      setTimeLeft(5 * 60);
    } catch (err) {
      console.error("Error resending OTP:", err);
    }
  };

  const handleVerify = async () => {
    if (number.some((digit) => digit === "")) {
      setErrorMsg("* Please enter all 4 digits of the code.");
      return;
    }

    const code = number.join("");
    console.log(code);

    if (!agreedToTerms) {
      setErrorMsg("* You must agree to the subscription terms.");
      return;
    }

    try {
      setIsVerifying(true);
      await verifyOtp(email, code);
      console.log("OTP verified");
      onSubmit();
    } catch (error) {
      console.error("OTP verification failed:", error);
      setErrorMsg("* Invalid OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className={`${styles.formContainer} d-f f-dir-col`}>
      <h1>Enter Verification Code</h1>
      <small>Verification code has been sent to your email</small>
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
      {errorMsg && (
        <small className={`error ${styles.otpError}`}>{errorMsg}</small>
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
          label={isVerifying ? "Verifying..." : "Create Account"}
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
