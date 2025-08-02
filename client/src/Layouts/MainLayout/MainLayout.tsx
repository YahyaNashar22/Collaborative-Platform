import { Outlet } from "react-router-dom";

import Header from "../../shared/Header/Header";
import Footer from "../../shared/Footer/Footer";
import { useAuth } from "../../hooks/useAuth";

const MainLayout = () => {
  const { user } = useAuth();

  return (
    <>
      <Header user={user} />
      <Outlet context={{ user }} />
      <Footer />
    </>
  );
};

export default MainLayout;
