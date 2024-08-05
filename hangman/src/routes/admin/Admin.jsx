import React, { useEffect, useState } from 'react'
import ScenesDisplay from './ScenesDisplay'
import { useNavigate } from 'react-router-dom'
import { isAdmin, userDataRemove } from '../../auth';

const Admin = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(!isAdmin())
        {
            return navigate("/");
        }
    })
    return (
        <div >
            <button onClick={() => {navigate("/scenedisplay")}}>SHOW SCENES</button>
            <button onClick={() => {navigate("/sceneset")}}>Create SCENE</button>
            <button onClick={() => {navigate("/gamefiles")}}>Create SCENE</button>
        </div>
    )
}

export default Admin