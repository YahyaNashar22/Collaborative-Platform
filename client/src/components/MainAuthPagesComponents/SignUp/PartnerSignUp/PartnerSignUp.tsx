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
      content = (
        <OTPForm onSubmit={createAccount} moveBackward={decreaseStep} />
      );

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
