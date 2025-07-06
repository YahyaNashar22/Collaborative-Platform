import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import styles from "./DashboardSide.module.css";
import { useState } from "react";
import Window from "../../libs/common/lib-window/Window";
import LibButton from "../../libs/common/lib-button/LibButton";

const DashboardSide = () => {
  const navigate = useNavigate();
  const [openSignOutWindow, setOpenSignOutWindow] = useState(false);
  const { pathname } = useLocation();

  const onSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    setOpenSignOutWindow(false);
  };

  const getLinkTo = () => {
    if (pathname.includes("dashboard")) {
      return (
        <div
          onClick={() => setOpenSignOutWindow(true)}
          className={`${styles.redirectBtn} pointer`}
        >
          Sign Out
        </div>
      );
    } else if (pathname.includes("register")) {
      return (
        <Link
          to="login"
          relative="path"
          className={`${styles.redirectBtn} pointer`}
        >
          Log in
        </Link>
      );
    } else if (pathname.includes("login")) {
      return (
        <Link
          to="register"
          relative="path"
          className={`${styles.redirectBtn} pointer`}
        >
          Sign up
        </Link>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <div
        className={`${styles.wrapper} d-f f-dir-col align-start justify-between`}
      >
        <p>
          TAKATUP IS A PLATFORM DEDICATED TO CONNECTING CLIENTS WITH CONSULTANCY
          SERVICE PROVIDERS
        </p>
        <div className="d-f f-dir-col align-start">
          {getLinkTo()}
          <Link to={"/contact"} className={`${styles.redirectBtn} pointer`}>
            Having troubles? Get Help
          </Link>
        </div>
      </div>
      <Window
        title="Sign Out"
        onClose={() => setOpenSignOutWindow(false)}
        visible={openSignOutWindow}
      >
        <p>Are you sure you want to sign out?</p>

        <div className={`${styles.buttons} d-f align-center justify-end`}>
          <LibButton
            label="Sign Out"
            onSubmit={onSignOut}
            backgroundColor="var(--error)"
            hoverColor="#bb2d3b"
          />
        </div>
      </Window>
    </>
  );
};

export default DashboardSide;
