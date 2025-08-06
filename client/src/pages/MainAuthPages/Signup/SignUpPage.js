import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import styles from "./SignUpPage.module.css";
import { registerFormData } from "../../../data/registerFormData";
import useFormStore from "../../../store/FormsStore";
import { useEffect } from "react";
import CompanySignUp from "../../../components/MainAuthPagesComponents/SignUp/CompanySignUp/CompanySignUp";
import IndividualSignUp from "../../../components/MainAuthPagesComponents/SignUp/IndividualSignUp/IndividualSignUp";
import PartnerSignUp from "../../../components/MainAuthPagesComponents/SignUp/PartnerSignUp/PartnerSignUp";
const SignUpPage = () => {
    const { role, plan } = useParams();
    const { setRole, setType } = useFormStore();
    useEffect(() => {
        if (role)
            setRole(role);
        if (plan && role) {
            setType(plan);
        }
        else if (!plan && role === "provider") {
            setType("default");
        }
    }, [role, plan, setRole, setType]);
    let content;
    if (role === "client") {
        content =
            plan === "individual" ? (_jsx(IndividualSignUp, { title: registerFormData.title, placeholder: registerFormData.roles.client.placeholder, formData: registerFormData.roles.client.types.individual })) : (_jsx(CompanySignUp, { title: registerFormData.title, placeholder: registerFormData.roles.client.placeholder, formData: registerFormData.roles.client.types.company }));
    }
    else {
        content = (_jsx(PartnerSignUp, { title: registerFormData.title, placeholder: registerFormData.roles.provider.placeholder, formData: registerFormData.roles.provider.types.default }));
    }
    return (_jsx(_Fragment, { children: _jsx("div", { className: `${styles.wrapper}  w-100`, children: content }) }));
};
export default SignUpPage;
