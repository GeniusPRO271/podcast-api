const { CleanUploadsDirectory, UploadCloudinary } = require('../cloudinary');
const { Serie } = require('../models/series_models');

// Get all series
async function getAll(req, res) {
  const series = await Serie.find({});
  res.json(series);
}

// Create a new series
async function create(req, res) {
  try {
    const {
      title,
      serieDays,
      serieStart,
      serieEnd,
      description,
      members,
      youtubeLink,
      brochure,
    } = req.body;

    if (req.files) {
      const sampleImages = [];
      const imagesMain = await UploadCloudinary(
        req.files['imagesMain'][0].path
      );
      for (let i = 0; i < req.files['sampleImages[]'].length; i++) {
        const img = req.files['sampleImages[]'][i];
        const url = await UploadCloudinary(img.path);
        sampleImages.push(url);
      }

      const newSerie = new Serie({
        title,
        serieDays: serieDays.split(','),
        serieStart,
        serieEnd,
        imagesMain,
        images: sampleImages,
        description,
        members: members.split(','),
        youtubeLink,
        brochure,
      });

      await newSerie.save();
      console.log(sampleImages);
      CleanUploadsDirectory('uploads');
      res.status(201).json({ message: 'success' });
    } else {
      res.status(300).json({ error: 'Missing or invalid fields' });
    }
  } catch (err) {
    console.error(err);
    res.status(100).json({ error: 'Internal server error' });
  }
}

// Get a series by ID
async function getById(req, res) {
  const serie = await Serie.findById(req.params.id);
  if (!serie) {
    res.status(404).json({ error: 'Series not found' });
  } else {
    res.json(serie);
  }
}

// Update a series by ID
async function update(req, res) {
  const serie = await Serie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!serie) {
    res.status(404).json({ error: 'Series not found' });
  } else {
    res.json(serie);
  }
}

// Delete a series by ID
async function deleteById(req, res) {
  const serie = await Serie.findByIdAndDelete(req.params.id);
  if (!serie) {
    res.status(404).json({ error: 'Series not found' });
  } else {
    res.json(serie);
  }
}

module.exports = {
  getAll,
  create,
  getById,
  update,
  deleteById,
};
