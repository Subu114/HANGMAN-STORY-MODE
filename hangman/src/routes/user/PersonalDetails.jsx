import React, { useEffect, useRef, useState } from 'react'
import "./User.css"


import { userFolder } from '../../config/serverFolders';
import { downloadImgUrl, uploadImage } from '../../config/handleImages';
import { getToken, setUserData as setToLocal } from '../../auth';
import axios from 'axios';
import { serverUrl } from '../../config/serverUrl';
import { message } from 'antd';

const PersonalDetails = () => {
    const [clicked, setClicked] = useState(false)
    const [userData, setUserData] = useState(null)
    const [img, setImg] = useState("")
    const fileInputRef = useRef(null);

    useEffect(() => {
        setUserData(() => {
            const val = JSON.parse(localStorage.getItem("user"))
            if (!val)
                return null;
            setImg(val.photo)
            return val
        })

    }, [])

    const handleFileUpload = async (e) => {
        const val = e.target.files[0]

        try {
            message.info("Uploading img")
            const token = getToken()

            await uploadImage(val, userFolder, `${userData._id}`)
            const url = await downloadImgUrl(userFolder, `${userData._id}`)
            const res = await axios({
                method: "POST",
                url: `${serverUrl}/users/update`,
                data: { photo: url },
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })

            console.log("DATA : ", res.data.user)
            setUserData(res.data.user)
            setToLocal(res.data.user)
            setImg(res.data.user.photo)
            message.success("Image uploaded successfully")

        } catch (error) {
            console.log("error : ", error)
            message.error("Image upload failed!", 3)

        }
    }

    const handleClick = () => {
        fileInputRef.current.click(); // Trigger file input click
    };
    return (
        <div className='personal-details'>

            <button onClick={() => { handleClick() }}>
                {img ?
                    <img src={img}></img>
                    :
                    <p>{userData ? `${userData?.username[0]}${userData?.username[userData.username.length - 1]}` : "User Photo"}</p>
                }
            </button>
            <input type='file' ref={fileInputRef} onChange={handleFileUpload} style={{ zIndex: -1 }} />
            <p>{userData?.username}</p>

        </div>
    )
}

export default PersonalDetails