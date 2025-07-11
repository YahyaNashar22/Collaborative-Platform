import { useParams } from "react-router-dom";
import styles from "./LoginPage.module.css";
import LogInClient from "../../../components/MainAuthPagesComponents/LogIn/client/LogInClient";
import LogInPartner from "../../../components/MainAuthPagesComponents/LogIn/partner/LogInPartner";

const LoginPage = () => {
  const { role } = useParams();

  let content;
  switch (role) {
    case "clients":
      content = <LogInClient role={role} placeholder="as a client" />;
      break;
    case "partner":
      content = <LogInPartner role={role} placeholder="as a partner" />;
      break;
    default:
      content = (
        <LogInClient role={role ?? "client"} placeholder="as a client" />
      );
  }
  return (
    <>
      <main
        className={`${styles.wrapper} d-f align-center justify-center w-100`}
      >
        {content}
      </main>
    </>
  );
};

export default LoginPage;
