import { useCallback } from "react"
import { useEffect } from "react"
import { React, useState } from "react"
import { useNavigate } from "react-router"
import { Paths } from "../../constants/Paths"
import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Card, Container, Row } from "react-bootstrap"

export default function AllUsersPage() {

    const navigate = useNavigate()
    const token = localStorage.getItem("accessToken")
    const [allUsers, setAllUsers] = useState([])

    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "GET",
    }

    const getUsers = useCallback(async () => {
        const myUsers = await fetch("http://localhost:5046/api/Users/AllUsers", options)
        const tempUsers = await myUsers.json()
        setAllUsers(tempUsers)
    }, [])
    console.log(allUsers)
    useEffect(() => { 
        if(!token){
            navigate(`${process.env.PUBLIC_URL}${Paths.Login}`)
        }
        getUsers()
    }, [])

    return(
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
    )
}