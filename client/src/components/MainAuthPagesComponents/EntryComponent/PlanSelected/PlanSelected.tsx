import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <div className="d-f f-dir-col align-center">
      <h1>{t("Sign up")}</h1>
      {step === 1 && (
        <>
          <small className={styles.details}>
            {t("BECOME A")} <span>{t(role)}</span>
            <br /> {t("IN EASY")} {authSteps} {t("STEPS")}
          </small>
        </>
      )}
    </div>
  );
};

export default PlanSelected;
