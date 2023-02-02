import { Divider, Text } from "@chakra-ui/react"
import React from "react"
import { useCallback } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Button, Card, Container } from "react-bootstrap"
import { useNavigate } from "react-router"
import { Paths } from "../../constants/Paths"

export default function NotApprovedVideosListPage() {

    const navigate = useNavigate()
    const token = localStorage.getItem("accessToken")
    const [allVideos, setAllVideos] = useState([])

    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "GET",
    }

    const getUsers = useCallback(async () => {
        const myUsers = await fetch("http://localhost:5046/api/Video/AllVideos", options)
        const tempUsers = await myUsers.json()
        setAllVideos(tempUsers)
    }, [])

    useEffect(() => { 
        if(!token){
            navigate(`${process.env.PUBLIC_URL}${Paths.Login}`)
        }
        getUsers()
    }, [])
    
    return(
        <>
            <div className="d-flex" >
                <Container>
                    <div className="d-flex mt-2" style={{ gap: "10px", flexWrap: "wrap", justifyContent: "space-around", height: "100vh"}}>
                        {allVideos.map(video => {
                            return (
                                <Card key={video.ID} className="shadow" style={{ width: "21%" }}>
                                    <Card.Body>
                                        <div className="mb-3 mt-md-4" >
                                            <Text className="text" mr="2" mt="5">
                                                Įkėlė: {video.uploadedBy}
                                            </Text>
                                            <Text className="text" mr="2">
                                                Nuoroda: {video.link}
                                            </Text>
                                            <Divider mt='5' />
                                            <Button variant="solid" colorScheme="blue" mt="5">
                                                Peržiūrėti
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