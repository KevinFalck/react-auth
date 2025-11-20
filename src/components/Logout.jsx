import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../store/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const handleLogout = async () => {
      // (1) Appel API pour notifier la déconnexion (optionnel)
      if (token) {
        try {
          await fetch("https://offers-api.digistos.com/api/auth/logout", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });
        } catch (err) {
          console.error("Erreur lors de la déconnexion API:", err);
        }
      }

      // (2) Suppression du token côté frontend
      dispatch(logout());

      // (3) Redirection vers la page de login
      navigate("/connexion");
    };

    handleLogout();
  }, [dispatch, navigate, token]);

  return null; // Pas besoin d'afficher quoi que ce soit
};

export default Logout;
