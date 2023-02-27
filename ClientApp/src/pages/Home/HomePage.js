/* eslint-disable no-unused-vars */
// import { Avatar, Button, useToast } from "@chakra-ui/react"
// import jwtDecode from "jwt-decode"
// import { useEffect, React, useCallback } from "react"
// import { useNavigate } from "react-router"
// import { Paths } from "../../constants/Paths"
import { Button } from "@chakra-ui/react"
import React from "react"
import "./HomePage.css"
const {useState} = React

const fileToDataUri = (file) => new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (event) => {
        resolve(event.target.result)
    }
    reader.readAsDataURL(file)
})

function HomePage() {

    const [dataUri, setDataUri] = useState("")
    const [blob, setBlob] = useState([])

    const onChange = (file) => {
        if(!file) {
            setDataUri("")
            return
        }

        fileToDataUri(file)
            .then(dataUri => {
                setDataUri(dataUri)
            })
            .then(dataURI => fetch(dataURI))
            .then(res => res.blob())
            .then(blob => setBlob(blob))
    }

    const showSomething = (dataURI) => {
        console.log(dataURI)
    }

    return(
        <div className="vh-100">
            {/* <div>
                <img width="200" height="200" src={dataUri} alt="avatar"/>
                <input type="file" onChange={(event) => onChange(event.target.files[0] || null)} />
                <Button onClick={() => showSomething(dataUri)}>
                    parodyti loge paveiksliuka
                </Button>
            </div>
            <div>
                <img width="200" height="200" src={dataUri} />
            </div> */}
        </div>
    )

    // const token = localStorage.getItem("accessToken")
    // const toast = useToast()
    // const navigate = useNavigate()
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

    // const handleToken = useCallback(() => {
    //     if(!token){
    //         toast({
    //             title: "Turite prisijungti",
    //             status: "error",
    //             duration: 5000,
    //             position:"top-right",
    //             isClosable: true,
    //         })
    //         navigate(`${process.env.PUBLIC_URL}${Paths.Login}`)
    //     }
    //     else{
    //         const { exp } = jwtDecode(token)
    //         const expirationTime = (exp * 1000) - 60000
    //         if (Date.now() >= expirationTime) {
    //             toast({
    //                 title: "Baigėsi sesijos galiojimo laikas",
    //                 status: "warning",
    //                 duration: 5000,
    //                 position:"top-right",
    //                 isClosable: true,
    //             })
    //             navigate(Paths.Login)
    //             localStorage.clear()
    //         }
    //     }
    // }, [])

    // useEffect(() => {
    //     handleToken()
    //     handleFitnessAPI()
    // }, [])

    // return (
    //     <div className={"d-flex flex-column mr-2"}>
    //         <div className={"position-relative"}
    //             onMouseEnter={() => this.setState({showAvatarChangeButton: true})}
    //             onMouseLeave={() => this.setState({showAvatarChangeButton: false})}>
    //             <Avatar name="Foo Bar" className={"position-relative button-cursor"}/>
    //             <div
    //                 className={`position-absolute ${(this.state.showAvatarChangeButton ? "d-inlene-block" : "d-none")}`}
    //                 id={"changeAvatarButton"}>
    //                 <Button variant={"dark"} size={"sm"} block
    //                     onClick={this.fileUploadAction.bind(this)}> Zmeniť</Button>
    //                 <input type="file" hidden ref={this.inputReference}
    //                     onChange={(e) => this.fileUploadInputChange(e)}/>
    //             </div>
    //         </div>
    //     </div>
    // )
}

export default HomePage