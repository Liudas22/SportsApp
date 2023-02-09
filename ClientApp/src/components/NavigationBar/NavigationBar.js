import React from "react"
import { NavDropdown } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useNavigate } from "react-router"
import { Paths } from "../../constants/Paths"

function NavigationBar() {
    const navigate = useNavigate()

    const token = localStorage.getItem("accessToken")
    let role = localStorage.getItem("Role")
    const isAdmin = (role === "Admin")
    const isCoach = (role === "Coach")

    const Logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("accessToken")
        localStorage.removeItem("Role")
        navigate(Paths.Login)
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand className="animated-navbar-home" href={Paths.Home}>
                    Sports Glory
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                    {!token ? (
                        <>
                            <Nav className="me-right">
                                <Nav.Link onClick={() => navigate(Paths.Login)}>Prisijungti</Nav.Link>
                                <Nav.Link onClick={() => navigate(Paths.Register)}>Registruotis</Nav.Link>
                            </Nav>
                        </>
                    ) : (
                        <> 
                            <Nav className="me-left">
                                <Nav.Link href="/levels" >Lygiai</Nav.Link>
                            </Nav>
                            <Nav className="me-left">
                                <Nav.Link onClick={() => navigate(Paths.VideoList)}>
                                    Mano vaizdo įrašai
                                </Nav.Link>
                            </Nav>
                            {isAdmin ? (
                                <>
                                    <Nav className="me-left">
                                        <Nav.Link onClick={() => navigate(Paths.UsersList)}>
                                            Visi naudotojai
                                        </Nav.Link>
                                    </Nav>
                                </>
                            ) : (
                                <>
                                    {isCoach ? (
                                        <>
                                            <Nav className="me-left">
                                                <Nav.Link onClick={() => navigate(Paths.UnapprovedVideos)}>
                                                    Nepatvirtinti vaizdo įrašai
                                                </Nav.Link>
                                            </Nav>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            )}
                            <Nav className="me-right">              
                                <NavDropdown title={<i className="bi bi-file-earmark-person"></i>} id="basic-nav-dropdown" >
                                    <NavDropdown.Item onClick={() => navigate(Paths.User)}>Profilis</NavDropdown.Item>
                                    <NavDropdown.Item onClick={(e) => Logout(e)}>Atsijungti</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export { NavigationBar }