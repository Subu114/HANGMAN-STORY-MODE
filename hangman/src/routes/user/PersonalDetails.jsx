import React, { useEffect, useRef, useState } from 'react'
import "./User.css"


import { userFolder } from '../../config/serverFolders';
import { downloadImgUrl, uploadImage } from '../../config/handleImages';
import { setUserData } from '../../auth';
import axios from 'axios';
import { serverUrl } from '../../config/serverUrl';
import { message } from 'antd';
import { token } from '../../config/userData';

const PersonalDetails = () => {
    const [clicked, setClicked] = useState(false)
    const [userData, setUserData] = useState(null)
    const [img, setImg] = useState("")
    const fileInputRef = useRef(null);

    useEffect(() => {
        setUserData(() => {
            const val = JSON.parse(localStorage.getItem("user"))
            if(!val)
                return null;
            setImg(val.photo)
            return val
        })

    }, [])

    const handleFileUpload = (e) => {
        const val = e.target.files[0]
        
        try {
            message.info("Uploading img")
            uploadImage(val, userFolder, `${userData._id}`).then(() => {
                downloadImgUrl(userFolder, `${userData._id}`).then((url) => {
                    axios({
                        method: "POST",
                        url: `${serverUrl}/users/update`,
                        data: { _id: userData._id, photo: url },
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                    })
                        .then((res) => {
                            console.log("DATA : ", res.data.user)
                            setUserData(res.data.user)
                            setImg(res.data.user.photo)
                            message.success("Image uploaded successfully")
                        })
                        .catch((e) => {
                            console.log("Error : ", e);
                        })
                }).catch(() => {
                    message.error("image upload failed", 3)
                })
            }).catch(() => {
                message.error("image upload failed", 3)
                
            })
        } catch (error) {
            console.log("error : ", error)
            message.error("image upload failed", 3)

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