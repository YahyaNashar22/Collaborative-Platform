import { Link, useLocation } from "react-router-dom";
import styles from "./DashboardSideLayout.module.css";

const DashboardSideLayout = () => {
  const currentPath = useLocation().pathname;
  return (
    <div
      className={`${styles.wrapper} d-f f-dir-col align-start justify-between`}
    >
      <p>
        TAKATUP IS A PLATFORM DEDICATED TO CONNECTING CLIENTS WITH CONSULTANCY
        SERVICE PROVIDERS
      </p>
      <div className="d-f f-dir-col align-start">
        {currentPath.includes("sign-up") ? (
          <Link to="/auth/login" className={`${styles.redirectBtn} pointer`}>
            Log in
          </Link>
        ) : (
          <Link to="/auth/sign-up" className={`${styles.redirectBtn} pointer`}>
            Sign up
          </Link>
        )}
        <div>Having troubles? Get Help</div>
      </div>
    </div>
  );
};

export default DashboardSideLayout;
