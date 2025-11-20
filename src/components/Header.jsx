import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, useLocation } from "react-router";
import { useState, useEffect } from "react";
import "../assets/styles/Header.css";

function Header() {
  const location = useLocation();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const getValidToken = () => {
      try {
        const authStr = localStorage.getItem("auth");
        if (!authStr) return false;
        const auth = JSON.parse(authStr);
        if (!auth || !auth.expiresAt) return false;
        const isValid = new Date(auth.expiresAt) > new Date();
        return isValid;
      } catch (err) {
        // Si erreur de parsing, nettoyer le localStorage
        localStorage.removeItem("auth");
        return false;
      }
    };

    setIsConnected(getValidToken());
  }, [location]);

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">
            Accueil
          </Nav.Link>
          <Nav.Link as={NavLink} to="/offres/publiques">
            Offres Publiques
          </Nav.Link>
          <Nav.Link as={NavLink} to="/offres/professionnelles">
            Offres Professionnelles
          </Nav.Link>
          {!isConnected && (
            <>
              <Nav.Link as={NavLink} to="/inscription">
                Inscription
              </Nav.Link>
              <Nav.Link as={NavLink} to="/connexion">
                Connexion
              </Nav.Link>
            </>
          )}
          {isConnected && (
            <Nav.Link as={NavLink} to="/deconnexion">
              Déconnexion
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
export default Header;
