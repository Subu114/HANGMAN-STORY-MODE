import React, { useEffect, useState } from 'react'
import { gameFolder } from '../../config/serverFolders';
import { downloadImgUrl, uploadImage } from '../../config/handleImages';
import { useNavigate } from 'react-router-dom';
import { isAdmin, userDataRemove } from '../../auth';
import "./GameFiles.css"
import { message } from 'antd';
const GameFiles = () => {
    const [sceneImg, setSceneImg] = useState('');

    const [file, setFile] = useState('')
    const [file2, setFile2] = useState('')

    const navigate = useNavigate();
    useEffect(() => {
        if (!isAdmin()) {
            return navigate("/");
        }
    })

    const handleImgUpload = (e) => {
        const val = e.target.files[0]
        if (!val || val == undefined)
            return;
        uploadImage(val, gameFolder, file).then(() => {
            setFile(() => null)
        }).catch(() => {

        })

    }

    const handleImageView = (e) => {
        e.preventDefault()
        downloadImgUrl(gameFolder, file2).then((url) => {
            setSceneImg(() => url)

        }).catch(() => {

        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Submitted Scene:", { sceneNumber, scenePlace, sceneStory, sceneClue, sceneWord });
        if (onUpdate)
            onUpdate({ sceneNumber, scenePlace, sceneStory, sceneClue, sceneWord, sceneImg, nextScene })
    };


    return (
        <>
            <div className="image-manager" style={{marginTop : '10px',marginBottom : '10px',}}>
                <h1>Set Image</h1>
                <form onSubmit={handleSubmit} className="form-section">
                    <label>Enter File Name</label>
                    <input
                        type="text"
                        value={file}
                        onChange={(e) => setFile(e.target.value)}
                        className="input-field"
                    />
                    <h4>Upload Image</h4>
                    <input
                        type="file"
                        onChange={handleImgUpload}
                        required
                        className="input-field"
                    />
                </form>
            </div>
            <div className="image-manager">
                <form onSubmit={handleImageView} className="form-section">
                    <h1>Get Image</h1>
                    <label>Enter File Name</label>
                    <input
                        type="text"
                        value={file2}
                        onChange={(e) => setFile2(e.target.value)}
                        className="input-field"
                    />
                    <h4>Image</h4>
                    {sceneImg && (
                        <img src={sceneImg} width="300px" className="image-preview" alt="Scene" />
                    )}
                    <button type="submit" className="submit-button">View</button>
                </form>
            </div>

        </>
    );
}

export default GameFiles