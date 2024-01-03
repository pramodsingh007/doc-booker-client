import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { app } from "../firebase/firebase.config";

export const uploadFile = async(file)=>{
    const storage = getStorage(app);

// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: file.type
};

// Upload file and metadata to the object 'images/mountains.jpg'
const fileName = new Date().toISOString()
const storageRef = ref(storage, 'images/' +fileName );
const uploadTask = await uploadBytes(storageRef, file, metadata);
console.log(uploadTask)

// Listen for state changes, errors, and completion of the upload.
 
    // Upload completed successfully, now we can get the download URL
    const downloadUrl =  await getDownloadURL(ref(storage,'images/'+fileName))
    return downloadUrl

}