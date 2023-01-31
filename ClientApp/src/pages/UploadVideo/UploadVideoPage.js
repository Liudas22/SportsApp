import { Col, Button, Row, Container, Card, Form } from "react-bootstrap"
import { useEffect, React, useState } from "react"
import { useNavigate } from "react-router"
import { Paths } from "../../constants/Paths"

export default function    UploadVideoPage(){

    const token = localStorage.getItem("accessToken")
    useEffect(() => {
        if(!token){
            navigate(`${process.env.PUBLIC_URL}${Paths.Login}`)
        }})

    const [uploadedBy, setUploadedBy] = useState(" ")
    const [link, setLink] = useState("")
    const navigate = useNavigate()

    const getData = async () => {

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        await fetch("http://localhost:5046/api/Users/Me", options)
            .then((response) => {
                if(response.status === 200){
                //     toast({
                //         title: "Vaizdo įrašas pridėtas sėkmingai",
                //         status: "success",
                //         duration: 5000,
                //         position:"top-right",
                //         isClosable: true,
                //     })
                    return response.json()
                }else if(response.status === 401){
                //     toast({
                //         title: "Vaizdo įrašas jau egzistuoja",
                //         status: "error",
                //         duration: 5000,
                //         position:"top-right",
                //         isClosable: true,
                //     })
                }
            })
            .then((data) => setUploadedBy(data.name))
    }

    useEffect(() => {
        getData()
    })

    const submitHandler = async (e) => {
        e.preventDefault()
        
        //const toast = useToast()
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

        if (response.status === 200) {
            console.log("STATUS 200")
            /*toast({
                title: "Registracija sėkminga",
                status: "success",
                duration: 5000,
                position:"top-right",
                isClosable: true,
            })*/
        }
        if (response.status === 409) {
            console.log("STATUS 409")
            /*toast({
                title: "Toks el. paštas jau naudojamas",
                status: "error",
                duration: 5000,
                position:"top-right",
                isClosable: true,
            })*/
        }
        const data = await response.json()
        console.log(data)
    }

    return(
        <div className="RegisterForm">
            <Container >
                <Row className="vh-100 d-flex justify-content-center align-items-center ">
                    <Col md={8} lg={6} xs={12}>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <p className=" mb-5">Registracija</p>
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