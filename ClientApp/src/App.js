import React from "react"
import "./App.css"
import HomePage from "./pages/Home/HomePage"
import LoginPage from "./pages/Login/LoginPage"
import RegisterPage from "./pages/Register/RegisterPage"
import LevelsListPage from "./pages/LevelsList/LevelsListPage"
import { Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { ChakraProvider } from "@chakra-ui/react"
import { NavigationBar } from "./components/NavigationBar/NavigationBar"
import UploadVideoPage from "./pages/UploadVideo/UploadVideoPage"
import VideoListPage from "./pages/VideoList/VideoListPage"

function App() {
    return (
        <ChakraProvider>
            <div className="App" style={{ backgroundImage: `url("${process.env.REACT_APP_API_URL}/Photos/background.jpg")` }}>
                <NavigationBar />
                <Routes>
                    <Route path="/" exact element={ <LoginPage /> } />
                    <Route path="/home" element={ <HomePage /> } />
                    <Route path="/register" element={ <RegisterPage /> } />
                    <Route path="/levels" element={ <LevelsListPage /> } />
                    <Route path="/levels/uploadVideo" element={ <UploadVideoPage /> } />
                    <Route path="/videos" element={ <VideoListPage /> } />
                </Routes>
            </div>
        </ChakraProvider>
    )
}

export default App
