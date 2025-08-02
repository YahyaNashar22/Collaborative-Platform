import { useParams } from "react-router-dom";
import LogInClient from "../../../components/MainAuthPagesComponents/LogIn/client/LogInClient";
import LogInPartner from "../../../components/MainAuthPagesComponents/LogIn/partner/LogInPartner";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const { role } = useParams();

  let content;
  switch (role) {
    case "clients":
      content = <LogInClient role={role} placeholder="as a client" />;
      break;
    case "provider":
      content = <LogInPartner role={role} placeholder="as a provider" />;
      break;
    default:
      content = (
        <LogInClient role={role ?? "client"} placeholder="as a client" />
      );
  }
  return <div className={`${styles.wrapper}  w-100`}>{content}</div>;
};

export default LoginPage;
