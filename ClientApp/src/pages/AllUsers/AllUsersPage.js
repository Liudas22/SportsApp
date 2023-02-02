import "./AllUsersPage.css"
import { useCallback } from "react"
import { useEffect } from "react"
import { React, useState } from "react"
import { useNavigate } from "react-router"
import { Paths } from "../../constants/Paths"
import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Button, Card, Container, Row } from "react-bootstrap"
import Modal from "react-bootstrap/Modal"
import { useToast } from "@chakra-ui/react"

export default function AllUsersPage() {

    const navigate = useNavigate()
    const toast = useToast()
    const token = localStorage.getItem("accessToken")
    const [allUsers, setAllUsers] = useState([])
    const [email, setEmail] = useState("")
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const [currentUserName, setCurrentUserName] = useState("")

    const handleShow = async (user) => {
        if(user.name != currentUserName){
            setEmail(user.email)
            setShow(true)
        }
        else{
            toast({
                title: "Šio naudotojo pašalinti negalima",
                status: "error",
                duration: 5000,
                position:"top-right",
                isClosable: true,
            })
        }
        
    }

    const deleteOptions = {
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }

    const getAUsersOptions = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "GET",
    }
    const getMeOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    }

    const getUsers = useCallback(async () => {
        await fetch("http://localhost:5046/api/Users/AllUsers", getAUsersOptions)
            .then((response) => {
                return response.json()
            })
            .then((data) => setAllUsers(data))

        

        await fetch("http://localhost:5046/api/Users/Me", getMeOptions)
            .then((response) => {
                return response.json()
            })
            .then((data) => setCurrentUserName(data.name))
    }, [])

    useEffect(() => { 
        if(!token){
            navigate(`${process.env.PUBLIC_URL}${Paths.Login}`)
        }
        getUsers()
    }, [])

    const handleDelete = async (e) => {
        e.preventDefault()

        await fetch(`http://localhost:5046/api/Users/DeleteUser/${email}`, deleteOptions)
            .then((response) => {
                if(response.status === 200){
                    toast({
                        title: "Naudotojas sėkmingai pašalintas",
                        status: "success",
                        duration: 5000,
                        position:"top-right",
                        isClosable: true,
                    })
                    setShow(false)
                    window.location.reload(true)
                }
                if (response.status === 404) {
                    toast({
                        title: response.json().message,
                        status: "error",
                        duration: 5000,
                        position:"top-right",
                        isClosable: true,
                    })
                    setShow(false)
                }
            })
    }

    const cancelModal = () => {
        setShow(false)
    }

    return(
        <>
            <div>
                <Container >
                    <Row className="vh-100 d-flex justify-content-center align-items-center ">
                        <Card className="shadow">
                            <Card.Body>
                                <TableContainer>
                                    <Table variant="striped" colorScheme="blue">
                                        <TableCaption><strong>Visi naudotojai</strong></TableCaption>
                                        <Thead>
                                            <Tr>
                                                <Th>Naudotojo vardas</Th>
                                                <Th>El. paštas</Th>
                                                <Th>Rolė</Th>
                                                <Th>Lygis</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {allUsers.map((user, index) => {
                                                return (
                                                    <Tr key={index}>
                                                        <Td>
                                                            {user.name}
                                                        </Td>
                                                        <Td>
                                                            {user.email}
                                                        </Td>
                                                        <Td>
                                                            {user.role === 0 ? "Paprastas naudotojas" : ((user.role === 1) ? "Administratorius" : "Treneris" )}
                                                        </Td>
                                                        <Td>
                                                            {user.level}
                                                        </Td>
                                                        <Td>
                                                            <button className="button" 
                                                                onClick={() => handleShow(user)} 
                                                            >Pašalinti</button>
                                                        </Td>
                                                    </Tr>
                                                )
                                            })}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Naudotojo ištrynimas</Modal.Title>
                </Modal.Header>
                <Modal.Body>Patvirtinkite, jog tikrai norite ištrinti naudotoją</Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={(e) => handleDelete(e)}>
                        Patvirtinti
                    </Button>
                    <Button variant="dark" onClick={() => cancelModal()}>
                        Atšaukti
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}