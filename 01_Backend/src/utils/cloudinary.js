import {v2 as cloudinary} from 'cloudinary';
import { response } from 'express';
import fs from 'fs'

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })
        //file has been uploaded successfull
        console.log("file is uploaded on cloudinary",
            response.url
        );
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the locally saved temorary file as the upload operatio got failed
        return null;
    }
}

export {uploadOnCloudinary}