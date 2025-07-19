import { Navigate, Outlet } from "react-router-dom";
import { User } from "../interfaces/User";

interface PrivateRouteProps {
  user: User | null;
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
