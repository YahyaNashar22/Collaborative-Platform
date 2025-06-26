import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanBoxes from "../../../components/MainAuthPagesComponents/EntryComponent/PlanBoxes/PlanBoxes";
import PlanButton from "../../../components/MainAuthPagesComponents/EntryComponent/planButtons/PlanButton";
import styles from "./EntryPage.module.css";
import PlanSelected from "../../../components/MainAuthPagesComponents/EntryComponent/PlanSelected/PlanSelected";

const EntryPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const moveForward = () => {
    setStep(1);
  };

  const moveBack = () => {
    setStep(0);
  };

  const handleSelectBox = (label: string) => {
    if (step === 0) setSelectedPlan(label);
  };

  const redirectToSignUp = () => {
    navigate("/auth/sign-up");
  };

  return (
    <div className={`${styles.wrapper} d-f align-center justify-center`}>
      <div
        className={`${styles.content} ${
          step === 0 ? "gap-10" : "gap-5"
        } d-f f-dir-col align-center justify-center`}
      >
        <PlanSelected step={step} backup="" />
        <div className="d-f f-dir-col align-center gap-5">
          <PlanBoxes
            query={step === 1 ? (selectedPlan as "BOX-1" | "BOX-2") : null}
            step={step}
            selected={selectedPlan}
            onSelect={handleSelectBox}
          />
          <PlanButton
            step={step}
            onBack={moveBack}
            onContinue={step === 1 ? redirectToSignUp : moveForward}
            disabled={selectedPlan === ""}
          />
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
