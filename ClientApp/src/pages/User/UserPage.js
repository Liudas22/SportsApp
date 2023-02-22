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
} from "@chakra-ui/react"
import { useCallback } from "react"
import { useNavigate } from "react-router"
import { Paths } from "../../constants/Paths"
import jwtDecode from "jwt-decode"
import MockData from "../..//Data/MockData.json"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"

export default function UserPage(){

    const token = localStorage.getItem("accessToken")
    const toast = useToast()
    const navigate = useNavigate()
    const [userData, setUserData] = useState([])

    const getMeOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    }

    const getUser = useCallback(async () => {
        await fetch("http://localhost:5046/api/Users/Me", getMeOptions)
            .then((response) => {
                return response.json()
            })
            .then((data) => setUserData(data))
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
            <div className="vh-100">
                <Center py="100px">
                    <Box
                        maxW={"full"}
                        w={"500px"}
                        bg={useColorModeValue("white", "gray.900")}
                        boxShadow={"2xl"}
                        rounded={"lg"}
                        p={6}
                        textAlign={"center"}>
                        <Avatar
                            size={"2xl"}
                            src={
                                "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/70198/cartoon-sportsman-clipart-xl.png"
                            }
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
                        <Heading fontSize={"2xl"} fontFamily={"body"}>
                            {userData.name}
                        </Heading>
                        <Text fontWeight={600} color={"gray.500"} mb={4}>
                            {userData.email}
                        </Text>
                        <Text fontWeight={600} color={"gray.500"} mb={4}>
                            Lygis: {userData.level}
                        </Text>
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
                    </Box>
                </Center>
            </div>
        </>
    )
}