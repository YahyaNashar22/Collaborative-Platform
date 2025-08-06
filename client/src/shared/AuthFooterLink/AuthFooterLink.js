import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import useFormStore from "../../store/FormsStore";
import styles from "./AuthFooterLink.module.css";
import { useNavigate } from "react-router-dom";
const AuthFooterLink = ({ text, link, redirectTo, }) => {
    const { resetForm, role, type, setStep } = useFormStore();
    const navigate = useNavigate();
    const handleClick = () => {
        resetForm(role, type);
        setStep(0);
        navigate(redirectTo);
    };
    return (_jsxs("div", { className: styles.footer, children: [_jsx("span", { className: styles.line }), _jsxs("p", { className: "bold", children: [text, " ", _jsx("span", { className: "purple pointer", onClick: handleClick, children: link })] })] }));
};
export default AuthFooterLink;
