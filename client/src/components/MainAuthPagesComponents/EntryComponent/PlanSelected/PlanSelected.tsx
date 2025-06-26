import styles from "./PlanSelected.module.css";

const PlanSelected = ({ step, backup }: { step: number; backup: string }) => {
  console.log(backup);
  return (
    <div className="d-f f-dir-col align-center">
      <h1>Sign up</h1>
      {step === 1 && (
        <small className={styles.details}>
          {backup === "individual" ? (
            <>
              BECOME A CLIENT
              <br /> IN EASY 2 STEPS
            </>
          ) : (
            <>
              BECOME A CLIENT
              <br /> IN EASY 3 STEPS
            </>
          )}
        </small>
      )}
    </div>
  );
};

export default PlanSelected;
