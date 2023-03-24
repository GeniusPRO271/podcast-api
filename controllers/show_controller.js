const { Show } = require('../models/show_models');

// Get all shows
async function getAll(req, res) {
  console.log('get shows');
  const shows = await Show.find({});
  res.json(shows);
}

// Create a new show
async function create(req, res) {
  console.log('create show');
  console.log(req.body);

  try {
    const { title, showDate, image, location, buyticketlink } = req.body;
    const newShow = new Show({
      title,
      showDate,
      image,
      location,
      buyticketlink,
    });
    await newShow.save();
    res.status(201).json(newShow); // set status to 201 if a new item is created
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message }); // set status to 500 if there's an error
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
