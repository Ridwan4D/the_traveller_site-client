import { Navigate, useLocation } from "react-router-dom";
import PropType from "prop-types";
import useAuth from "../hooks/useAuth";

const SecureRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex justify-center items-center text-4xl">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  if (user?.email) {
    return children;
  }

  return <Navigate to="/login" state={location.pathname} replace></Navigate>;
};
SecureRoute.propTypes = {
  children: PropType.node,
};
export default SecureRoute;
