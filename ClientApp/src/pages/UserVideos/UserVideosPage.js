import React from "react"
import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react"
import { Card, Container, Row } from "react-bootstrap"
import { useCallback } from "react"
import { useState } from "react"
import { Paths } from "../../constants/Paths"
import jwtDecode from "jwt-decode"
import { useNavigate } from "react-router"
import { useEffect } from "react"

export default function UserVideosPage(){

    const token = localStorage.getItem("accessToken")
    const [username, setUsername] = useState("")
    const [usersVideos, setUsersVideos] = useState([])
    const navigate = useNavigate()
    const toast = useToast()

    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer")
    }

    const getMeOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    }

    const getUsersVideosRequestOptions = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "GET",
    }

    const getUser = useCallback(async () => {
        try {
            await fetch("http://localhost:5046/api/Users/Me", getMeOptions)
                .then((response) => {
                    return response.json()
                })
                .then((data) => setUsername(data.name))
        } catch (error){
            console.log(error.message)
        }
        
    })

    const getUserVideos = async () => {
        console.log("USERNAME: " + username)
        const usersVideosResponse = await fetch(`http://localhost:5046/api/Video/GetMyVideos/${username}`, getUsersVideosRequestOptions)
        if(usersVideosResponse.status === 200 ){
            toast({
                title: "Viskas gud",
                status: "success",
                duration: 5000,
                position:"top-right",
                isClosable: true,
            })
        }
        if(usersVideosResponse.status === 404 ){
            toast({
                title: "Useris nerastas",
                status: "error",
                duration: 5000,
                position:"top-right",
                isClosable: true,
            })
        }
        const usersUploadedVideos = await usersVideosResponse.json()
        setUsersVideos(usersUploadedVideos)
    }

    const handleToken = useCallback(() => {
        if(!token){
            toast({
                title: "Turite prisijungti",
                status: "error",
                duration: 5000,
                position:"top-right",
                isClosable: true,
            })
            navigate(`${process.env.PUBLIC_URL}${Paths.Login}`)
        }
        else{
            const { exp } = jwtDecode(token)
            const expirationTime = (exp * 1000) - 60000
            if (Date.now() >= expirationTime) {
                toast({
                    title: "Baigėsi sesijos galiojimo laikas",
                    status: "warning",
                    duration: 5000,
                    position:"top-right",
                    isClosable: true,
                })
                navigate(Paths.Login)
                localStorage.clear()
            }
        }
    }, [])

    useEffect(() => { 
        handleToken()
        getUser()
        getUserVideos()
    }, [])

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
                                                <Th>#</Th>
                                                <Th>Naudotojo vardas</Th>
                                                <Th>Nuoroda</Th>
                                                <Th>Būsena</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {usersVideos.map((video, index) => {
                                                return (
                                                    <Tr key={index}>
                                                        <Td>
                                                            {index + 1}
                                                        </Td>
                                                        <Td>
                                                            {video.uploadedBy}
                                                        </Td>
                                                        <Td>
                                                            <button className="previewButton" onClick={() => openInNewTab(video.link)}>Peržiūrėti vaizdo įrašą</button>
                                                        </Td>
                                                        <Td>
                                                            {video.status === 0 ? "Atmestas" : ((video.status === 1) ? "Patvirtintas" : "Laukia patvirtinimo" )}
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
        </>
    )
}