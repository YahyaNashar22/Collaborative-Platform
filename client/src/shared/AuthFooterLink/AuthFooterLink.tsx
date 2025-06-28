import styles from "./AuthFooterLink.module.css";
import { Link } from "react-router-dom";

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
  return (
    <div className={styles.footer}>
      <span className={styles.line}></span>
      <p className="bold">
        {text}{" "}
        <Link to={redirectTo} className="purple pointer">
          {link}
        </Link>
      </p>
    </div>
  );
};

export default AuthFooterLink;
