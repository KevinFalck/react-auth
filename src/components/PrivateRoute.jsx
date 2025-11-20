import { useNavigate, Outlet } from "react-router";
import { useEffect, useState } from "react";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const [canAccess, setCanAccess] = useState(false);

  useEffect(() => {
    try {
      const authStr = localStorage.getItem("auth");
      if (!authStr) {
        navigate("/connexion");
        return;
      }
      const auth = JSON.parse(authStr);
      const isValid = auth && auth.expiresAt && new Date(auth.expiresAt) > new Date();

      if (!isValid) {
        localStorage.removeItem("auth");
        navigate("/connexion");
      } else {
        setCanAccess(true);
      }
    } catch (err) {
      // Si erreur de parsing, nettoyer et rediriger
      localStorage.removeItem("auth");
      navigate("/connexion");
    }
  }, [navigate]);

  if (!canAccess) return null; // Tant qu'on n'a pas vérifié, on bloque

  return <Outlet />;
};

export default PrivateRoute;

