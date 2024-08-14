import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { sceneWordKey } from '../config/sceneWordKey';
import { token } from '../config/userData';
import { serverUrl } from '../config/serverUrl';
import { getLevel } from '../auth';


const useFetchWord = (sceneNumber) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const level = getLevel()
                const response = await axios({
                    method: "POST",
                    url: `${serverUrl}/scenes/word/${sceneNumber}/${level}`,
                    data: { unique_token: sceneWordKey },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setData(response.data.scene_word.toUpperCase())

            }
            catch (error) {
                console.log("Error Fetching Scene Word : ", error)
                setError(error)
            }
            finally {
                setLoading(false)
            }
        }

        fetchData();
    }, [])

    return { data, loading, error }
}

export default useFetchWord