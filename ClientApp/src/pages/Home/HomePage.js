import { useEffect, React, useCallback } from "react"
import { useNavigate } from "react-router"
import { Paths } from "../../constants/Paths"
import "./HomePage.css"

function HomePage() {

    const navigate = useNavigate()
    const handleFitnessAPI = useCallback(async() => {
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "249fd58a7emsh9866b807ab2b742p17d8ccjsn3169353d7bb1",
                "X-RapidAPI-Host": "edamam-recipe-search.p.rapidapi.com"
            }
        }
        
        fetch("https://edamam-recipe-search.p.rapidapi.com/search?q=chicken", options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err))
    })

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if(!token){
            navigate(`${process.env.PUBLIC_URL}${Paths.Login}`)
        }
        handleFitnessAPI()
    }, [])

    return (
        <div className="HomePage" >

        </div>
    )
}

export default HomePage