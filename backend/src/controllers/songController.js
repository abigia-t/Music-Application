const Song = require('../models/Song');

// Get all songs with filtering
const getSongs = async (req, res) => {
  try {
    const { genre, artist, album, page = 1, limit = 10 } = req.query;
    
    let filter = {};
    if (genre) filter.genre = new RegExp(genre, 'i');
    if (artist) filter.artist = new RegExp(artist, 'i');
    if (album) filter.album = new RegExp(album, 'i');
    
    const songs = await Song.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Song.countDocuments(filter);
    
    res.json({
      songs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get statistics
const getSongStats = async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments();
    const totalArtists = await Song.distinct('artist');
    const totalAlbums = await Song.distinct('album'); 
    const totalGenres = await Song.distinct('genre');
    
    const songsPerGenre = await Song.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      totalSongs,
      totalArtists: totalArtists.length,
      totalAlbums: totalAlbums.length,
      totalGenres: totalGenres.length,
      songsPerGenre
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single song
const getSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create song
const createSong = async (req, res) => {
  try {
    const song = new Song({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      genre: req.body.genre
    });
    
    const newSong = await song.save();
    res.status(201).json(newSong);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update song
const updateSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    
    if (req.body.title != null) song.title = req.body.title;
    if (req.body.artist != null) song.artist = req.body.artist;
    if (req.body.album != null) song.album = req.body.album;
    if (req.body.genre != null) song.genre = req.body.genre;
    
    const updatedSong = await song.save();
    res.json(updatedSong);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete song
const deleteSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    
    await Song.deleteOne({ _id: req.params.id });
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export ALL functions - make sure all are defined above
module.exports = {
  getSongs,
  getSongStats,
  getSong,
  createSong,
  updateSong,
  deleteSong
};