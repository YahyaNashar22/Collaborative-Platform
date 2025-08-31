import { TypeFormData } from "../../../../interfaces/registerSignup";
import SimpleFormView from "../StepOneForm/SimpleFormView";
import useFormStore from "../../../../store/FormsStore";
import styles from "./IndividualSignUp.module.css";
import ProgressBar from "../../../../shared/ProgressBar/ProgressBar";
import AuthFooterLink from "../../../../shared/AuthFooterLink/AuthFooterLink";
import OTPForm from "../StepThreeForm/OTPForm";
import { useState } from "react";
import {
  sendOtp,
  verifyOtp,
  signUpIndividualClient,
} from "../../../../services/UserServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import authStore from "../../../../store/AuthStore";

interface individualProps {
  title: string;
  placeholder: string;
  formData: TypeFormData;
}

const IndividualSignUp = ({
  title,
  placeholder,
  formData,
}: individualProps) => {
  const { setUser, setLoading } = authStore();
  const { increaseStep, decreaseStep, getFormValues, type, role } =
    useFormStore();
  const [, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const navigate = useNavigate();

  const step = useFormStore((state) => state.step);
  const data = formData.formData[step] || [];
  const formTitle = data.formTitle;

  const handleSendOtpAndProceed = async () => {
    const payload = getFormValues(role, type);
    const email = payload?.email;

    if (!email) {
      setError("Email is required to proceed.");
      return;
    }

    try {
      await sendOtp(email as string);
      setOtpEmail(email as string);
      setError("");
      setOtpError("");
      increaseStep();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to send OTP.");
    }
  };

  const handleSignUp = async (otpCode: string) => {
    const payload = getFormValues(role, type);
    setIsLoading(true);
    setIsVerifying(true);
    try {
      const isVerified = await verifyOtp(otpEmail, otpCode.toString());

      if (!isVerified.success) {
        setOtpError("Invalid or expired OTP.");
        return;
      }
      const result = await signUpIndividualClient(payload);
      setUser(result.payload);
      setLoading(false);
      toast.success("Signed up successfully!");
      setOtpError("");
      navigate("/dashboard");
    } catch (error: any) {
      if (error?.response?.data?.message === "Invalid or expired email OTP") {
        setOtpError("Invalid or expired OTP.");
      } else {
        setOtpError(error?.response?.data?.message || "Sign-up failed");
      }
    } finally {
      setIsLoading(false);
      setIsVerifying(false);
    }
  };

  let content;
  switch (step) {
    case 0:
      content = (
        <SimpleFormView
          data={data}
          title={formTitle}
          moveForward={handleSendOtpAndProceed}
          error={error}
        />
      );
      break;

    case 1:
      content = (
        <OTPForm
          onSubmit={handleSignUp}
          moveBackward={decreaseStep}
          email={otpEmail}
          isVerifying={isVerifying}
          errorMessage={otpError}
        />
      );
      break;

    default:
      content = (
        <SimpleFormView
          data={data}
          title={formTitle}
          moveForward={increaseStep}
          error={error}
        />
      );
  }

  return (
    <div className={styles.wrapper}>
      <div className="d-f gap-05 f-wrap">
        <h1>{title}</h1>
        <ProgressBar currentNode={step} nodes={formData.steps} />
      </div>
      <p className={styles.placeholder}>{placeholder}</p>
      {content}
      <span className="line"></span>
      <AuthFooterLink
        text="Already have an account?"
        link="Sign In"
        redirectTo={`/auth/${role}/login`}
      />
    </div>
  );
};

export default IndividualSignUp;
