import React from "react";
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function NavigationBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const Logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("subscriptionIdOrder");
    navigate("/");
  };

  const IsNavigating = (e) => {
    e.preventDefault();

    if(token)
      navigate("/home");
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
              <Nav className="me-auto">
                <Nav.Link href="/levels" >Lygiai</Nav.Link>
              </Nav>
              <Nav className="me-right">
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