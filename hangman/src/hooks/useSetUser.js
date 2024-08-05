import axios from 'axios'
import { useEffect, useState } from 'react'

const serverUrl = import.meta.env.VITE_SERVER_URL;

const useSetUser = (username, email, password, photo = "") => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await axios({
                method: "POST",
                url : `${serverUrl}/users/create`,
                data : {username, email, password, photo}
            })
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

export default useSetUser