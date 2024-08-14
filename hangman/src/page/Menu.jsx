import { Button } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Menu = () => {
    const [auth, setAuth] = useState(isAuth())
    const navigate = useNavigate()
    return (
        <div style={{ color: "white" }}>
            
        </div>
    )
}

export default Menu