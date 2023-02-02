import "./LevelsListPage.css"
import React, { useEffect } from "react"
import LevelsData from "../..//Data/LevelsData.json"
import { 
    Text,
    Button,
    Divider
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../constants/Paths"
import { Container, Card, Image } from "react-bootstrap"

export default function LevelsListPage(){

    const navigate = useNavigate()

    const onClickHandler = () => {
        navigate(Paths.UploadVideo)
    }

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if(!token){
            navigate(`${process.env.REACT_APP_API_URL}${Paths.Login}`)
        }
    })

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
                                            <Button variant="solid" colorScheme="blue" mt="5" onClick={onClickHandler}>
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