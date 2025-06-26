import LibButton from "../../../../libs/common/lib-button/LibButton";
import styles from "./PlanButtons.module.css";

const PlanButton = ({
  step,
  onBack,
  onContinue,
  disabled,
}: {
  step: number;
  onBack: () => void;
  onContinue: () => void;
  disabled: boolean;
}) => {
  return step === 1 ? (
    <div className={`${styles.btnsContainer} d-f align-center justify-between`}>
      <LibButton
        label="Back"
        onSubmit={onBack}
        backgroundColor="#57417e"
        hoverColor="#49356a"
        disabled={false}
      />
      <LibButton
        label="Continue"
        onSubmit={onContinue}
        backgroundColor="#57417e"
        hoverColor="#49356a"
        disabled={false}
      />
    </div>
  ) : (
    <LibButton
      label="Continue"
      onSubmit={onContinue}
      backgroundColor="#57417e"
      hoverColor="#49356a"
      disabled={disabled}
      padding="0 30px"
    />
  );
};

export default PlanButton;
