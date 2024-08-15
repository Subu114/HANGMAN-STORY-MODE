import React, { useState, useEffect } from 'react';
import SceneDisplay from '../../components/SceneDisplay';
import axios from 'axios';
import { serverUrl } from '../../config/serverUrl';
import { getToken, isAdmin } from '../../auth';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import "./ScenesDisplay.css"

const ScenesDisplay = () => {
    const [scenes, setScenes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchLevel, setSearchLevel] = useState('');
    const [searchNextScene, setSearchNextScene] = useState('');

    const navigate = useNavigate();

    const fetchScenes = async () => {
        try {
            setLoading(true);
            const token = getToken()
            const response = await axios.get(`${serverUrl}/scenes/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setScenes(response.data.scenes);
        } catch (err) {
            setError(err);
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        if (!isAdmin()) {
            return navigate("/");
        }
        fetchScenes()

    }, []);

    const deleteScene = async (sceneNumber) => {
        try {
            console.log(sceneNumber);
            await axios.delete(`${serverUrl}/scenes/delete/${sceneNumber}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            message.success(`Scene ${sceneNumber} deleted successfully`);
            fetchScenes();
        } catch (err) {
            console.error("Error while deleting Scene:", err.response.data.message);
            message.error("Error while deleting Scene");
        }
    };

    const updateScene = async (sceneObject) => {
        try {
            await axios({
                method: "POST",
                url: `${serverUrl}/scenes/update`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: sceneObject
            });
            message.success(`Level ${sceneObject.level} Scene ${sceneObject.scene_number} updated successfully`);
            fetchScenes();
        } catch (err) {
            message.error("Error while updating Scene", err.response ? err.response.data.message : err.message);
        }
    };

    const filteredScenes = scenes.filter(scene => {
        return (
            (!searchLevel || scene.level === parseInt(searchLevel)) &&
            (!searchNextScene || scene.scene_number === parseInt(searchNextScene))
        );
    });

    return (

        <div className="scenes-display">
            <h1 style={{ margin: "10px", textAlign: 'center' }}>Levels and Scenes</h1>
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
            <div className="search-container">
                <input
                    type="number"
                    placeholder="Search by Level"
                    value={searchLevel}
                    onChange={(e) => setSearchLevel(e.target.value)}
                    className="search-input"
                />
                <input
                    type="number"
                    placeholder="Search by Next Scene"
                    value={searchNextScene}
                    onChange={(e) => setSearchNextScene(e.target.value)}
                    className="search-input"
                />
            </div>
            {error && <div className="error-message">Something Went Wrong</div>}
            {loading ? <div className="loading-message">Loading...</div> : (
                <div className="scenes-list">
                    {filteredScenes.length > 0 ? (
                        <p style={{ margin: '10px' }}>Scenes Found: {filteredScenes.length}</p>
                    ) : (
                        <p style={{ margin: '10px' }}>No scenes found</p>
                    )}
                    {filteredScenes.map((ele, index) => (
                        <div key={index} className="scene-item">
                            <SceneDisplay user={ele} onDelete={deleteScene} onUpdate={updateScene} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ScenesDisplay;
