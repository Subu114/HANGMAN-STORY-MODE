
const UseCurrentScene = () => {
    const currentScene = localStorage.getItem('current-scene');
    // console.log("Scene Returned : ", currentScene)
    return JSON.parse(currentScene)
}

export default UseCurrentScene