import React, { useEffect, useState } from 'react'
import "./User.css"
import { getToken, userDataRemove } from '../../auth'
import { message } from 'antd';
import axios from 'axios';
import { serverUrl } from '../../config/serverUrl';
const StatBox = ({ navigate }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function getStats() {
            try {
                const val = JSON.parse(localStorage.getItem('user'));

                // Merging stats and val into userData state
                setUserData(prevData => ({
                    ...prevData,
                    username: val.username,
                    email: val.email,
                }));
                const token = getToken()

                const res = await axios({
                    method: "GET",
                    url: `${serverUrl}/users/stats`,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const stats = res.data.stats;

                // Merging stats and val into userData state
                setUserData(prevData => ({
                    ...prevData,
                    ...stats,

                }));
            } catch (error) {
                if (error?.response?.status === 404) {
                    message.info("Stats not loaded! Start the game to see your stats.")
                }
            }
        }

        getStats()

    }, [])

    const getChapterText = (val) => {
        switch (val) {
            case 1: return "One";
            case 2: return "Two";
            case 3: return "Three";
            case 4: return "Four";
            case 5: return "Five";
            case 6: return "Six";
            case 7: return "Seven";
            case 8: return "Eight";
            case 9: return "Nine";
            default: return String(val)
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
                    <h3>CURRENT STATS</h3>
                    <hr />
                    <div className='attr-val-box'>
                        <div className='attributes'>
                            <h4>LEVEL</h4><br/>
                            <h4>SCENE</h4><br/>
                            <h4>ACHIECEMENTS</h4><br/>
                        </div>
                        <div className='values'>
                            <p>{getChapterText(userData?.chapter)}  </p><br/>
                            <p>{userData?.scene ? userData?.scene : 'none'}</p><br/>
                            <p>{userData?.achievements ? userData.achievements : 'none'}</p>

                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => {
                message.info("Signing Out")
                userDataRemove();
                setTimeout(() => {
                    message.success("Signed Out Successfully!")
                    navigate("/")
                }, 1000);
            }}
            >Sign out</button>
        </div>
    )
}

export default StatBox