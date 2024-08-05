import { message } from 'antd';
import { db } from '../config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


const uploadImage = async (img, folderName, imgName) => {
    const imgRef = ref(db, `${folderName}/${imgName}`);
    try {
        await uploadBytes(imgRef, img);
        console.log("Image Uploaded successfully");
        return true;
    } catch (e) {
        console.error("Error in uploading image: ", e);
        return false;
    }
};


const downloadImgUrl = async (folderName, imgName) => {
    const imgRef = ref(db, `${folderName}/${imgName}`);
    try {
        const url = await getDownloadURL(imgRef);
        return url;
    } catch (e) {
        message.error("Could not fetch data! Please try again later")
        console.error(`Error in getting download URL: ${e}`);
        return null;
    }
};

export { uploadImage, downloadImgUrl };
