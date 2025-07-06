import { Outlet } from "react-router-dom";
import DashboardHeader from "../shared/DashboardHeader/DashboardHeader";
import DashboardSide from "../shared/DashboardSide/DashboardSide";
import vector from "../assets/icons/bottomIcon.png";
import styles from "./DashboardSideLayout.module.css";

const DashboardSideLayout = () => {
  return (
    <>
      <DashboardHeader />
      <div className={`${styles.wrapper} d-f w-100 justify-between`}>
        <DashboardSide />
        <Outlet />
        <div className="d-f align-end">
          <img src={vector} alt="logo" />
        </div>
      </div>
    </>
  );
};

export default DashboardSideLayout;
