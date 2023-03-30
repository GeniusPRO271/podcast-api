const mongoose = require('mongoose');

// Define the schema for the show
const SeriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  serieDays: {
    type: [String],
    required: true,
  },
  serieStart: {
    type: String,
    required: true,
  },
  serieEnd: {
    type: String,
    required: true,
  },
  imagesMain: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    required: true,
  },
  youtubeLink: {
    type: String,
    required: true,
  },
  brochure: {
    type: String,
    required: true,
  },
});

const Serie = mongoose.model('Series', SeriesSchema);

module.exports = {
  Serie,
};
