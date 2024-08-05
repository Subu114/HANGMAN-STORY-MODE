import React, { useState } from 'react'
import { gameFolder } from '../../config/serverFolders';
import { downloadImgUrl, uploadImage } from '../../config/handleImages';
import { useNavigate } from 'react-router-dom';
import { isAdmin, userDataRemove } from '../../auth';

const GameFiles = () => {
    const [sceneImg, setSceneImg] = useState('');

    const [file, setFile] = useState('')
    const [file2, setFile2] = useState('')

    const navigate = useNavigate();
    useEffect(() => {
        if(!isAdmin())
        {
            return navigate("/");
        }
    })

    const handleImgUpload = (e) => {
        alert("Uploading img")
        const val = e.target.files[0]
        if (!val || val == undefined)
            return;
        uploadImage(val, gameFolder, file).then(() => {
            alert("image uploaded successfully")
            setFile(() => null)
        }).catch(() => {
            alert("image upload failed")

        })

    }

    const handleImageView = (e) => {
        e.preventDefault()
        downloadImgUrl(gameFolder,file2).then((url) => {
            setSceneImg(() => url)
            alert("image downloaded successfully")
            
        }).catch(() => {

            alert("image upload failed")
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Submitted Scene:", { sceneNumber, scenePlace, sceneStory, sceneClue, sceneWord });
        if (onUpdate)
            onUpdate({ sceneNumber, scenePlace, sceneStory, sceneClue, sceneWord, sceneImg, nextScene })
    };


    return (
        <div style={{ color: "white", margin: "2%", padding: "10px" }} autoFocus>
            <h1>SET IMAGE </h1><br/>
            <form onSubmit={handleSubmit} readOnly>
                <label>Enter file name</label>
                <input type='text' value={file} onChange={e => setFile(e.target.value)}></input>
                <h4>Upload Img</h4>
                <input type='file' onChange={handleImgUpload} required></input>

            </form>
            <br/>
            <br/>
            <hr/>
            <br/>
            <br/>
            <form onSubmit={handleImageView} readOnly>
                <h1>GET IMAGe</h1><br/>
                <label>Enter file name</label>
                <input type='text' value={file2} onChange={e => setFile2(e.target.value)}></input>
                <h4>Image</h4>
                {sceneImg && <img src={sceneImg} width="300px"></img>}

                <button type="submit">Update Data</button>
            </form>
            <hr />
            <br />
        </div>
    );
}

export default GameFiles