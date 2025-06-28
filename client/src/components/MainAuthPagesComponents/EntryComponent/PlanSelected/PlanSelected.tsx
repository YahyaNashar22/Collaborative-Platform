import styles from "./PlanSelected.module.css";

const PlanSelected = ({
  step,
  authSteps,
  role,
}: {
  step: number;
  authSteps: number;
  role: string;
}) => {
  return (
    <div className="d-f f-dir-col align-center">
      <h1>Sign up</h1>
      {step === 1 && (
        <>
          <small className={styles.details}>
            BECOME A <span>{role.toUpperCase()}</span>
            <br /> IN EASY {authSteps} STEPS
          </small>
        </>
      )}
    </div>
  );
};

export default PlanSelected;
