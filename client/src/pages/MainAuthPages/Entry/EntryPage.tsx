import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlanBoxes from "../../../components/MainAuthPagesComponents/EntryComponent/PlanBoxes/PlanBoxes";
import PlanButton from "../../../components/MainAuthPagesComponents/EntryComponent/planButtons/PlanButton";
import styles from "./EntryPage.module.css";
import PlanSelected from "../../../components/MainAuthPagesComponents/EntryComponent/PlanSelected/PlanSelected";
import LibButton from "../../../libs/common/lib-button/LibButton";
import useFormStore from "../../../store/FormsStore";

const EntryPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { role } = useParams();
  const { resetForm } = useFormStore();

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
    // reset the form
    const planId = selectedPlan === "BOX-1" ? "individual" : "company";
    resetForm(role || "individual", planId);
    if (role === "partner") {
      navigate("register");
    } else {
      const planId = selectedPlan === "BOX-1" ? "individual" : "company";
      navigate(`register/${planId}`, { relative: "path" });
    }
  };

  return (
    <div className={`${styles.wrapper} d-f align-center justify-center`}>
      <div
        className={`${styles.content} ${
          step === 0 ? "gap-10" : "gap-5"
        } d-f f-dir-col align-center justify-center`}
      >
        {role === "client" ? (
          <>
            <PlanSelected
              step={step}
              role={role}
              authSteps={selectedPlan === "BOX-1" ? 2 : 3}
            />
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
          </>
        ) : (
          <div className="d-f f-dir-col align-center gap-5">
            <PlanSelected step={1} authSteps={6} role={role || "partner"} />
            <LibButton
              label="Continue"
              onSubmit={redirectToSignUp}
              backgroundColor="#57417e"
              hoverColor="#49356a"
              padding="0 30px"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EntryPage;
