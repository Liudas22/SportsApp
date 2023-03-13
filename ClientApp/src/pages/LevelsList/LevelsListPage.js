import "./LevelsListPage.css"
import React, { useEffect } from "react"
import LevelsData from "../..//Data/LevelsData.json"
import { 
    Text,
    Button,
    Divider,
    useToast
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../constants/Paths"
import { Container, Card, Image } from "react-bootstrap"
import { useCallback } from "react"
import jwtDecode from "jwt-decode"
import { useState } from "react"

export default function LevelsListPage(){
    
    const token = localStorage.getItem("accessToken")
    const navigate = useNavigate()
    const toast = useToast()
    const [userData, setUserData] = useState([])

    const onClickHandler = (level) => {
        if(userData.level >= level){
            toast({
                title: "Šitą lygį jau esate pasiekęs",
                status: "error",
                duration: 5000,
                position:"top-right",
                isClosable: true,
            })
        }
        else{
            navigate(Paths.UploadVideo)
        }
        
    }

    const getMeOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    }

    const getUser = useCallback(async () => {
        const response = await fetch("http://localhost:5046/api/Users/Me", getMeOptions)
        const user = await response.json()
        setUserData(user)
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

    return(
        <>
            <div className="d-flex" >
                <Container>
                    <div className="d-flex mt-2" style={{ gap: "10px", flexWrap: "wrap", justifyContent: "space-around", height: "100vh"}}>
                        {LevelsData.map(level => {
                            return (
                                <Card key={level.ID} className="shadow" style={{ width: "21%" }}>
                                    <Card.Body>
                                        <div className="mb-3 mt-md-4" >
                                            <Image
                                                src={level.logo}
                                                borderradius="sm"
                                                sizes="sm"
                                            />
                                            <Text className="text" mr="2" mt="5">
                                                Prisitraukimai: {level.PullUps}
                                            </Text>
                                            <Text className="text" mr="2">
                                                Atsispaudimai: {level.PushUps}
                                            </Text>
                                            <Text className="text" mr="2">
                                                Atsispaudimai lygiagretėse: {level.Dips}
                                            </Text>
                                            <Text className="text" mr="2">
                                                Pritūpimai: {level.Squats}
                                            </Text>
                                            <Divider mt='5' />
                                            <Button variant="solid" colorScheme="blue" mt="5" onClick={() => onClickHandler(level.ID)}>
                                                Įkelti video
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </div>
                </Container>
            </div>
        </>
    )
}