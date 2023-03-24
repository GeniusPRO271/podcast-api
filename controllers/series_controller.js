const { Serie } = require('../models/series_models');

// Get all series
async function getAll(req, res) {
  const series = await Serie.find({});
  res.json(series);
}

// Create a new series
async function create(req, res) {
  const {
    title,
    serieDays,
    serieStart,
    serieEnd,
    imagesMain,
    images,
    description,
    members,
    youtubeLink,
    brochure,
  } = req.body;

  try {
    const newSerie = new Serie({
      title,
      serieDays,
      serieStart,
      serieEnd,
      imagesMain,
      images,
      description,
      members,
      youtubeLink,
      brochure,
    });

    await newSerie.save();

    res.status(201).json(newSerie);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
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
