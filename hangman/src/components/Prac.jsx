import React, { useEffect, useState } from 'react';
import { downloadImgUrl, uploadImage } from '../config/handleImages';


const Prac = () => {
    const [img, setImg] = useState('')
    const [imgUrl, setImgUrl] = useState([])


    const handleClick = () => {
        uploadImage(img, "files", "Scene1").then(() => {
            console.log("Uploaded")
        }).catch(() => {
            console.log("UPLOAD FAILED")
        })
    }
    const fetchImg = () => {
        downloadImgUrl("files", "Scene1").then((url) => {
            console.log("IMAGE FETCHED : ", url)
            // if(!url)
                setImgUrl(i => [...i, url])
            console.log(imgUrl)
        }).catch(() => {
            console.log("EROR FETCHING")
        })
    }
    return (
       <div style = {{color : "white"}}>
            <input type='file'  onChange={e => setImg(e.target.files[0])} />
            <button onClick={handleClick}>UPLOAD IMAGE</button>

            <button onClick={fetchImg}>FETCH NOW</button>
            <h1>IMGAES ARE</h1>
            {imgUrl?.map((img, index) => {
                return (
                    <div key={index}>
                        <img src={img} height="200px" width="auto"></img>
                    </div>

                )
            })}
       </div>
    )
}

export default Prac;
