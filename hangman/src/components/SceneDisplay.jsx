import "./SceneDisplay.css"
import React, { useEffect, useState } from 'react';
import { downloadImgUrl, uploadImage } from '../config/handleImages';
import { sceneFolder } from '../config/serverFolders';
import { message } from 'antd';

const SceneDisplay = ({ user, onDelete, onUpdate }) => {
    const [sceneNumber, setSceneNumber] = useState(0);
    const [scenePlace, setScenePlace] = useState('');
    const [sceneStory, setSceneStory] = useState('');
    const [sceneClue, setSceneClue] = useState('');
    const [sceneWord, setSceneWord] = useState('');
    const [sceneImg, setSceneImg] = useState('');
    const [nextScene, setNextScene] = useState(-1);
    const [level, setLevel] = useState(0);
    const [click, setClick] = useState(false);



    const handleImgUpload = (e) => {
        const val = e.target.files[0]
        if(!val || val == undefined)
            return;

        uploadImage(val, sceneFolder, `Scene${sceneNumber}L${level}`).then(() => {
            downloadImgUrl(sceneFolder, `Scene${sceneNumber}L${level}`).then((url) => {
                setSceneImg( () => url)
                message.success("Image uploaded successfully", 2)
            }).catch(() => {

                message.error("Image upload failed", 3)
            })
        }).catch(() => {
            message.error("Image upload failed", 3)

        })

    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Submitted Scene:", { sceneNumber, scenePlace, sceneStory, sceneClue, sceneWord });
        if (onUpdate)
            onUpdate({ scene_number : sceneNumber, scene_place : scenePlace, scene_story : sceneStory, scene_clue : sceneClue, scene_word : sceneWord, scene_img : sceneImg, next_scene : nextScene, level })
    };

    const handleViewData = (e) => {
        e.preventDefault();
        console.log("Scene Data:", { sceneNumber, scenePlace, sceneStory, sceneClue, sceneWord, sceneImg, nextScene, level });
    };

    const deleteScene = async () => {
        if (onDelete)
            onDelete(sceneNumber)
    }

    useEffect(() => {
        setSceneNumber(user.scene_number);
        setScenePlace(user.scene_place);
        setSceneStory(user.scene_story);
        setSceneClue(user.scene_clue);
        setSceneWord(user.scene_word);
        setSceneImg(user.scene_img);
        setNextScene(user.next_scene);
        setLevel(user.level);
    }, [user]);

    return (
        <div className="scene-card">
    <form onSubmit={handleSubmit} className="scene-form">
        <label>Level:</label>
        <input type='number' required minLength={5} value={level} onChange={(e) => setLevel(e.target.value)} /> <br /><br />
        
        <label>Scene Number:</label>
        <input type='number' required value={sceneNumber} onChange={(e) => setSceneNumber(e.target.value)} readOnly /> <br /><br />

        <label>Scene Place:</label>
        <input type='text' required value={scenePlace} onChange={(e) => setScenePlace(e.target.value)} /> <br /><br />

        <label>Scene Story:</label>
        <textarea required value={sceneStory} onChange={(e) => setSceneStory(e.target.value)}></textarea> <br /><br />

        <label>Scene Clue:</label>
        <input type='text' required value={sceneClue} onChange={(e) => setSceneClue(e.target.value)} /> <br /><br />

        <label>Scene Word:</label>
        <input type='text' required minLength={5} value={sceneWord} onChange={(e) => setSceneWord(e.target.value)} /> <br /><br />

        <label>Next Scene:</label>
        <input type='number' required minLength={5} value={nextScene} onChange={(e) => setNextScene(e.target.value)} /> <br /><br />


        <label>Scene Img Link:</label>
        <input type='file' minLength={5} size="90" onChange={handleImgUpload} /> <br /><br />

        <h4>Scene Image</h4>
        <img src={sceneImg} width="300px" className="scene-image" alt="Scene" />
        <div className="button-group">
            <button type="submit" className="submit-button">Update Data</button>
            <button type="button" className="view-button" onClick={handleViewData}>View Entered Data</button>
        </div>
    </form>
    <button className="delete-button" onClick={deleteScene}>Delete Scene</button>
    <br />
</div>

    );
}

export default SceneDisplay;
