const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Song title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  artist: {
    type: String,
    required: [true, 'Artist name is required'],
    trim: true,
    maxlength: [100, 'Artist name cannot be more than 100 characters']
  },
  album: {
    type: String,
    required: [true, 'Album name is required'],
    trim: true,
    maxlength: [100, 'Album name cannot be more than 100 characters']
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    trim: true,
    maxlength: [50, 'Genre cannot be more than 50 characters']
  }
}, {
  timestamps: true
});

// Indexes for better performance
songSchema.index({ artist: 1, album: 1 });
songSchema.index({ genre: 1 });
songSchema.index({ title: 'text', artist: 'text' });

module.exports = mongoose.model('Song', songSchema);