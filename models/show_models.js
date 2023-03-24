const mongoose = require('mongoose');

// Define the schema for the show
const ShowSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  showDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  buyticketlink: {
    type: String,
    required: true,
  },
});

const Show = mongoose.model('Show', ShowSchema);

module.exports = {
  Show,
};
