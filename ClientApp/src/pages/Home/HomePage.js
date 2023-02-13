import { useToast } from "@chakra-ui/react"
import jwtDecode from "jwt-decode"
import { useEffect, React, useCallback } from "react"
import { useNavigate } from "react-router"
import { Paths } from "../../constants/Paths"
import "./HomePage.css"

function HomePage() {

    const token = localStorage.getItem("accessToken")
    const toast = useToast()
    const navigate = useNavigate()
    // const handleFitnessAPI = useCallback(async() => {
    //     const options = {
    //         method: "GET",
    //         headers: {
    //             "X-RapidAPI-Key": "249fd58a7emsh9866b807ab2b742p17d8ccjsn3169353d7bb1",
    //             "X-RapidAPI-Host": "edamam-recipe-search.p.rapidapi.com"
    //         }
    //     }
        
    //     fetch("https://edamam-recipe-search.p.rapidapi.com/search?q=chicken", options)
    //         .then(response => response.json())
    //         .then(response => console.log(response))
    //         .catch(err => console.error(err))
    // })

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
        // handleFitnessAPI()
    }, [])

    return (
        <div className="HomePage" >

        </div>
    )
}

export default HomePage