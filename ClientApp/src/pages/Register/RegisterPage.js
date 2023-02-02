import { useState, React } from "react"
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap"
import { Checkbox, useToast } from "@chakra-ui/react"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { Paths } from "../../constants/Paths"

export default function RegisterPage() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState(0)
    const [isCoach, setIsCoach] = useState(false)

    const onCheckboxChange = event => {
        if (event.target.checked) {
            setRole(2)
        } else {
            setRole(0)
        }
        setIsCoach(current => !current)
    }

    const onNameChange = (e) => {
        setName(e.target.value)
    }
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
        }})

    const submitHandler = async (e) => {
        e.preventDefault()

        const requestOptions = {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                password,
                role,
            }),
        }
        const response = await fetch("http://localhost:5046/api/Users/Register", requestOptions)
        const data = await response.json()
        if (response.status === 200) {
            toast({
                title: "Registracija sėkminga",
                status: "success",
                duration: 5000,
                position:"top-right",
                isClosable: true,
            })
            navigate("/")
        }
        if (response.status === 400) {
            toast({
                title: data.message,
                status: "error",
                duration: 5000,
                position:"top-right",
                isClosable: true,
            })
        }
        if (response.status === 409) {
            toast({
                title: data.message,
                status: "error",
                duration: 5000,
                position:"top-right",
                isClosable: true,
            })
        }
    }

    return(
        <div className="RegisterForm">
            <Container >
                <Row className="vh-100 d-flex justify-content-center align-items-center ">
                    <Col md={8} lg={6} xs={12}>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <p className=" mb-5">
                                        <strong>
                                            Registracija
                                        </strong>
                                    </p>
                                    <div className="mb-3">
                                        <Form onSubmit = {(e) => submitHandler(e)} >
                                            <Form.Group className="mb-3" controlId="formBasicText">
                                                <Form.Label className="text-center">
                                                    Naudotojo vardas
                                                </Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    required
                                                    placeholder="Įveskite naudotojo vardą" 
                                                    onChange={(e) => {
                                                        onNameChange(e)
                                                    }} />
                                            </Form.Group>
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
                                            <div className="d-grid">
                                                <Checkbox
                                                    value={isCoach}
                                                    onChange={onCheckboxChange} >
                                                    Esu treneris
                                                </Checkbox>
                                            </div>
                                            <div className="d-grid">
                                                <Button variant="dark" type="submit">
                                                    Registruotis
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0    text-center">
                                                Jau turite paskyrą?{" "}
                                                <a href="/" className="text-dark fw-bold">
                                                    Prisijunkite!
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