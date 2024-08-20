import React, { useState, useEffect } from 'react';
import SceneDisplay from '../../components/SceneDisplay';
import axios from 'axios';
import { serverUrl } from '../../config/serverUrl';
import { getToken, getUserId, isAdmin } from '../../auth';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import "./ScenesDisplay.css"
import LevelDisplay from '../../components/LevelDisplay';

const LevelsDisplay = () => {
    const [levels, setLevels] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchLevel, setSearchLevel] = useState('');


    const navigate = useNavigate();

    const fetchLevels = async () => {
        try {
            const token = getToken();
            setLoading(true);
            
            const response = await axios.get(`${serverUrl}/levels/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params : {_id : getUserId() ? getUserId() : null }
            });
            setLevels(response.data.levels);
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
        fetchLevels();
    }, []);

    const deleteLevel = async (levelNumber) => {
        try {
            const token = getToken()
            
            await axios.delete(`${serverUrl}/levels/delete/${levelNumber}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            message.success(`Level ${levelNumber} deleted successfully`);
            fetchLevels();
        } catch (err) {
            console.error("Error while deleting Level:", err.response.data.message);
            message.error("Error while deleting Level");
        }
    };
    
    const updateLevel = async (levelObject) => {
        try {
            const token = getToken()
            await axios({
                method: "POST",
                url: `${serverUrl}/levels/update`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: levelObject
            });
            message.success(`Level ${levelObject.level} updated successfully`);
            fetchLevels();
        } catch (err) {
            message.error("Error while updating Level", err.response ? err.response.data.message : err.message);
        }
    };

    const filteredLevels = levels.filter(level => {
        return (
            (!searchLevel || level.level === parseInt(searchLevel))
        );
    });

    return (
        <div className="scenes-display">
            <h1 style={{ margin: "10px" }}>Levels</h1>
            <div className="instructions">
                <h2>Instructions</h2>

                <div className="instructions-section">
                    <h4>For Game Mechanics</h4>
                    <ul>
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

            </div>
            {error && <div className="error-message">Something Went Wrong</div>}
            {loading ? <div className="loading-message">Loading...</div> : (
                <div className="scenes-list">
                    {filteredLevels.length > 0 ? (
                        <p style={{ margin: '10px' }}>Level Found: {filteredLevels.length}</p>
                    ) : (
                        <p style={{ margin: '10px' }}>No Levels found</p>
                    )}
                    {filteredLevels.map((ele, index) => (
                        <div key={index} className="scene-item">
                            <LevelDisplay user={ele} onDelete={deleteLevel} onUpdate={updateLevel} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LevelsDisplay;
