import { Outlet } from "react-router-dom";
import DashboardHeader from "../shared/DashboardHeader/DashboardHeader";
import DashboardSide from "../shared/DashboardSide/DashboardSide";

const DashboardSideLayout = () => {
  return (
    <>
      <DashboardHeader />
      <div className="d-f">
        <DashboardSide />
        <Outlet />
      </div>
    </>
  );
};

export default DashboardSideLayout;
