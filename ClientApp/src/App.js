import React from 'react'
import './App.css';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import LevelsListPage from './pages/LevelsList/LevelsListPage';
import { Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { NavigationBar } from './pages/NavigationBar/NavigationBar';
import { ChakraProvider } from '@chakra-ui/react';

function App() {

  return (
    <ChakraProvider>
      <div className='App'>
        <NavigationBar />
        <Routes>
          <Route path="/" exact element={ <LoginPage /> } />
          <Route path="/home" element={ <HomePage /> } />
          <Route path="/register" element={ <RegisterPage /> } />
          <Route path="/levels" element={ <LevelsListPage /> } />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
