import { Button } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAdmin, isAuth, userDataRemove } from '../auth'

const Menu = () => {
    const [auth, setAuth] = useState(isAuth())
    const navigate = useNavigate()
    return (
        <div style={{ color: "white" }}>
            <Button disabled={!auth || isAdmin()} onClick={() => {navigate("/game")}}>Play</Button>
            {auth && <p style={{ fontSize: "10px", color: "gray", fontWeight: "bolder" }}>If progress is saved , it will be resumed</p>}
            {!auth && <p style={{ fontSize: "10px", color: "red", fontWeight: "bolder" }}>Kindly Register to Play</p>}
            <Button>Setting</Button>
            <Button>Quit</Button>
            {!auth && <Button onClick={() => { navigate("/signin") }}>Register</Button>}
            {isAdmin() && <Button onClick={() => { navigate("/admin") }}>Game Scenes</Button>}
            {auth && <Button onClick={() => { userDataRemove(); setAuth(false) }}>Sign Out</Button>}

            {/* MAKE SURE TO ADD AUTH VERIFICATION FOR ADMIN ACCESS FROM SERVER SIDE */}

        </div>
    )
}

export default Menu