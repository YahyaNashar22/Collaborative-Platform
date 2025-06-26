import { Outlet, useLocation } from "react-router-dom";
import DashboardHeader from "../shared/DashboardHeader/DashboardHeader";
import DashboardSideLayout from "../shared/DashboardSideLayout/DashboardSideLayout";
// import Footer from "../shared/Footer/Footer";

const DashboardLayout = () => {
  const currentPath = useLocation().pathname;
  return (
    <>
      <DashboardHeader />
      {currentPath !== "/auth" ? (
        <div className="d-f">
          <DashboardSideLayout />
          <Outlet />
        </div>
      ) : (
        <Outlet />
      )}

      {/* <Footer /> */}
    </>
  );
};

export default DashboardLayout;
