require('dotenv').config();
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload
async function UploadCloudinary(img) {
  let name = img.substring(0, img.lastIndexOf('.'));

  const resp = cloudinary.uploader.upload(img, {
    folder: 'podcast-api',
    public_id: name,
  });

  return resp
    .then((data) => {
      const url = data.secure_url;
      return url;
    })
    .catch((err) => {
      console.log(err);
    });
}
async function DeleteImage(publicId) {
  try {
    // Delete the image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    // Return the result object
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete image from Cloudinary');
  }
}
async function CleanUploadsDirectory(directory) {
  const files = await fs.promises.readdir(directory);

  for (const file of files) {
    await fs.promises.unlink(`${directory}/${file}`);
  }

  console.log(`Cleaned ${files.length} files from ${directory}`);
}
module.exports = { UploadCloudinary, CleanUploadsDirectory, DeleteImage };
