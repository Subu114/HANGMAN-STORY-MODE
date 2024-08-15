import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { serverUrl } from "../../config/serverUrl";
import "../../components/SceneDisplay.css";
import { downloadImgUrl, uploadImage } from '../../config/handleImages';
import { sceneFolder } from '../../config/serverFolders';
import { isAdmin } from '../../auth';
import { useNavigate } from 'react-router-dom';
import { token } from '../../config/userData';
import { message } from 'antd';

const ScenesSet = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin()) return navigate("/");
    }, []);

    const [scene, setScene] = useState({
        scene_number: 0,
        scene_place: "",
        scene_story: "",
        scene_clue: "",
        scene_word: "",
        scene_img: "",
        next_scene: -1,
        level: 0,
        pre_progression: '',
        post_progression: '',
        pre_progression_img: '',
        post_progression_img: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setScene(prevScene => ({
            ...prevScene,
            [name]: value
        }));
    };

    const handleImageUpload = (e, key, prefix = '') => {
        e.preventDefault();
        const file = e.target.files[0];
        const imageName = `${prefix}_Scene${scene.scene_number}L${scene.level}`;

        uploadImage(file, sceneFolder, imageName).then(() => {
            downloadImgUrl(sceneFolder, imageName).then((url) => {
                setScene(prevScene => ({
                    ...prevScene,
                    [key]: url
                }));
            }).catch(() => {
                // message.error("Failed to download image URL.");
            });
        }).catch(() => {
            // message.error("Failed to upload image.");
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (scene.scene_img === "") {
                console.log("Image URL not set");
                return;
            }
            const res = await axios({
                method: "POST",
                url: `${serverUrl}/scenes/create`,
                data: scene,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            message.success(res.data.message);
        } catch (error) {
            message.error(error.response ? error.response.data.message : error.message);
        }
    };

    const handleViewData = (e) => {
        e.preventDefault();
        console.log("Scene Object:", scene);
    };

    return (
        <div className='scene-card'>
            <h1 style={{ textAlign: 'center', marginBottom: '10px', textDecoration: 'underline' }}>Add Scene</h1>
            <div className="instructions">
                <h2>Instructions</h2>
                <div className="instructions-section">
                    <h4>For Server Purpose</h4>
                    <ul>
                        <li>Please fill the scene number and level first, then upload the image.</li>
                        <li>For best results, make sure to upload images only when the previous one has been successfully uploaded.</li>
                    </ul>
                </div>
                <div className="instructions-section">
                    <h4>For Game Mechanics</h4>
                    <ul>
                        <li>If your current scene is the last, make sure to give the next scene field as -1.</li>
                        <li>If your current scene is not the last, then make sure to give the number of the next scene in the field.</li>
                        <li>If your current level is the last, make sure to give the next levle field as -1.</li>
                        <li>If your current level is not the last, then make sure to give the number of the next level in the field.</li>

                    </ul>
                </div>
            </div>

            <form onSubmit={handleSubmit} className='scene-form'>
                <label>Level :</label>
                <input type='number' required name='level' onChange={handleChange} /> <br /><br />

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
                <input type='number' required name='next_scene' onChange={handleChange} /> <br /><br />

                <label>Scene Img Link:</label>
                <input type='file' required onChange={(e) => handleImageUpload(e, 'scene_img')} /> <br /><br />

                <label>Pre Scene Progression Story:</label>
                <input type='text' required minLength={5} name='pre_progression' onChange={handleChange} /> <br /><br />

                <label>Post Scene Progression Story:</label>
                <input type='text' required minLength={5} name='post_progression' onChange={handleChange} /> <br /><br />

                <label>Pre Scene Img</label>
                <input type='file' required name='pre_progression_img' onChange={(e) => handleImageUpload(e, 'pre_progression_img', 'Pre')} /> <br /><br />

                <label>Post Scene Img</label>
                <input type='file' required name='post_progression_img' onChange={(e) => handleImageUpload(e, 'post_progression_img', 'Post')} /> <br /><br />

                <button type="submit" className='submit-button'>Submit Data</button>
                <button onClick={handleViewData} className='view-button'>View Entered Data</button>
            </form>
        </div>
    );
};

export default ScenesSet;
