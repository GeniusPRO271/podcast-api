const { Show } = require('../models/show_models');
const {
  UploadCloudinary,
  CleanUploadsDirectory,
  DeleteImage,
} = require('../cloudinary');
const getDominantColor = require('../dominantcolor');
const client = require('../redis');

// Get all shows
async function getAll(req, res) {
  console.log('Geting shows...');
  const key = 'shows_data';
  try {
    const cachedData = await client.get(key);
    const shows = await Show.find({}).sort({ showDate: 1 });
    if (cachedData == JSON.stringify(shows)) {
      // If cached data exists, return it immediately
      console.log('Sending cached shows Data..');
      return res.status(200).json(JSON.parse(cachedData));
    } else {
      if (shows) {
        // Cache the result in Redis
        console.log('Caching shows data..');
        client.setEx(key, 3600, JSON.stringify(shows));
        console.log('Sending shows data..');
        return res.status(200).json(shows);
      } else {
        return res.status(500).json(err);
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
}

// Create a new show

async function create(req, res) {
  console.log('create show');
  try {
    const { title, showDate, location, buyticketlink, showsHosts } = req.body;

    if (req.file) {
      console.log(showsHosts);
      console.log(req.file.path);
      // If a file was uploaded, upload the file to Cloudinary and set the image URL on the new Show object
      const image_url = await UploadCloudinary(req.file.path);
      const dominantColor = await getDominantColor(req.file.path);

      console.log('Image uploaded');
      const newShow = new Show({
        title,
        showDate,
        image: image_url,
        dominantColor,
        location,
        buyticketlink,
        showsHosts,
      });

      // Save the new show data to the database
      const savedShow = await newShow.save();
      CleanUploadsDirectory('uploads');
      res.status(201).json(savedShow);
    } else {
      res.status(400).json({ error: 'Missing or invalid fields' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get a show by ID
async function getById(req, res) {
  const show = await Show.findById(req.params.id);
  if (!show) {
    res.status(404).json({ error: 'Show not found' });
  } else {
    res.json(show);
  }
}

// Update a show by ID
async function update(req, res) {
  console.log('UPDATEING');
  const { id } = req.params;
  const { ...updateData } = req.body;

  try {
    let show = await Show.findById(id);

    show = await Show.findByIdAndUpdate(id, updateData, { new: true });
    // Delete old image if new image was uploaded
    if (req.file) {
      const imgId = show.image.match(/\/v\d+\/(.+)\.[a-z]+$/)[1];
      await DeleteImage(imgId);
      show.image = await UploadCloudinary(req.file.path);
      await show.save();
    }

    CleanUploadsDirectory('uploads');
    res.status(200).json(show);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Delete a show by ID
async function deleteById(req, res) {
  try {
    const show = await Show.findById(req.params.id);
    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }

    // extract the public ID from the Cloudinary URL
    const publicID = show.image.match(/\/v\d+\/(.+)\.[a-z]+$/)[1];

    // delete the image from Cloudinary
    await DeleteImage(publicID);

    // delete the show from the database
    await Show.findByIdAndDelete(req.params.id);

    res.status(200).json(show);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete show' });
  }
}

module.exports = {
  getAll,
  create,
  getById,
  update,
  delete: deleteById,
};
