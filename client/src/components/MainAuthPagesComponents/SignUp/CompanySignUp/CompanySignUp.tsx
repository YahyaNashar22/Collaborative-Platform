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
import { signUp } from "../../../../services/UserServices";
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
  const { increaseStep, role, type, decreaseStep, getFormValues } =
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
      const result = await signUp(payload, type);
      setUser({
        firstName: result.payload.firstName,
        lastName: result.payload.lastName,
      });
      setLoading(false);
      console.log(result);
      increaseStep();
      toast.success("Signed up successfully!");
      setError("");
      navigate("/dashboard");
    } catch (error: any) {
      decreaseStep();
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
        />
      );
      break;
    case 1:
      content = (
        <OrgInformationForm
          data={data}
          title={formTitle}
          moveForward={increaseStep}
          moveBackward={decreaseStep}
        />
      );
      break;
    case 2:
      content = <OTPForm onSubmit={handleSignUp} moveBackward={decreaseStep} />;
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
      <div className="d-f">
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
