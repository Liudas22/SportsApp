import { Col, Button, Row, Container, Card, Form } from "react-bootstrap"
import { React, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useToast } from "@chakra-ui/react"
import { Paths } from "../../constants/Paths"
import { useCallback } from "react"
import jwtDecode from "jwt-decode"

export default function UploadVideoPage(){

    const token = localStorage.getItem("accessToken")
    const [uploadedBy, setUploadedBy] = useState("")
    const [link, setLink] = useState("")
    const navigate = useNavigate()
    const toast = useToast()

    const getMeOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    }

    const getUser = useCallback(async () => {
        await fetch("http://localhost:5046/api/Users/Me", getMeOptions)
            .then((response) => {
                return response.json()
            })
            .then((data) => setUploadedBy(data.name))
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
        getUser()
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault()
        const requestOptions = {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                uploadedBy,
                link
            }),
        }
        const response = await fetch("http://localhost:5046/api/Video/UploadVideo", requestOptions)
        const data = await response.json()
        if (response.status === 200) {
            toast({
                title: "Vaizdo įrašas įkeltas sėkmingai",
                status: "success",
                duration: 5000,
                position:"top-right",
                isClosable: true,
            })
            navigate(Paths.Home)
        }
        if (response.status === 409) {
            toast({
                title: data.Message,
                status: "error",
                duration: 5000,
                position:"top-right",
                isClosable: true,
            })
        }
    }
    return(
        <div className="vh-100">
            <Container >
                <Row className="vh-100 d-flex justify-content-center align-items-center ">
                    <Col md={8} lg={6} xs={12}>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <p className=" mb-5">
                                        <strong>
                                            Vaizdo įrašo įkėlimas
                                        </strong>
                                    </p>
                                    <div className="mb-3">
                                        <Form onSubmit = {(e) => submitHandler(e)} >
                                            <Form.Group className="mb-3" controlId="formBasicText">
                                                <Form.Label className="text-center">
                                                    Vaizdo įrašo nuoroda
                                                </Form.Label>
                                                <Form.Control 
                                                    type="link" 
                                                    required
                                                    placeholder="Įveskite nuorodą"
                                                    onChange={((e) => setLink(e.target.value))}
                                                />
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button variant="dark" type="submit" >
                                                    Įkelti
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}