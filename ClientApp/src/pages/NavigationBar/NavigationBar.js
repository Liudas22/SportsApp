import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="animated-navbar-home" href="/home">Sports Glory</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/" >Prisijungti</Nav.Link>
                <Nav.Link href="/register" >Registruotis</Nav.Link>
                <Nav.Link href="/levels" >Lygiai</Nav.Link>
            </Nav>
            <Nav className="me-right">
              <Nav.Link href="/" >
                Atsijungti
              </Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export { NavigationBar };