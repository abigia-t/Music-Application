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

// ✅ CORRECT ROUTES - Match what frontend expects

// GET /api/songs/statistics
router.get('/statistics', getSongStats);

// GET /api/songs (with optional query params)
router.get('/', getSongs);

// GET /api/songs/:id
router.get('/:id', getSong);

// POST /api/songs
router.post('/', createSong);

// PUT /api/songs/:id  
router.put('/:id', updateSong);

// DELETE /api/songs/:id
router.delete('/:id', deleteSong);

// Export the router
module.exports = router;