import { getLevel, getToken, getUserId, setGameState, setScene } from '../../auth';

import axios from 'axios';
import { serverUrl } from '../../config/serverUrl';
import { message } from 'antd';

//This function is used when the Scene is completed
const SceneComplete = async (nextScene) => {
    try {
        const level = getLevel()
        const token = getToken()
        const _id = getUserId()
        const res = await axios({
            method: "GET",
            url: `${serverUrl}/scenes/${nextScene}/${level}`,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        setScene(res)
        const n = Number(res.data.scene.scene_word)
        const displayWord = Array(n).fill('_')
        setGameState(_id, nextScene, displayWord, [], -1)
        return true
    } catch (error) {
        console.log("Error:", error);
        if (error.response) {
            console.log("Response error data:", error.response.data.message);
            message.error(error.response.data.message, 3)
        }
        else {
            console.log("Error:", error.message);
            message.error(error.message, 3)
        }
        return false
    }
};


export default SceneComplete