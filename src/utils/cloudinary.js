import {v2 as cloudinary} from "cloudinary";
import fs from "fs"
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

 });

 const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return;
        //uploading file to cloudinary
        const res = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"})
        //file has been uploaded to cloudinary, now we can remove the file from local storage
        // console.log("File is uploaded on cloudinary : ", res.url)
        // console.log("Cloudinary response:", res);
        fs.unlinkSync(localFilePath)

        return res;
    } catch (error) {
        fs.unlinkSync(localFilePath) //it is used to remove the file from local storage. It is used to remove the file from local storage if there is an error while uploading the file to cloudinary. It is used to prevent the accumulation of files in local storage if there are errors while uploading the files to cloudinary.
        return null;
    }
 }

 export { uploadOnCloudinary }

//  cloudinary.uploader.upload("path/to/video.mp4", {public_id: "video"}, function(error, result) {
//     console.log(result, error);
//   });
