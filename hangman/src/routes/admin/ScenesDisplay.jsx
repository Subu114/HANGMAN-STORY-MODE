import React, { useState, useEffect } from 'react';
import SceneDisplay from '../../components/SceneDisplay';
import axios from 'axios';
import { serverUrl } from '../../config/serverUrl';
import { isAdmin } from '../../auth';
import { useNavigate } from 'react-router-dom';
import { token } from '../../config/userData';
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
            const response = await axios.get(`${serverUrl}/scenes/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setScenes(response.data.scenes);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isAdmin()) {
            return navigate("/");
        }
        fetchScenes();
    }, []);

    const deleteScene = async (sceneNumber) => {
        try {
            console.log(sceneNumber);
            await axios.delete(`${serverUrl}/scenes/delete/${sceneNumber}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(`Scene ${sceneNumber} deleted successfully`);
            fetchScenes();
        } catch (err) {
            console.error("Error while deleting Scene:", err.response.data.message);
            message.error("Error while deleting Scene");
        }
    };

    const updateScene = async (sceneObject) => {
        try {
            await axios({
                method : "POST",
                url : `${serverUrl}/scenes/update`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data : sceneObject
            });
            message.success(`Scene ${sceneObject.scene_number} updated successfully`);
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
            <h1 style={{margin: "10px"}}>Levels and Scenes</h1>
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
                        <p style={{margin : '10px'}}>Scenes Found: {filteredScenes.length}</p>
                    ) : (
                        <p style={{margin : '10px'}}>No scenes found</p>
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
