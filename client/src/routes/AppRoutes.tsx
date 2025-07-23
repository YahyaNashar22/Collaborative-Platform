import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Loading from "../shared/Loading/Loading.tsx";

import FAQPage from "../pages/MainPages/FAQPage/FAQPage.tsx";

import SignUpPage from "../pages/MainAuthPages/Signup/SignUpPage.tsx";
import AboutPage from "../pages/MainPages/AboutPage/AboutPage.tsx";
import TermsPage from "../pages/MainPages/TermsPage/TermsPage.tsx";
import ContactPage from "../pages/MainPages/ContactPage/ContactPage.tsx";
import MainLayout from "../Layouts/MainLayout/MainLayout.tsx";
import EntryPage from "../pages/MainAuthPages/Entry/EntryPage.tsx";
import DashboardEntryLayout from "../Layouts/DashboardEntryLayout.tsx";
import DashboardSideLayout from "../Layouts/DashboardSideLayout.tsx";
import ProjectsPage from "../pages/Dashboard/ProjectsPage/ProjectsPage.tsx";
import RequestsPage from "../pages/Dashboard/RequestsPage/RequestsPage.tsx";
import ServicesPage from "../pages/Dashboard/ServicesPage/ServicesPage.tsx";
import DashboardPage from "../pages/Dashboard/DashboardPage/DashboardPage.tsx";
import UsersPage from "../pages/Dashboard/UsersPage/UsersPage.tsx";
import MarketPlacePage from "../pages/MainPages/MarketPlacePage/MarketPlacePage.tsx";
import ProfilePage from "../pages/ProfilePage/ProfilePage.tsx";
import { useAuth } from "../hooks/useAuth.ts";
import PrivateRoute from "./PrivateRoute.tsx";

const HomePage = lazy(() => import("../pages/MainPages/HomePage/HomePage.tsx"));

const LoginPage = lazy(
  () => import("../pages/MainAuthPages/Login/LoginPage.tsx")
);

const ActiveProjectsPage = lazy(
  () => import("../pages/ActiveProjects/ActiveProjects.tsx")
);
const RequestManagerPage = lazy(
  () => import("../pages/RequestManager/RequestManager.tsx")
);
const ManageServicesPage = lazy(
  () => import("../pages/ManageServices/ManageServices.tsx")
);

const ServicesPagePage = lazy(
  () => import("../pages/MainPages/ServicesPage/ServicesPage.tsx")
);

const NotFound = lazy(() => import("../pages/NotFound/NotFound.tsx"));

const AppRoutes = () => {
  const { user, loading } = useAuth();

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/Market_place" element={<MarketPlacePage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/FAQ" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* AUthorization routes */}
        {/* Layout for EntryPage without sidebar */}
        <Route path="auth/:role" element={<DashboardEntryLayout />}>
          <Route index element={<EntryPage />} />
        </Route>

        {/* Layout for SignUp and Login with sidebar */}
        <Route path="auth/:role" element={<DashboardSideLayout />}>
          {/* provider route */}
          <Route path="register" element={<SignUpPage />} />
          {/* user route */}
          <Route path="register/:plan" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

        {/* protected routes */}
        <Route element={<PrivateRoute user={user} loading={loading} />}>
          <Route path="/dashboard" element={<DashboardSideLayout />}>
            {/* <Route index element={<Navigate to="projects" replace />} /> */}
            <Route index element={<DashboardPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="requests" element={<RequestsPage />} />
            {/* <Route path="proposals" element={<ProposalsPage />} /> */}
            <Route path="users" element={<UsersPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route
              path="profile"
              element={<ProfilePage userId={user?._id} />}
            />
            <Route
              path="/dashboard/active-projects"
              element={<ActiveProjectsPage />}
            />
            <Route
              path="/dashboard/request-manager"
              element={<RequestManagerPage />}
            />
            <Route
              path="/dashboard/manage-services"
              element={<ManageServicesPage />}
            />

            <Route path="/dashboard/services" element={<ServicesPagePage />} />
          </Route>
        </Route>
        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
