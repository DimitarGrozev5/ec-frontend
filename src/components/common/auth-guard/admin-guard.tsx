import { useAuth } from "../../../contexts/auth/use-auth";
import { Navigate } from "react-router-dom";

type Props = {
  redirectTo?: string;
  children: React.ReactNode;
};

/**
 * Helper Component to redirect when user is not an Admin
 * @param redirectTo Route to redirect to if user is not an Admin
 */
const AdminGuard: React.FC<Props> = ({ redirectTo = "/", children }) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to={redirectTo} />;
  }

  return <>{children}</>;
};

export default AdminGuard;
