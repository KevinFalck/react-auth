import { useNavigate, Outlet } from "react-router";
import { useEffect, useState } from "react";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const [canAccess, setCanAccess] = useState(false);

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    const auth = authData ? JSON.parse(authData) : null;
    const isValid = auth && new Date(auth.expiresAt) > new Date();

    if (!isValid) {
      localStorage.removeItem("auth");
      navigate("/connexion");
    } else {
      setCanAccess(true);
    }
  }, [navigate]);

  if (!canAccess) return null;

  return <Outlet />;
};
export default PrivateRoute;
