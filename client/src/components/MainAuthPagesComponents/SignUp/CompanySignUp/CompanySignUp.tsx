import { TypeFormData } from "../../../../interfaces/registerSignup";
import SimpleFormView from "../StepOneForm/SimpleFormView";
import useFormStore from "../../../../store/FormsStore";
import styles from "./CompanySignUp.module.css";
import ProgressBar from "../../../../shared/ProgressBar/ProgressBar";
import AuthFooterLink from "../../../../shared/AuthFooterLink/AuthFooterLink";
import OrgInformationForm from "./StepTwoForm/OrgInformationForm";
import OTPForm from "../StepThreeForm/OTPForm";
import { useState } from "react";
import authStore from "../../../../store/AuthStore";
import {
  sendOtp,
  verifyOtp,
  signUpCompanyClient,
} from "../../../../services/UserServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface CompanySignUpProps {
  title: string;
  placeholder: string;
  formData: TypeFormData;
}

const CompanySignUp = ({
  title,
  placeholder,
  formData,
}: CompanySignUpProps) => {
  const [, setIsLoading] = useState(false);
  const { increaseStep, role, type, decreaseStep, getFormValues, setStep } =
    useFormStore();
  const { setUser, setLoading } = authStore();
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpEmail, setOtpEmail] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const step = useFormStore((state) => state.step);

  const data = formData.formData[step] || [];
  const formTitle = data.formTitle;

  const handleSendOtpAndProceed = async () => {
    const payload = getFormValues(role, type);
    const email = payload?.email;
    if (!email) {
      setError("Email is required before proceeding.");
      return;
    }

    try {
      await sendOtp(email as string);
      setOtpEmail(email as string);
      setError("");
      setOtpError("");
      increaseStep();
    } catch (err: any) {
      toast.error((error as any)?.data?.message || "Error Sending OTP!");
      setError(err?.response?.data?.message || "Failed to send OTP");
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
      const newPayload = { ...payload, accountType: "company" };
      const result = await signUpCompanyClient(newPayload);
      setUser(result);
      setLoading(false);
      toast.success("Signed up successfully!");
      setOtpError("");
      navigate("/dashboard");
    } catch (error: any) {
      if ((error as any)?.data?.message === "Invalid or expired email OTP") {
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
          moveForward={increaseStep}
          error={error}
        />
      );
      break;
    case 1:
      content = (
        <OrgInformationForm
          data={data}
          title={formTitle}
          moveForward={handleSendOtpAndProceed}
          moveBackward={decreaseStep}
        />
      );
      break;
    case 2:
      content = (
        <OTPForm
          onSubmit={handleSignUp}
          moveBackward={decreaseStep}
          email={otpEmail}
          errorMessage={otpError}
          isVerifying={isVerifying}
        />
      );
      break;
    default:
      content = (
        <SimpleFormView
          data={data}
          title={formTitle}
          moveForward={increaseStep}
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
        link="Log In"
        redirectTo={`/auth/${role}/login`}
      />
    </div>
  );
};

export default CompanySignUp;
