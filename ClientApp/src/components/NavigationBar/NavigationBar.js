import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router";

function NavigationBar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  let role = localStorage.getItem("Role");
  const isAdmin = (role === "Admin");
  const isCoach = (role === "Coach");

  const Logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("Role");
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="animated-navbar-home">
          Sports Glory
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          {!token ? (
            <>
              <Nav className="me-left">
                <Nav.Link onClick={() => navigate("/")}>Prisijungti</Nav.Link>
                <Nav.Link onClick={() => navigate("/register")}>Registruotis</Nav.Link>
              </Nav>
            </>
          ) : (
            <> 
              <Nav className="me-left">
                <Nav.Link href="/levels" >Lygiai</Nav.Link>
              </Nav>
              {isAdmin ? (
                <>
                  <Nav className="me-left">
                    <Nav.Link onClick={(e) => Logout(e)}>
                      Visi naudotojai
                    </Nav.Link>
                  </Nav>
                </>
              ) : (
                <>
                  {isCoach ? (
                  <>
                    <Nav className="me-left">
                      <Nav.Link onClick={(e) => Logout(e)}>
                        Vaizdo įrašai
                      </Nav.Link>
                    </Nav>
                  </>
                ) : (
                  <></>
                )}
                </>
              )}
              <Nav className="right">
                <Nav.Link onClick={(e) => Logout(e)}>
                  Atsijungti
                </Nav.Link>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export { NavigationBar };