import { useAuth } from "../../../contexts/auth/use-auth";
import { Navigate } from "react-router-dom";

type Props = {
  redirectTo?: string;
  children: React.ReactNode;
};

/**
 * Helper Component to redirect when user is not logged in
 * @param redirectTo Route to redirect to if user is not logged in
 */
const AuthGuard: React.FC<Props> = ({ redirectTo = "/", children }) => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to={redirectTo} />;
  }

  return <>{children}</>;
};

export default AuthGuard;
