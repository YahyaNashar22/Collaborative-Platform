import { TypeFormData } from "../../../../interfaces/registerSignup";
import SimpleFormView from "../StepOneForm/SimpleFormView";
import useFormStore from "../../../../store/FormsStore";
import styles from "./IndividualSignUp.module.css";
import ProgressBar from "../../../../shared/ProgressBar/ProgressBar";

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
  const { increaseStep } = useFormStore();

  const step = useFormStore((state) => state.step);

  const data = formData.formData[step] || [];
  const formTitle = formData.formTitle;

  return (
    <div className={styles.wrapper}>
      <div className="d-f">
        <h1>{title}</h1>
        <ProgressBar currentNode={step} nodes={formData.steps} />
      </div>
      <p className={styles.placeholder}>{placeholder}</p>
      <SimpleFormView
        data={data}
        title={formTitle}
        moveForward={increaseStep}
      />
    </div>
  );
};

export default IndividualSignUp;
