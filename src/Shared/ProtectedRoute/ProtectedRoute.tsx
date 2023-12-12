/** @format */

import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";
import { useContext } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const authContext = useContext(AuthContext);

  if (authContext?.userData == null && authContext?.token == null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default ProtectedRoute;
