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
          await fetch("https://offers-api.digistos.com/api/auth/logout", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });
        }
      } catch (err) {
        console.error("Erreur lors de la déconnexion API:", err);
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
