import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverUrl } from "../../config/serverUrl"
import "../../components/SceneDisplay.css"
import { isAdmin } from '../../auth';
import { useNavigate } from 'react-router-dom';
import { token } from '../../config/userData';
import { message } from 'antd';
const LevelSet = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin())
            return navigate("/")
    }, [])

    const [level, setLevel] = useState({
        level: 0,
        title : '',
        description : '',
        next_level : -1
    })


    const handleChange = (e) => {
        const { name, value } = e.target
        setLevel(prevScene => ({
            ...prevScene,
            [name]: value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(level)
            const res = await axios({
                method : "POST",
                url : `${serverUrl}/levels/create`,
                data : level,
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            message.success(res.data.message)
        } catch (error) {
            message.error(error.response ? error.response.data.message : error.essage)
        }
    }

    const handleViewData = (e) => {
        e.preventDefault()
        console.log("Scene Object:", level)
    }

    return (
        <div className='scene-card'>
            <h1 style={{marginBottom : '10px', textAlign : 'center'}}> Create a Level</h1>
            <form onSubmit={handleSubmit} className='scene-form'>
                <label>Level Number:</label>
                <input type='number' required name='level' onChange={handleChange} /> <br /><br />


                <label>Level Title:</label>
                <input type='text' required name='title' onChange={handleChange} /> <br /><br />

                <label>Level Description:</label>
                <input type='text' required minLength={5} name='description' onChange={handleChange} /> <br /><br />

                <label>Next Level Number:</label>
                <input type='number' required minLength={5} name='next_level' onChange={handleChange} /> <br /><br />

            
                <button type="submit" className='submit-button'>Submit Data</button>
                <button onClick={handleViewData} className='view-button'>View Entered Data</button>
            </form>
        </div>
    )
}

export default LevelSet
