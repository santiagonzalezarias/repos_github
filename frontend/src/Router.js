import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Repositories from "./components/Repositories"
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Favorites from './components/Favorites'

export default function Router() {
    return (
        <>
            <Routes>
                <Route path='/' exact element={<Login />} />
                <Route path='/signup' exact element={<SignUp />} />
                <Route path='/home' exact element={<Home />} />
                <Route path='/repositories' exact element={<Repositories />} />
                <Route path='/favorites' exact element={<Favorites />} />

            </Routes>
        </>
    )
}
