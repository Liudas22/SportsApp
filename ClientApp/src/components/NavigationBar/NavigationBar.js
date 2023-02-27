import { Avatar } from "@chakra-ui/react"
import jwtDecode from "jwt-decode"
import React, { useCallback, useEffect, useState } from "react"
import { NavDropdown } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useNavigate } from "react-router"
import { Paths } from "../../constants/Paths"

function NavigationBar() {
    const navigate = useNavigate()
    // const [avatar, setAvatar] = useState("")
    const [userData, setUserData] = useState([])
    const token = localStorage.getItem("accessToken")
    let isAdmin = false
    let isCoach = false

    if(token){
        const role = jwtDecode(token).role
        isAdmin = (role === "Admin")
        isCoach = (role === "Coach")
    }

    const getMeOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    }

    const getUser = useCallback(async () => {
        const response = await fetch("http://localhost:5046/api/Users/Me", getMeOptions)
        const user = await response.json()
        setUserData(user)
    }, [])

    useEffect(() => {
        getUser()
    }, [])

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
                                <Avatar size="sm" mt={1} src = {userData.avatar ? "data:image/jpeg;base64," + userData.avatar : null} />
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