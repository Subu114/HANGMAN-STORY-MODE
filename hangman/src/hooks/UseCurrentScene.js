const UseCurrentScene = () => {
    const currentScene = localStorage.getItem('current-scene');

    if (currentScene && currentScene !== "undefined") {
        return JSON.parse(currentScene);
    }
    return null;
}

export default UseCurrentScene;
