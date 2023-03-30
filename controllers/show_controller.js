const { Show } = require('../models/show_models');
const { UploadCloudinary, CleanUploadsDirectory } = require('../cloudinary');

// Get all shows
async function getAll(req, res) {
  console.log('get shows');
  const shows = await Show.find({});
  res.json(shows);
}

// Create a new show

async function create(req, res) {
  console.log('create show');
  try {
    const { title, showDate, location, buyticketlink } = req.body;

    if (req.file) {
      console.log(req.file.path);
      // If a file was uploaded, upload the file to Cloudinary and set the image URL on the new Show object
      const image_url = await UploadCloudinary(req.file.path);

      const newShow = new Show({
        title,
        showDate,
        image: image_url,
        location,
        buyticketlink,
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
  const show = await Show.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!show) {
    res.status(404).json({ error: 'Show not found' });
  } else {
    res.json(show);
  }
}

// Delete a show by ID
async function deleteById(req, res) {
  const show = await Show.findByIdAndDelete(req.params.id);
  if (!show) {
    res.status(404).json({ error: 'Show not found' });
  } else {
    res.json(show);
  }
}

module.exports = {
  getAll,
  create,
  getById,
  update,
  delete: deleteById,
};
