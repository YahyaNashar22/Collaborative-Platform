import { useParams } from "react-router-dom";
import IndividualSignUp from "../../../components/MainAuthPagesComponents/SignUp/IndividualSignUp/IndividualSignUp";
import styles from "./SignUpPage.module.css";
import { registerFormData } from "../../../data/registerFormData";
import useFormStore from "../../../store/FormsStore";
import { useEffect } from "react";

const SignUpPage = () => {
  const { role, plan } = useParams<{ role?: string; plan?: string }>();
  const { setRole, setType } = useFormStore();

  useEffect(() => {
    if (role) setRole(role);
    if (plan) setType(plan);
  }, [role, plan, setRole, setType]);

  let content;

  if (role === "client") {
    // content = plan === "individual" ? <IndividualSignUp /> : <CompanySignUp />;
    content =
      plan === "individual" ? (
        <IndividualSignUp
          title={registerFormData.title}
          placeholder={registerFormData.roles.client.placeholder}
          formData={registerFormData.roles.client.types.individual}
        />
      ) : (
        <></>
      );
  } else {
    // content = <PartnerSignUp />;
    content = <></>;
  }

  return (
    <div className={`${styles.wrapper} d-f align-center justify-center w-100`}>
      {content}
    </div>
  );
};
export default SignUpPage;
