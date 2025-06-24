import { Outlet } from "react-router-dom";
import DashboardHeader from "../shared/DashboardHeader/DashboardHeader";
// import Footer from "../shared/Footer/Footer";

const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default DashboardLayout;
