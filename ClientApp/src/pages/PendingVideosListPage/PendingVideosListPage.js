import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react"
import jwtDecode from "jwt-decode"
import React from "react"
import { useCallback } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Button, Card, Container, Modal, Row } from "react-bootstrap"
import { useNavigate } from "react-router"
import { Paths } from "../../constants/Paths"
import "./PendingVideosListPage.css"

export default function PendingVideosListPage() {

    const navigate = useNavigate()
    const token = localStorage.getItem("accessToken")
    const [pendingVideos, setPendingVideos] = useState([])
    const [approveShow, setApproveShow] = useState(false)
    const [declineShow, setDeclineShow] = useState(false)
    const [Status, setStatus] = useState(0)
    const [uploadedBy, setUploadedBy] = useState("")
    const [Link, setLink] = useState("")
    const toast = useToast()

    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer")
    }

    const updateVideoRequestOptions = {
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            uploadedBy,
            Link,
            Status,
        }),
        method: "PUT"
    }

    const requestOptions = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "PUT",
    }

    const getPendingVideosRequestOptions = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "GET",
    }

    const handleApproveShow = async (uploadedBy, videoLink) => {
        setStatus(1)
        setUploadedBy(uploadedBy)
        setLink(videoLink)
        setApproveShow(true)
    }
    const handleDeclineShow = async (uploadedBy, videoLink) => {
        setStatus(0)
        setUploadedBy(uploadedBy)
        setLink(videoLink)
        setDeclineShow(true)
    }
    const handleClose = () => {
        setApproveShow(false)
        setDeclineShow(false)
    }

    const handleApprove = async () => {
        try {
            const response = await fetch(`http://localhost:5046/api/Users/UpdateUserLevel/${uploadedBy}`, requestOptions)
            if (response.status === 200) {
                toast({
                    title: "Vaizdo įrašas sėkmingai patvirtintas",
                    status: "success",
                    duration: 5000,
                    position:"top-right",
                    isClosable: true,
                })
                await changeVideoStatus()
            }
            if (response.status === 404) {
                toast({
                    title: "Nerastas naudotojas",
                    status: "error",
                    duration: 5000,
                    position:"top-right",
                    isClosable: true,
                })
            }
        } catch (error){
            console.log(error.message)
        }
    }
    const changeVideoStatus = async () => {
        try {
            await fetch("http://localhost:5046/api/Video/UpdateVideoStatus", updateVideoRequestOptions)
                .then((response) => {
                    if(response.status === 200){
                        if(Status === 0){
                            toast({
                                title: "Vaizdo įrašas sėkmingai atmestas",
                                status: "success",
                                duration: 5000,
                                position:"top-right",
                                isClosable: true,
                            })
                            setDeclineShow(false)
                        }
                        if(Status === 1){
                            toast({
                                title: "Vaizdo įrašas sėkmingai patvirtintas",
                                status: "success",
                                duration: 5000,
                                position:"top-right",
                                isClosable: true,
                            })
                            setApproveShow(false)
                        }
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
    const handleDecline = async () => {
        try {
            await changeVideoStatus()
        } catch (error){
            console.log(error.message)
        }
    }

    const cancelModal = () => {
        setApproveShow(false)
        setDeclineShow(false)
    }

    const getVideos = useCallback(async () => {
        const pendingVideosResponse = await fetch("http://localhost:5046/api/Video/GetPendingVideos", getPendingVideosRequestOptions)
        const pendingVideos = await pendingVideosResponse.json()
        setPendingVideos(pendingVideos)
    }, [])

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
                                        <TableCaption><strong>Visi vaizdo įrašai</strong></TableCaption>
                                        <Thead>
                                            <Tr>
                                                <Th>#</Th>
                                                <Th>Naudotojo vardas</Th>
                                                <Th>Nuoroda</Th>
                                                <Th>Veiksmai</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {pendingVideos.map((video, index) => {
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
                                                            <button className="approveButton" onClick={() => handleApproveShow(video.uploadedBy, video.link)} >Patvirtinti</button>
                                                            <button className="declineButton" onClick={() => handleDeclineShow(video.uploadedBy, video.link)} >Atšaukti</button>
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