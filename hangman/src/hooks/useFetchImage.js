import { useEffect, useState } from 'react'
import { downloadImgUrl } from '../config/handleImages'

const useFetchImage = ( folder, fileName ) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState('')
    
    useEffect(() => {
        setLoading(true)
        downloadImgUrl(folder, fileName).then((url) => {
            setData(() => {
                return url
            })
            setTimeout(() => setLoading(false), 1000);
        }).catch((e) => {
            console.log("Erro  in fethcing bg img")
            setLoading(false)
        })
    }, [])

    return { loading, data }
}

export default useFetchImage