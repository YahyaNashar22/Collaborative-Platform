import { TypeFormData } from "../../../../interfaces/registerSignup";
import SimpleFormView from "../StepOneForm/SimpleFormView";
import useFormStore from "../../../../store/FormsStore";
import styles from "./IndividualSignUp.module.css";
import ProgressBar from "../../../../shared/ProgressBar/ProgressBar";
import AuthFooterLink from "../../../../shared/AuthFooterLink/AuthFooterLink";
import OTPForm from "../StepThreeForm/OTPForm";

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
  const { increaseStep, decreaseStep, role } = useFormStore();

  const step = useFormStore((state) => state.step);

  const data = formData.formData[step] || [];
  const formTitle = data.formTitle;

  const createAccount = () => {};

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
        <OTPForm onSubmit={createAccount} moveBackward={decreaseStep} />
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
