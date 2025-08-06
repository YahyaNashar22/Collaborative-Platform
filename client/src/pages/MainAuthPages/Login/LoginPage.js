import { jsx as _jsx } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import LogInClient from "../../../components/MainAuthPagesComponents/LogIn/client/LogInClient";
import LogInPartner from "../../../components/MainAuthPagesComponents/LogIn/partner/LogInPartner";
import styles from "./LoginPage.module.css";
const LoginPage = () => {
    const { role } = useParams();
    let content;
    switch (role) {
        case "clients":
            content = _jsx(LogInClient, { role: role, placeholder: "as a client" });
            break;
        case "provider":
            content = _jsx(LogInPartner, { role: role, placeholder: "as a provider" });
            break;
        default:
            content = (_jsx(LogInClient, { role: role ?? "client", placeholder: "as a client" }));
    }
    return _jsx("div", { className: `${styles.wrapper}  w-100`, children: content });
};
export default LoginPage;
