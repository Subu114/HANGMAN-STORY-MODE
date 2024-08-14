import "./SceneDisplay.css"
import React, { useEffect, useState } from 'react';

import { message } from 'antd';

const LevelDisplay = ({ user, onDelete, onUpdate }) => {

    const [level, setLevel] = useState(0);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [next_level, setNextLevel] = useState(-1);



    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Submitted Scene:", { sceneNumber, scenePlace, sceneStory, sceneClue, sceneWord });
        if (onUpdate)
            onUpdate({level, title, description, next_level})
    };

    const handleViewData = (e) => {
        e.preventDefault();
        console.log("Scene Data:", {level, title, description, next_level});
    };

    const deleteScene = async () => {
        if (onDelete)
            onDelete(level)
    }

    useEffect(() => {
        setLevel(user.level)
        setTitle(user.title)
        setDescription(user.description)
        setNextLevel(user.next_level)
    }, [user]);

    return (
        <div className="scene-card">
    <form onSubmit={handleSubmit} className="scene-form">
        
        <label>Level Number:</label>
        <input type='number' required value={level} onChange={(e) => setLevel(e.target.value)} readOnly /> <br /><br />

        <label>Level Title:</label>
        <input type='text' required value={title} onChange={(e) => setTitle(e.target.value)} /> <br /><br />

        
        <label>Scene Description:</label>
        <input type='text' required value={description} onChange={(e) => setDescription(e.target.value)} /> <br /><br />

    
        <label>Next Level:</label>
        <input type='number' required minLength={5} value={next_level} onChange={(e) => setNextLevel(e.target.value)} /> <br /><br />

        <div className="button-group">
            <button type="submit" className="submit-button">Update Data</button>
            <button type="button" className="view-button" onClick={handleViewData}>View Entered Data</button>
        </div>
    </form>
    <button className="delete-button" onClick={deleteScene}>Delete Level</button>
    <br />
</div>

    );
}

export default LevelDisplay;
