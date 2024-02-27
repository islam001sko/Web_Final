const mongoose = require('mongoose');

const popularBookSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  } // Assuming this is a URL to an image
});

module.exports = mongoose.model('PopularBook', popularBookSchema);
