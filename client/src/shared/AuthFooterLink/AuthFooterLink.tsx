import useFormStore from "../../store/FormsStore";
import styles from "./AuthFooterLink.module.css";
import { useNavigate } from "react-router-dom";

interface AuthFooterLinkProps {
  text: string;
  link: string;
  redirectTo: string;
}

const AuthFooterLink: React.FC<AuthFooterLinkProps> = ({
  text,
  link,
  redirectTo,
}) => {
  const { resetForm, role, type, setStep } = useFormStore();
  const navigate = useNavigate();

  const handleClick = () => {
    resetForm(role, type);
    setStep(0);
    navigate(redirectTo);
  };

  return (
    <div className={styles.footer}>
      <span className={styles.line}></span>
      <p className="bold">
        {text}{" "}
        <span className="purple pointer" onClick={handleClick}>
          {link}
        </span>
      </p>
    </div>
  );
};

export default AuthFooterLink;
