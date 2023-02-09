import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react"
import React from "react"
import { useCallback } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Button, Card, Container, Modal, Row } from "react-bootstrap"
import { useNavigate } from "react-router"
import { Paths } from "../../constants/Paths"
import "./NotApprovedVideosListPage.css"

export default function NotApprovedVideosListPage() {

    const navigate = useNavigate()
    const token = localStorage.getItem("accessToken")
    const [unapprovedVideos, setUnapprovedVideos] = useState([])
    const [approveShow, setApproveShow] = useState(false)
    const [declineShow, setDeclineShow] = useState(false)
    const [status, setStatus] = useState(false)
    const [username, setUsername] = useState("")
    const [link, setLink] = useState("")
    const toast = useToast()

    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer")
    }
    const updateRequestOptions = {
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            link,
            status,
        }),
        method: "PUT"
    }

    const handleApproveShow = async (uploadedBy, videoLink) => {
        setStatus(true)
        setUsername(uploadedBy)
        setLink(videoLink)
        setApproveShow(true)
    }
    const handleDeclineShow = async () => {
        setStatus(false)
        setDeclineShow(true)
    }
    const handleClose = () => {
        setApproveShow(false)
        setDeclineShow(false)
    }
    const requestOptions = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "PUT",
    }
    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "GET",
    }

    const handleApprove = async () => {
        try {
            await fetch(`http://localhost:5046/api/Users/UpdateUserLevel/${username}`, requestOptions)
                .then((response) => {
                    if(response.status === 200){
                        toast({
                            title: "Vaizdo įrašas sėkmingai patvirtintas",
                            status: "success",
                            duration: 5000,
                            position:"top-right",
                            isClosable: true,
                        })
                    }
                    if (response.status === 404) {
                        toast({
                            title: "Naudotojas nebeegzistuoja",
                            status: "error",
                            duration: 5000,
                            position:"top-right",
                            isClosable: true,
                        })
                    }
                })
            await changeVideoStatus()
        } catch (error){
            console.log(error.message)
        }
    }
    const changeVideoStatus = async () => {
        try {
            await fetch("http://localhost:5046/api/Video/UpdateVideoStatus", updateRequestOptions)
                .then((response) => {
                    if(response.status === 200){
                        setApproveShow(false)
                        window.location.reload(true)
                    }
                    if (response.status === 404) {
                        toast({
                            title: response.json().Message,
                            status: "error",
                            duration: 5000,
                            position:"top-right",
                            isClosable: true,
                        })
                        setApproveShow(false)
                    }
                })
            window.location.reload(true)
        } catch (error){
            console.log(error.message)
        }
    }
    const handleDecline = () => {
        try {
            fetch(`http://localhost:5046/api/Users/UpdateUserLevel/${username}`, requestOptions)
                .then((response) => {
                    if(response.status === 200){
                        toast({
                            title: "Vaizdo įrašas sėkmingai patvirtintas",
                            status: "success",
                            duration: 5000,
                            position:"top-right",
                            isClosable: true,
                        })
                    }
                    if (response.status === 404) {
                        toast({
                            title: response.json().message,
                            status: "error",
                            duration: 5000,
                            position:"top-right",
                            isClosable: true,
                        })
                    }
                })
            window.location.reload(true)
        } catch (error){
            console.log(error.message)
        }
    }

    const cancelModal = () => {
        setApproveShow(false)
        setDeclineShow(false)
    }

    const getVideos = useCallback(async () => {
        const unapprovedVideosResponse = await fetch("http://localhost:5046/api/Video/GetUnapprovedVideos", options)
        const unapprovedVideos = await unapprovedVideosResponse.json()
        setUnapprovedVideos(unapprovedVideos)
    }, [])

    useEffect(() => { 
        if(!token){
            navigate(`${process.env.PUBLIC_URL}${Paths.Login}`)
        }
        getVideos()
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
                                                <Th>Naudotojo vardas</Th>
                                                <Th>Nuoroda</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {unapprovedVideos.map((video, index) => {
                                                return (
                                                    <Tr key={index}>
                                                        <Td>
                                                            {video.uploadedBy}
                                                        </Td>
                                                        <Td>
                                                            <button className="previewButton" onClick={() => openInNewTab(video.link)}>Peržiūrėti vaizdo įrašą</button>
                                                        </Td>
                                                        <Td>
                                                            <button className="approveButton" onClick={() => handleApproveShow(video.uploadedBy, video.link)} >Patvirtinti</button>
                                                            <button className="declineButton" onClick={() => handleDeclineShow()} >Atšaukti</button>
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

            <Modal show={approveShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Vaizdo įrašo patvirtinimas</Modal.Title>
                </Modal.Header>
                <Modal.Body>Patvirtinkite, jog tikrai norite patvirtinti vaizdo įrašą</Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={(e) => handleApprove(e)}>
                        Patvirtinti
                    </Button>
                    <Button variant="dark" onClick={() => cancelModal()}>
                        Atšaukti
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={declineShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Vaizdo įrašo atmetimas</Modal.Title>
                </Modal.Header>
                <Modal.Body>Patvirtinkite, jog tikrai norite atmesti šį vaizdo įrašą</Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={(e) => handleDecline(e)}>
                        Atmesti
                    </Button>
                    <Button variant="dark" onClick={() => cancelModal()}>
                        Atšaukti
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}