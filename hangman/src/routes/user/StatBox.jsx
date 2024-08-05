import React, { useEffect, useState } from 'react'
import "./User.css"
import { userDataRemove } from '../../auth'
const StatBox = ({ navigate }) => {
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
        setUserData(() => {
            const val = JSON.parse(localStorage.getItem("user"))
            if (!val)
                return null;
            return val
        })

    }, [])

    const getChapterText = (val) => {
        switch(val){
            case 1 : return "One";
            case 2 : return "Two";
            case 3 : return "Three";
            case 4 : return "Four";
            case 5 : return "Five";
            case 6 : return "Six";
            case 7 : return "Seven";
            case 8 : return "Eight";
            case 9 : return "Nine";
            default : return "N/A"
        }
    }

    return (
        <div className='stats-box'>

            <div className='details'>
                <h2>User Details</h2>
                <div className='account'>
                    <h3>Account</h3>
                    <p>{userData?.email}</p>
                </div>
                <div className='username'>
                    <h3>Username</h3>
                    <p>{userData?.username}</p>
                </div>
                <div className='current-level'>
                    <h3>CURRENT LEVEL</h3>
                    <hr />
                    <div className='attr-val-box'>
                        <div className='attributes'>
                            <h4>CHAPTER</h4>
                            <h4>SCENE</h4>
                            <h4>ACHIECEMENTS</h4>
                        </div>
                        <div className='values'>
                            <p>{getChapterText(userData?.chapter)}</p>
                            <p>{userData?.scene}</p>
                            <p>{userData?.achievements}</p>

                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => { userDataRemove(); return navigate("/") }}>Sign out</button>
        </div>
    )
}

export default StatBox