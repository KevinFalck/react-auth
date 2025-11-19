import { useState, useEffect } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, useLocation } from "react-router";
import "../assets/styles/Header.css";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (!authData) {
      setIsAuthenticated(false);
      return;
    }

    const auth = JSON.parse(authData);
    const isValid =
      auth?.token && auth?.expiresAt && new Date(auth.expiresAt) > new Date();

    setIsAuthenticated(!!isValid);
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
          {isAuthenticated && (
            <Nav.Link as={NavLink} to="/offres/professionnelles">
              Offres Professionnelles
            </Nav.Link>
          )}
          {!isAuthenticated && (
            <>
              <Nav.Link as={NavLink} to="/inscription">
                Inscription
              </Nav.Link>
              <Nav.Link as={NavLink} to="/connexion">
                Connexion
              </Nav.Link>
            </>
          )}
          {isAuthenticated && (
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
