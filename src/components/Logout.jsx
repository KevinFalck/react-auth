import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("auth");
    navigate("/connexion");
  }, []);

  return null; // Pas besoin d'afficher quoi que ce soit
};

export default Logout;
