import { message } from 'antd';
import { db } from '../config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


const uploadImage = async (img, folderName, imgName) => {
    const imgRef = ref(db, `${folderName}/${imgName}`);
    message.info("Uploading Image!")
    try {
        await uploadBytes(imgRef, img);
        message.success("Image Uploaded successfully");
        return true;
    } catch (e) {
        message.error("Error in uploading image");
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
