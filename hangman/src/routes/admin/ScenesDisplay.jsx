import React, { useState, useEffect } from 'react';
import SceneDisplay from '../../components/SceneDisplay';
import axios from 'axios';
import { serverUrl } from '../../config/serverUrl';
import { isAdmin, userDataRemove } from '../../auth';
import { useNavigate } from 'react-router-dom';

const ScenesDisplay = () => {
    const [scenes, setScenes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    const fetchScenes = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${serverUrl}/scenes/`);
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
            console.log(sceneNumber)
            await axios.delete(`${serverUrl}/scenes/delete/${sceneNumber}`);
            console.log(`Scene ${sceneNumber} deleted Succesffuly`)
            fetchScenes();
        } catch (err) {
            console.error("Error while deleting Scene:", err.response.data.message);
        }
    };
    const updateScene = async (sceneObject) => {
        try {
            console.log(`Scene ${sceneObject.sceneNumber} Updated Succesffuly`)
            fetchScenes();
            console.log(sceneObject)
        } catch (err) {
            console.error("Error while deleting Scene:", err);
        }
    };

    return (
        <div style={{ color: "white" }}>
            <h1>Current Scenes:</h1>
            {error && <div>Something Went Wrong</div>}
            {loading ? <div>Loading...</div> : (
                <div>
                    {scenes.length > 0 && <p>Scenes are {scenes.length}</p>}
                    {scenes.map((ele, index) => (
                        <div key={index}>
                            <SceneDisplay user={ele} onDelete={deleteScene} onUpdate={updateScene} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ScenesDisplay;
