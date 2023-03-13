/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react"
import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    useColorModeValue,
    useToast,
    Button,
} from "@chakra-ui/react"
import { useCallback } from "react"
import { useNavigate } from "react-router"
import { Paths } from "../../constants/Paths"
import jwtDecode from "jwt-decode"
import MockData from "../..//Data/MockData.json"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import "./UserPage.css"

export default function UserPage(){

    const token = localStorage.getItem("accessToken")
    const toast = useToast()
    const navigate = useNavigate()
    const [userData, setUserData] = useState([])
    const [avatar, setAvatar] = useState("")
    const [username, setUsername] = useState()

    const getMeOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    }

    const onAvatarChange = async (e) => {
        if(e.target.files){
            const file = e.target.files[0]
            const encodedFile = new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = (event) => {
                    if (event.target) {
                        resolve(event.target.result)
                    }
                }
                reader.onerror = (err) => {
                    reject(err)
                }
                reader.readAsDataURL(file)
            })
            const temp = (await encodedFile)
            setAvatar(temp.split(",")[1])
        }
    }

    const updateAvatarOptions = {
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            username,
            avatar
        }),
        method: "PUT"
    }

    const SaveChanges = async () => {
        try {
            await fetch("http://localhost:5046/api/Users/UpdateUserAvatar", updateAvatarOptions)
                .then((response) => {
                    if(response.status === 200){
                        toast({
                            title: "Pakeitimai sėkmingai išsaugoti",
                            status: "success",
                            duration: 5000,
                            position:"top-right",
                            isClosable: true,
                        })
                    }
                    if (response.status === 404) {
                        toast({
                            title: response.json().Message,
                            status: "error",
                            duration: 5000,
                            position:"top-right",
                            isClosable: true,
                        })
                    }
                    if (response.status === 500) {
                        toast({
                            title: response.json().Message,
                            status: "error",
                            duration: 5000,
                            position:"top-right",
                            isClosable: true,
                        })
                    }
                })
        } catch (error){
            console.log(error.message)
        }
    }

    const getUser = useCallback(async () => {
        const response = await fetch("http://localhost:5046/api/Users/Me", getMeOptions)
        const user = await response.json()
        setUserData(user)
        setAvatar(user.avatar)
        setUsername(user.name)
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

    const slideLeft = () => {
        var slider = document.getElementById("slider")
        slider.scrollLeft = slider.scrollLeft - 300
    }
    
    const slideRight = () => {
        var slider = document.getElementById("slider")
        slider.scrollLeft = slider.scrollLeft + 300
    }

    return (
        <>
            <div className="Avatar">
                <Center py="100px">
                    <Box
                        maxW={"full"}
                        w={"500px"}
                        bg={useColorModeValue("white", "gray.900")}
                        boxShadow={"2xl"}
                        rounded={"lg"}
                        p={6}
                        textAlign={"center"}>
                        <div>
                            <Avatar
                                size={"2xl"}
                                src = {avatar ? "data:image/jpeg;base64," + avatar : null}
                                alt={"Avatar Alt"}
                                mb={4}
                                pos={"relative"}
                                _after={{
                                    w: 4,
                                    h: 4,
                                    bg: "green.300",
                                    border: "2px solid white",
                                    rounded: "full",
                                    pos: "absolute",
                                    bottom: 0,
                                    right: 3,
                                }}
                            />
                            <input className="Input" type="file" onChange={(event) => onAvatarChange(event)} />
                        </div>
                        <div className="UserData">
                            <Heading fontSize={"2xl"} fontFamily={"body"}>
                                {userData.name}
                            </Heading>
                            <Text fontWeight={600} color={"black.500"} mb={4}>
                                {userData.email}
                            </Text>
                            <Text fontWeight={600} color={"black.500"} mb={4}>
                                Lygis: {userData.level}
                            </Text>
                        </div>
                        <Heading fontSize={"2xl"} fontFamily={"body"} >
                            Surinkti ženkleliai
                        </Heading>
                        <div className="relative flex items-center">
                            <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={slideLeft} size={40} />
                            <div
                                id="slider"
                                className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
                            >
                                {MockData.map((item) => (
                                    <img
                                        key={item.id}
                                        className="w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                                        src={item.img}
                                        alt="/"
                                    />
                                ))}
                            </div>
                            <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={slideRight} size={40} />
                        </div>
                        <div className="relative flex items-center" >
                            <Button mt={2} width="450px" onClick={() => SaveChanges()}>
                                Išsaugoti profilio pakeitimus
                            </Button>
                        </div>
                    </Box>
                </Center>
            </div>
        </>
    )
}