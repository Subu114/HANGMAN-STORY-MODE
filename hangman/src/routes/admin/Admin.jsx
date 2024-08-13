import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { isAdmin } from '../../auth';
import "./Admin.css"
const Admin = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(!isAdmin())
        {
            return navigate("/");
        }
    })
    return (
        <div className='admin-main'>
            <h1>ADMIN PAGE</h1>
            <button onClick={() => {navigate("/adminlevels")}}>MANAGE LEVELS</button>
            <button onClick={() => {navigate("/sceneset")}}>Create SCENE</button>
            <button onClick={() => {navigate("/scenedisplay")}}>SHOW SCENES</button>
            <button onClick={() => {navigate("/gamefiles")}}>Game Fileds</button>
        </div>
    )
}

export default Admin