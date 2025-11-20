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
      try {
        if (token) {
          const response = await fetch(
            "https://offers-api.digistos.com/api/auth/logout",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            }
          );

          if (!response.ok) {
            const data = await response.json();
            throw {
              status: response.status,
              message: data.message || "Erreur lors de la déconnexion API",
            };
          }
        } else {
          throw {
            status: 401,
            message: "Aucun token disponible pour la déconnexion",
          };
        }
      } catch (err) {
        console.error(
          "Erreur lors de la déconnexion API:",
          err.status,
          err.message
        );
      } finally {
        dispatch(logout());

        navigate("/connexion");
      }
    };

    handleLogout();
  }, [dispatch, navigate, token]);

  return null;
};

export default Logout;
