import axios from 'axios'
import React, { useEffect, useState } from 'react'

const serverUrl = import.meta.env.VITE_SERVER_URL;


const useFetchUserData = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    // console.log(serverUrl)
    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await axios({
                method: "GET",
                url : `${serverUrl}/users`,
            })
            // console.log(response.data)
            setData(response.data)
        } 
        catch (error) {
            console.log("Error creating User : ", error)
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

export default useFetchUserData