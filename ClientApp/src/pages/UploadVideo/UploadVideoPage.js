import { Col, Button, Row, Container, Card, Form } from "react-bootstrap"
import { React, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useToast } from "@chakra-ui/react"
import { Paths } from "../../constants/Paths"

export default function UploadVideoPage(){

    const token = localStorage.getItem("accessToken")
    useEffect(() => {
        if(!token){
            navigate(`${process.env.PUBLIC_URL}${Paths.Login}`)
        }})

    const [uploadedBy, setUploadedBy] = useState(" ")
    const [link, setLink] = useState("")
    const navigate = useNavigate()
    const toast = useToast()

    const submitHandler = async (e) => {
        e.preventDefault()

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        await fetch("http://localhost:5046/api/Users/Me", options)
            .then((response) => {
                return response.json()
            })
            .then((data) => setUploadedBy(data.name))

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