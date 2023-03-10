import { useState, useEffect, React } from "react"
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap"
import { useToast } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../constants/Paths"

function LoginPage() {

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const toast = useToast()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if(token){
            navigate(`${process.env.PUBLIC_URL}${Paths.Home}`)
        }
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault()
        const requestOptions = {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
        }
        const response = await fetch("http://localhost:5046/api/Users/Login", requestOptions)
        const data = await response.json()

        if (response.status === 200) {
            toast({
                title: "Sėkmingai prisijungėte",
                status: "success",
                duration: 5000,
                position:"top-right",
                isClosable: true,
            })
            localStorage.setItem("accessToken", data.accessToken)
            navigate(`${process.env.PUBLIC_URL}${Paths.Home}`)
        }
        if (data.StatusCode === 404) {
            toast({
                title: data.Message,
                status: "error",
                duration: 5000,
                position:"top-right",
                isClosable: true,
            })
        }
        if (data.StatusCode === 400) {
            toast({
                title: data.Message,
                status: "error",
                duration: 5000,
                position:"top-right",
                isClosable: true,
            })
        }
    }

    return (
        <div className="LoginPage">
            <Container >
                <Row className="vh-100 d-flex justify-content-center align-items-center ">
                    <Col md={8} lg={6} xs={12}>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <p className=" mb-5">
                                        <strong>
                                            Prisijungti prie paskyros
                                        </strong>
                                    </p>
                                    <div className="mb-3">
                                        <Form onSubmit = {(e) => submitHandler(e)} >

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    El. paštas
                                                </Form.Label>
                                                <Form.Control 
                                                    type="email" 
                                                    required
                                                    placeholder="Įveskite el. paštą"
                                                    onChange={(e) => {
                                                        onEmailChange(e)
                                                    }} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Slaptažodis</Form.Label>
                                                <Form.Control 
                                                    type="password" 
                                                    required
                                                    placeholder="Įveskite slaptažodį"
                                                    onChange={(e) => {
                                                        onPasswordChange(e)
                                                    }} />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCheckbox"
                                            >
                                                <p className="small">
                                                    <a className="text-dark" href="#!">
                                                        Pamiršote slaptažodį?
                                                    </a>
                                                </p>
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button variant="dark" type="submit">
                                                    Prisijungti
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0    text-center">
                                                Neturite paskyros?{" "}
                                                <a href="/register" className="text-dark fw-bold">
                                                    Užsiregistruok!
                                                </a>
                                            </p>
                                        </div>
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

export default LoginPage