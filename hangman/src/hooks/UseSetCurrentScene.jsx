const UseSetCurrentScene = (scene) => {
  localStorage.setItem('current-scene', JSON.stringify(scene))
}

export default UseSetCurrentScene