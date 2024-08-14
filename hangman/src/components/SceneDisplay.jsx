import "./SceneDisplay.css";
import React, { useEffect, useState } from 'react';
import { downloadImgUrl, uploadImage } from '../config/handleImages';
import { sceneFolder } from '../config/serverFolders';
import { message } from 'antd';

const SceneDisplay = ({ user, onDelete, onUpdate }) => {
    const [scene, setScene] = useState({
        scene_number: 0,
        scene_place: '',
        scene_story: '',
        scene_clue: '',
        scene_word: '',
        scene_img: '',
        next_scene: -1,
        level: 0,
        pre_progression: '',
        post_progression: '',
        pre_progression_img: '',
        post_progression_img: ''
    });

    const handleImgUpload = (e, key, prefix = '') => {
        const file = e.target.files[0];
        if (!file) return;

        const imageName = `${prefix}Scene${scene.scene_number}L${scene.level}`;
        uploadImage(file, sceneFolder, imageName).then(() => {
            downloadImgUrl(sceneFolder, imageName).then((url) => {
                setScene(prevScene => ({ ...prevScene, [key]: url }));
            }).catch(() => {
                message.error("Failed to download image URL.");
            });
        }).catch(() => {
            message.error("Failed to upload image.");
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setScene(prevScene => ({
            ...prevScene,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (onUpdate) {
            onUpdate(scene);
        }
    };

    const handleViewData = (e) => {
        e.preventDefault();
        console.log("Scene Data:", scene);
    };

    const deleteScene = async () => {
        if (onDelete) {
            onDelete(scene.scene_number);
        }
    };

    useEffect(() => {
        if (user) {
            setScene({
                scene_number: user.scene_number,
                scene_place: user.scene_place,
                scene_story: user.scene_story,
                scene_clue: user.scene_clue,
                scene_word: user.scene_word,
                scene_img: user.scene_img,
                next_scene: user.next_scene,
                level: user.level,
                pre_progression: user.pre_progression,
                post_progression: user.post_progression,
                pre_progression_img: user.pre_progression_img,
                post_progression_img: user.post_progression_img
            });
        }
    }, [user]);

    return (
        <div className="scene-card">
            <form onSubmit={handleSubmit} className="scene-form">
                <label>Level:</label>
                <input type='number' required name='level' value={scene.level} onChange={handleChange} /> <br /><br />

                <label>Scene Number:</label>
                <input type='number' required name='scene_number' value={scene.scene_number} readOnly /> <br /><br />

                <label>Scene Place:</label>
                <input type='text' required name='scene_place' value={scene.scene_place} onChange={handleChange} /> <br /><br />

                <label>Scene Story:</label>
                <textarea required name='scene_story' value={scene.scene_story} onChange={handleChange}></textarea> <br /><br />

                <label>Scene Clue:</label>
                <input type='text' required name='scene_clue' value={scene.scene_clue} onChange={handleChange} /> <br /><br />

                <label>Scene Word:</label>
                <input type='text' required name='scene_word' value={scene.scene_word} onChange={handleChange} /> <br /><br />

                <label>Next Scene:</label>
                <input type='number' required name='next_scene' value={scene.next_scene} onChange={handleChange} /> <br /><br />

                <label>Scene Img Link:</label>
                <input type='file' onChange={(e) => handleImgUpload(e, 'scene_img')} /> <br /><br />
                <img src={scene.scene_img} width="300px" className="scene-image" alt="Scene" />

                <label>Pre Scene Progression Story:</label>
                <input type='text' required name='pre_progression' value={scene.pre_progression} onChange={handleChange} /> <br /><br />

                <label>Post Scene Progression Story:</label>
                <input type='text' required name='post_progression' value={scene.post_progression} onChange={handleChange} /> <br /><br />

                <label>Pre Scene Img:</label>
                <input type='file' onChange={(e) => handleImgUpload(e, 'pre_progression_img', 'Pre_')} /> <br /><br />
                <img src={scene.pre_progression_img} width="300px" className="scene-image" alt="Scene" />

                <label>Post Scene Img:</label>
                <input type='file' onChange={(e) => handleImgUpload(e, 'post_progression_img', 'Post_')} /> <br /><br />
                <img src={scene.post_progression_img} width="300px" className="scene-image" alt="Scene" />

              
                <div className="button-group">
                    <button type="submit" className="submit-button">Update Data</button>
                    <button type="button" className="view-button" onClick={handleViewData}>View Entered Data</button>
                </div>
            </form>
            <button className="delete-button" onClick={deleteScene}>Delete Scene</button>
            <br />
        </div>
    );
};

export default SceneDisplay;
