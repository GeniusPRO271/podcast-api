const {
  CleanUploadsDirectory,
  UploadCloudinary,
  DeleteImage,
} = require('../cloudinary');
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
      res.status(400).json({ error: 'Missing or invalid fields' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
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
  console.log('UPDATEING');
  const { id } = req.params;
  const { ...updateData } = req.body;

  try {
    let serie = await Serie.findById(id);
    serie = await Serie.findByIdAndUpdate(id, updateData, { new: true });
    if (req.files) {
      // update mainCover
      if (req.files['imagesMain'] && req.files['imagesMain'].length > 0) {
        const imagesMainId = serie.imagesMain.match(/\/v\d+\/(.+)\.[a-z]+$/)[1];
        await DeleteImage(imagesMainId);
        console.log('uploading ', req.files['imagesMain'][0].path);
        serie.imagesMain = await UploadCloudinary(
          req.files['imagesMain'][0].path
        );
        await serie.save();
      }
      if (req.files['images[]'] && req.files['images[]'].length > 0) {
        const newSample = [];
        for (let index = 0; index < serie.images.length; index++) {
          const oldImagesId = serie.images[index].match(
            /\/v\d+\/(.+)\.[a-z]+$/
          )[1];
          await DeleteImage(oldImagesId);
          console.log('deleting ', oldImagesId);
        }
        for (let index = 0; index < req.files['images[]'].length; index++) {
          url = await UploadCloudinary(req.files['imagesMain'][0].path);
          newSample.push(url);
          console.log('uploading ', url);
        }
        serie.images = newSample;
        await serie.save();
      }
    }

    CleanUploadsDirectory('uploads');
    res.status(200).json(updateData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Delete a series by ID
async function deleteById(req, res) {
  try {
    console.log(req.params.id);
    const serie = await Serie.findById(req.params.id);
    if (!serie) {
      return res.status(404).json({ error: 'Show not found' });
    }

    // extract the public ID from the Cloudinary URL
    const publicID = serie.imagesMain.match(/\/v\d+\/(.+)\.[a-z]+$/)[1];
    // delete the image from Cloudinary
    await DeleteImage(publicID);

    for (let index = 0; index < serie.images.length; index++) {
      const otherImagesID = serie.images[index].match(
        /\/v\d+\/(.+)\.[a-z]+$/
      )[1];
      // delete the image from Cloudinary
      await DeleteImage(otherImagesID);
    }

    // delete the show from the database
    await Serie.findByIdAndDelete(req.params.id);

    res.status(200).json(serie);
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
  deleteById,
};
