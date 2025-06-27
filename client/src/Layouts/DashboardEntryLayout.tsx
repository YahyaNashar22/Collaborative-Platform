import { Outlet } from "react-router-dom";
import DashboardHeader from "../shared/DashboardHeader/DashboardHeader";

const DashboardEntryLayout = () => {
  return (
    <>
      <DashboardHeader />
      <Outlet />
    </>
  );
};

export default DashboardEntryLayout;
