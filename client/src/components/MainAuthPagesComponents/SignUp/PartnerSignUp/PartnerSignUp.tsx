import { TypeFormData } from "../../../../interfaces/registerSignup";
import SimpleFormView from "../StepOneForm/SimpleFormView";
import useFormStore from "../../../../store/FormsStore";
import styles from "./PartnerSignUp.module.css";
import ProgressBar from "../../../../shared/ProgressBar/ProgressBar";
import AuthFooterLink from "../../../../shared/AuthFooterLink/AuthFooterLink";
import OTPForm from "../StepThreeForm/OTPForm";
import CompanyForm from "./StepTwoForm/CompanyForm";
import AddressForm from "./StepThreeForm/AddressForm";
import BankForm from "./StepFourForm/BankForm";
import DocumentsForm from "./StepFiveForm/DocumentsForm";
import authStore from "../../../../store/AuthStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../../../services/UserServices";
import { toast } from "react-toastify";

interface PartnerSignUpProps {
  title: string;
  placeholder: string;
  formData: TypeFormData;
}

const PartnerSignUp = ({
  title,
  placeholder,
  formData,
}: PartnerSignUpProps) => {
  const [, setIsLoading] = useState(false);
  const { increaseStep, role, type, decreaseStep, getFormValues, setStep } =
    useFormStore();
  const { setUser, setLoading } = authStore();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const step = useFormStore((state) => state.step);

  const data = formData.formData[step] || [];
  const formTitle = data.formTitle;

  const handleSignUp = async () => {
    const payload = getFormValues(role, type);
    setIsLoading(true);
    try {
      const response = await signUp(payload, type);
      setUser(response.payload);
      setLoading(false);
      console.log(response);
      increaseStep();
      toast.success("Signed up successfully!");
      setError("");
      navigate("/dashboard");
    } catch (error: any) {
      setStep(0);
      setError(error?.response?.data?.message || "Sign-up failed");
    } finally {
      setIsLoading(false);
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
        <CompanyForm
          data={data}
          title={formTitle}
          moveForward={increaseStep}
          moveBackward={decreaseStep}
        />
      );
      break;
    case 2:
      content = (
        <AddressForm
          data={data}
          title={formTitle}
          moveForward={increaseStep}
          moveBackward={decreaseStep}
        />
      );
      break;
    case 3:
      content = (
        <BankForm
          data={data}
          title={formTitle}
          moveForward={increaseStep}
          moveBackward={decreaseStep}
        />
      );
      break;
    case 4:
      content = (
        <DocumentsForm
          data={data}
          title={formTitle}
          moveForward={increaseStep}
          moveBackward={decreaseStep}
        />
      );
      break;
    case 5:
      content = <OTPForm onSubmit={handleSignUp} moveBackward={decreaseStep} />;

      break;
    default:
      break;
  }
  return (
    <div className={styles.wrapper}>
      <div className="d-f">
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

export default PartnerSignUp;
