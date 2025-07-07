import { TypeFormData } from "../../../../interfaces/registerSignup";
import SimpleFormView from "../StepOneForm/SimpleFormView";
import useFormStore from "../../../../store/FormsStore";
import styles from "./IndividualSignUp.module.css";
import ProgressBar from "../../../../shared/ProgressBar/ProgressBar";
import AuthFooterLink from "../../../../shared/AuthFooterLink/AuthFooterLink";
import OTPForm from "../StepThreeForm/OTPForm";
import { useState } from "react";
import { clientSignUp } from "../../../../services/UserServices";
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
  const { setUser } = authStore();
  const { increaseStep, decreaseStep, getFormValues, type, role } =
    useFormStore();
  const [, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const step = useFormStore((state) => state.step);

  const data = formData.formData[step] || [];
  const formTitle = data.formTitle;

  const handleSignUp = async () => {
    const payload = getFormValues(role, type);
    setIsLoading(true);
    try {
      const result = await clientSignUp(payload);
      setUser(result);
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
          error={error}
        />
      );
      break;

    case 1:
      content = <OTPForm onSubmit={handleSignUp} moveBackward={decreaseStep} />;
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

export default IndividualSignUp;
