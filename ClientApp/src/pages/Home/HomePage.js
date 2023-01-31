import { useEffect, React } from "react"
import { useNavigate } from "react-router"
import { Paths } from "../../constants/Paths"
import "./HomePage.css"

function HomePage() {

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if(!token){
            navigate(`${process.env.PUBLIC_URL}${Paths.Login}`)
        }})

    return (
        <div className="HomePage" >

        </div>
    )
}

export default HomePage