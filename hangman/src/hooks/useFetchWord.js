import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { sceneWordKey } from '../config/sceneWordKey';
import { token } from '../config/userData';

const serverUrl = import.meta.env.VITE_SERVER_URL;


const useFetchWord = (sceneNumber) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    // console.log(serverUrl)
    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${serverUrl}/scenes/word/${sceneNumber}`,{
                params : {unique_token : sceneWordKey},
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            })
            console.log(response.data)
            setData(response.data.scene_word.toUpperCase())
            
        } 
        catch (error) {
            console.log("Error Fetching Scene Word : ", error)
            setError(error)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return {data, loading, error}
}

export default useFetchWord