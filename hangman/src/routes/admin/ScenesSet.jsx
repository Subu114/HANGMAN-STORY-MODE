import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverUrl } from "../../config/serverUrl"

import { downloadImgUrl, uploadImage } from '../../config/handleImages';
import { sceneFolder } from '../../config/serverFolders';
import { isAdmin } from '../../auth';
import { useNavigate } from 'react-router-dom';
const ScenesSet = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAdmin())
            return navigate("/")
    }, [])

    const [scene, setScene] = useState({
        scene_number: 0,
        scene_place: "",
        scene_story: "",
        scene_clue: "",
        scene_word: "",
        scene_img: "",
        next_scene: -1
    })

    const [img, setImg] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setScene(prevScene => ({
            ...prevScene,
            [name]: value
        }))
    }

    const handleImgUpload = (e) => {
        alert("Uploading img")
        const val = e.target.files[0]
        setImg(() => val)
        uploadImage(img, sceneFolder, `Scene${scene.scene_number}`).then(() => {
            downloadImgUrl(sceneFolder, `Scene${scene.scene_number}`).then((url) => {
                setScene((val) => ({ ...val, ["scene_img"]: url }))
                alert("image uploaded successfully")
            }).catch(() => {

                alert("image upload failed")
            })
        }).catch(() => {
            alert("image upload failed")

        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (scene.scene_img == "") {
                console.log("Image url not set")
                return;
            }
            console.log(scene)
            const res = await axios.post(`${serverUrl}/scenes/create`, scene)
            console.log(res.data.message)
        } catch (error) {
            console.error("Error in creating scene:", error.response.data.message)
        }
    }

    const handleViewData = (e) => {
        e.preventDefault()
        console.log("Scene Object:", scene)
    }

    return (
        <div style={{ color: "white" }} autoFocus>
            <form onSubmit={handleSubmit}>
                <label>Scene Number:</label>
                <input type='number' required name='scene_number' onChange={handleChange} /> <br /><br />

                <label>Scene Place:</label>
                <input type='text' required name='scene_place' onChange={handleChange} /> <br /><br />

                <label>Scene Story:</label>
                <textarea required name='scene_story' onChange={handleChange}></textarea> <br /><br />

                <label>Scene Clue:</label>
                <input type='text' required name='scene_clue' onChange={handleChange} /> <br /><br />

                <label>Scene Word:</label>
                <input type='text' required minLength={5} name='scene_word' onChange={handleChange} /> <br /><br />

                <label>Next Scene Number:</label>
                <input type='number' required minLength={5} name='next_scene' onChange={handleChange} /> <br /><br />

                <label>Scene Img Link:</label>
                <input type='file' required minLength={5} name='scene_img' onChange={handleImgUpload} /> <br /><br />

                <button type="submit">Submit Data</button>
                <button onClick={handleViewData}>View Entered Data</button>
            </form>
        </div>
    )
}

export default ScenesSet
