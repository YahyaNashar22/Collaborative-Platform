import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader";
import Footer from "../components/Footer/Footer";

const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <Outlet />
      <Footer />
    </>
  );
};

export default DashboardLayout;
