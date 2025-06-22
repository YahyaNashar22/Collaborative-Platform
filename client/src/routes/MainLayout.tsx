import { Outlet } from "react-router-dom";

import Header from "../shared/Header/Header";
import Footer from "../shared/Footer/Footer";

const Container = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Container;
