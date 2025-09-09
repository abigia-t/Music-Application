const express = require('express');
const router = express.Router();

// Import the controller functions correctly
const {
  getSongs,
  getSongStats,
  getSong,
  createSong,
  updateSong,
  deleteSong
} = require('../controllers/songController');

// Setup routes
router.get('/', getSongs);
router.get('/stats', getSongStats);
router.get('/:id', getSong);
router.post('/', createSong);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);

// Export the router
module.exports = router;