import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Events from '../Components/Events/Events'
import { PrivatRoute } from './PrivatRoute'
import Login from '../Components/Login_Signup/Login'
import Signup from '../Components/Login_Signup/Signup'
import Dashbord from '../Components/Dashbord'
import User from '../Components/Login_Signup/User'
import AddEvent from '../Components/Events/AddEvent'
import EditEvent from '../Components/Events/EditEvent'

const MainRoutes = () => {
    return (
        <Routes >
            <Route path='/' element={<Dashbord/>}/>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            <Route element={<PrivatRoute />}>
                <Route path="/event" exact element={<Events />} />
                <Route path='/addevent' exact element={<AddEvent />} />
                <Route path='/edit' exact element={<EditEvent />} />
                <Route path='/user' exact element={<User/>}/>
            </Route>
        </Routes>

    )
}

export default MainRoutes
