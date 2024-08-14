import axios from 'axios';
import { serverUrl } from '../../config/serverUrl';
import { setGameState, setLevel, setScene, userDataRemove } from '../../auth';
import { message } from 'antd';
import { _id, token } from '../../config/userData';

const game =async () => {

    const fetchScene = async () => {
        try {
            
            const user_id = _id;
            const scene_id = 1;
            const level_id = 1;

            const res = await axios({
                method: "GET",
                url: `${serverUrl}/scenes/${scene_id}/${level_id}`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            
            setScene(res);
            console.log(res);
            setLevel(level_id)
            const n = Number(res.data.scene.scene_word);
            const displayWord = Array(n).fill('_');
            setGameState(user_id, scene_id, displayWord, [], 3);
            
            return true
        } catch (error) {
            console.log("error : ", error)
            message.error(error.response ? error.response.data.message : error.message);
            return false
        }
    };

    const fetchSceneState = async () => {
        try {

            const storedUserData = JSON.parse(localStorage.getItem("user"));
            const token = localStorage.getItem("token");

            if (!storedUserData || !token) {
                throw new Error("User data or token is missing.");
            }

            const res = await axios({
                method: "GET",
                url: `${serverUrl}/users/game-state`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const scene_id = res.data.gameState.scene_id;
            const level = res.data.gameState.level;

            const res2 = await axios({
                method: "GET",
                url: `${serverUrl}/scenes/${scene_id}/${level}`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(res2)
            setScene(res2);
            setLevel(level)
            
            return 100;
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    message.error("User not authenticated", 5);
                    userDataRemove();
                } else if (error.response.status === 404) {
                    return fetchScene();
                } else {
                    message.error(error.response.data.message, 5);
                }
            } else {
                message.error(error.message, 5);
            }
            return false
        }
    };


    return fetchSceneState();

};

export {game};
