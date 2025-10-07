import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlanBoxes from "../../../components/MainAuthPagesComponents/EntryComponent/PlanBoxes/PlanBoxes";
import styles from "./EntryPage.module.css";
import PlanSelected from "../../../components/MainAuthPagesComponents/EntryComponent/PlanSelected/PlanSelected";
import LibButton from "../../../libs/common/lib-button/LibButton";
import useFormStore from "../../../store/FormsStore";

const EntryPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [step] = useState(0);
  const navigate = useNavigate();
  const { role } = useParams();
  const { resetForm } = useFormStore();

  const handleSelectBox = (label: string) => {
    if (step === 0) {
      setSelectedPlan(label);

      if (role === "client") {
        const planId = label === "BOX-1" ? "individual" : "company";
        navigate(`register/${planId}`, { relative: "path" });
      }
    }
  };

  const redirectToSignUp = () => {
    const planId =
      role === "client"
        ? selectedPlan === "BOX-1"
          ? "individual"
          : "company"
        : role === "provider"
        ? "default"
        : "";
    if (role) resetForm(role, planId);
    if (role === "provider") {
      navigate("register");
    } else {
      const planId = selectedPlan === "BOX-1" ? "individual" : "company";
      navigate(`register/${planId}`, { relative: "path" });
    }
  };

  return (
    <div className={`${styles.wrapper} d-f align-center justify-center`}>
      <div
        className={`${styles.content} gap-10 d-f f-dir-col align-center justify-center`}
      >
        {role === "client" ? (
          <>
            <h1>Sign up</h1>
            <div className="d-f f-dir-col align-center gap-5">
              <PlanBoxes
                query={step === 1 ? (selectedPlan as "BOX-1" | "BOX-2") : null}
                step={step}
                selected={selectedPlan}
                onSelect={handleSelectBox}
              />

              {/* <LibButton
                label="Continue"
                onSubmit={redirectToSignUp}
                backgroundColor="#57417e"
                hoverColor="#49356a"
                disabled={selectedPlan === ""}
                padding="0 30px"
              /> */}
            </div>
          </>
        ) : (
          <div className="d-f f-dir-col align-center gap-5">
            <PlanSelected step={1} authSteps={6} role={role || "provider"} />
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
