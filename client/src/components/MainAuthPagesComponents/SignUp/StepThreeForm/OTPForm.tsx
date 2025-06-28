import { useEffect, useRef, useState } from "react";
import styles from "./OTPForm.module.css";
import LibButton from "../../../../libs/common/lib-button/LibButton";

interface OTPFromProps {
  moveBackward: () => void;
  onSubmit: () => void;
}
const OTPForm: React.FC<OTPFromProps> = ({ moveBackward, onSubmit }) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [number, setNumber] = useState<string[]>(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(2 * 60);

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

    // Move focus to next input
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
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
              onFocus={() => setSelectedIndex(index)}
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
        <p className={`${timeLeft > 0 ? styles.disabled : ""} pointer`}>
          Resend Code
        </p>
        <p>{formatTime(timeLeft)}</p>
      </div>
      <div className={` ${styles.terms} d-f align-center`}>
        <input type="checkbox" name="terms" id="terms" className="pointer" />
        <label htmlFor="terms" className="pointer">
          I agree to the{" "}
          <span className="purple pointer bold">
            Takatuf Subscription Agreement
          </span>
        </label>
      </div>
      <div className={`${styles.buttons} d-f align-center justify-start`}>
        <LibButton
          label="Back"
          onSubmit={moveBackward}
          backgroundColor="#57417e"
          hoverColor="#49356a"
          padding="2px 36.2px"
        />
        <LibButton
          label="Create Account"
          onSubmit={onSubmit}
          backgroundColor="#825beb"
          hoverColor=" #6c46d9"
          padding="2px 20px"
        />
      </div>
    </div>
  );
};

export default OTPForm;
