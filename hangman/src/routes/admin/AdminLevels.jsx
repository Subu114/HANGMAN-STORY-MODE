import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { isAdmin } from '../../auth';
import "./Admin.css"
const AdminLevel = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(!isAdmin())
        {
            return navigate("/");
        }
    })
    return (
        <div className='admin-main'>
            <h1>MANGE LEVELS</h1>
            <button onClick={() => {navigate("/levelset")}}>Create Level</button>
            <button onClick={() => {navigate("/levelsdisplay")}}>Modify Levels</button>
        </div>
    )
}

export default AdminLevel