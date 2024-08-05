import axios from 'axios'
import React, { useEffect, useState } from 'react'
const serverUrl = import.meta.env.VITE_SERVER_URL;



const useFetchScenes = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    // console.log(serverUrl)
    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await axios({
                method: "GET",
                url : `${serverUrl}/scenes/`,
            })
            console.log(response.data.scenes)
            setData(response.data.scenes)
        } 
        catch (error) {
            console.log("Error Getting Scenes : ", error)
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

export default useFetchScenes