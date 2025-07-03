import { useParams } from "react-router-dom";
import styles from "./SignUpPage.module.css";
import { registerFormData } from "../../../data/registerFormData";
import useFormStore from "../../../store/FormsStore";
import { useEffect } from "react";
import CompanySignUp from "../../../components/MainAuthPagesComponents/SignUp/CompanySignUp/CompanySignUp";
import IndividualSignUp from "../../../components/MainAuthPagesComponents/SignUp/IndividualSignUp/IndividualSignUp";
import PartnerSignUp from "../../../components/MainAuthPagesComponents/SignUp/PartnerSignUp/PartnerSignUp";
import vector from "../../../assets/icons/bottomIcon.png";

const SignUpPage = () => {
  const { role, plan } = useParams<{ role?: string; plan?: string }>();
  const { setRole, setType } = useFormStore();

  useEffect(() => {
    console.log(role, plan);
    if (role) setRole(role);
    if (plan && role) {
      setType(plan);
    } else if (!plan && role === "partner") {
      setType("default");
    }
  }, [role, plan, setRole, setType]);

  let content;

  if (role === "client") {
    content =
      plan === "individual" ? (
        <IndividualSignUp
          title={registerFormData.title}
          placeholder={registerFormData.roles.client.placeholder}
          formData={registerFormData.roles.client.types.individual}
        />
      ) : (
        <CompanySignUp
          title={registerFormData.title}
          placeholder={registerFormData.roles.client.placeholder}
          formData={registerFormData.roles.client.types.company}
        />
      );
  } else {
    content = (
      <PartnerSignUp
        title={registerFormData.title}
        placeholder={registerFormData.roles.partner.placeholder}
        formData={registerFormData.roles.partner.types.default}
      />
    );
  }

  return (
    <>
      <div
        className={`${styles.wrapper} d-f align-center justify-center w-100`}
      >
        {content}
      </div>
    </>
  );
};
export default SignUpPage;
