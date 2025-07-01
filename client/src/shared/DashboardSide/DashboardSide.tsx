import { Link, useLocation } from "react-router-dom";
import styles from "./DashboardSide.module.css";

const DashboardSide = () => {
  const { pathname } = useLocation();
  return (
    <div
      className={`${styles.wrapper} d-f f-dir-col align-start justify-between`}
    >
      <p>
        TAKATUP IS A PLATFORM DEDICATED TO CONNECTING CLIENTS WITH CONSULTANCY
        SERVICE PROVIDERS
      </p>
      <div className="d-f f-dir-col align-start">
        {pathname.includes("register") ? (
          <Link
            to="login"
            relative="path"
            className={`${styles.redirectBtn} pointer`}
          >
            Log in
          </Link>
        ) : (
          <Link
            to="register"
            relative="path"
            className={`${styles.redirectBtn} pointer`}
          >
            Sign up
          </Link>
        )}
        <Link to={"/contact"} className={`${styles.redirectBtn} pointer`}>
          Having troubles? Get Help
        </Link>
      </div>
    </div>
  );
};

export default DashboardSide;
