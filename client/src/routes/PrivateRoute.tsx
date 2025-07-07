import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  user: any;
  loading: boolean;
  redirectPath?: string;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  user,
  loading,
  redirectPath = "/",
}) => {
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to={redirectPath} replace />;
  return <Outlet />;
};

export default PrivateRoute;
