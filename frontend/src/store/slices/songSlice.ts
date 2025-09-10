import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song, SongStatistics, FilterOptions } from '../../types';

// Add interface for modal management
interface ModalState {
  addSong: boolean;
  editSong: boolean;
  deleteSong: boolean;
  selectedSong: Song | null;
}

interface SongState {
  songs: Song[];
  statistics: SongStatistics | null;
  loading: boolean;
  error: string | null;
  filters: FilterOptions;
  // Add modal management state
  modals: ModalState;
}

const initialState: SongState = {
  songs: [],
  statistics: null,
  loading: false,
  error: null,
  filters: {},
  // Initialize modal states
  modals: {
    addSong: false,
    editSong: false,
    deleteSong: false,
    selectedSong: null
  }
};

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    // Action: Start fetching songs
    fetchSongsStart: (state, action: PayloadAction<FilterOptions | undefined>) => {
      state.loading = true;
      state.error = null;
      // If filters are provided, update them
      if (action.payload) {
        state.filters = action.payload;
      }
    },
    
    // Action: Songs fetched successfully
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.loading = false;
      state.error = null;
    },
    
    // Action: Error while fetching songs
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Action: Start fetching statistics
    fetchStatisticsStart: (state) => {
      state.loading = true;
    },
    
    // Action: Statistics fetched successfully
    fetchStatisticsSuccess: (state, action: PayloadAction<SongStatistics>) => {
      state.statistics = action.payload;
      state.loading = false;
      state.error = null;
    },
    
    // Action: Error while fetching statistics
    fetchStatisticsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // === ASYNC ACTION STARTERS (for Redux Saga) ===
    
    // Action: Start adding a new song (will be handled by saga)
    addSongStart: (state, action: PayloadAction<Omit<Song, '_id'>>) => {
      console.log('SLICE: addSongStart');
      state.loading = true;
      state.error = null;
    },
    
    // Action: Start updating a song (will be handled by saga) - ONLY ONE DEFINITION
    updateSongStart: (state, action: PayloadAction<Song>) => {
      console.log('SLICE: updateSongStart - ID:', action.payload._id);
      state.loading = true;
      state.error = null;
    },
    
    // Action: Start deleting a song (will be handled by saga)
    deleteSongStart: (state, action: PayloadAction<string>) => {
      console.log('SLICE: deleteSongStart - ID:', action.payload);
      state.loading = true;
      state.error = null;
    },
    
    // === SYNC REDUCERS FOR SUCCESS ACTIONS ===
    
    // Action: Add a new song to the state (on success)
    addSongSuccess: (state, action: PayloadAction<Song>) => {
      console.log('SLICE: addSongSuccess - ID:', action.payload._id);
      state.songs.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    
    // Action: Update an existing song (on success)
    updateSongSuccess: (state, action: PayloadAction<Song>) => {
      console.log('SLICE: updateSongSuccess - Updated song:', action.payload);
      const index = state.songs.findIndex(song => song._id === action.payload._id);
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
      state.modals.editSong = false;
      state.modals.selectedSong = null;
    },
    
    // Action: Remove a song from the state (on success)
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      console.log('SLICE: deleteSongSuccess - ID:', action.payload);
      console.log('SLICE: Before deletion - songs count:', state.songs.length);
      
      state.songs = state.songs.filter(song => song._id !== action.payload);
      
      console.log('SLICE: After deletion - songs count:', state.songs.length);
      state.loading = false;
      state.error = null;
      
      // Also close the modal
      state.modals.deleteSong = false;
      state.modals.selectedSong = null;
    },
    
    // === DIRECT SYNC ACTIONS (no saga needed) ===
    
    // Action: Directly delete a song from state (no API call)
    deleteSong: (state, action: PayloadAction<string>) => {
      console.log('SLICE: deleteSong - ID:', action.payload);
      console.log('SLICE: Before direct deletion - songs count:', state.songs.length);
      
      state.songs = state.songs.filter(song => song._id !== action.payload);
      
      console.log('SLICE: After direct deletion - songs count:', state.songs.length);
      
      // Also close the modal if open
      state.modals.deleteSong = false;
      state.modals.selectedSong = null;
    },
    
    // Action: Handle failure for add/update/delete operations
    requestFailure: (state, action: PayloadAction<string>) => {
      console.log('SLICE: requestFailure - Error:', action.payload);
      state.loading = false;
      state.error = action.payload;
    },
    
    // Action: Update filter settings
    setFilters: (state, action: PayloadAction<FilterOptions>) => {
      state.filters = action.payload;
    },
    
    // Action: Clear any error messages
    clearError: (state) => {
      state.error = null;
    },
    
    // Action: Reset filters to initial state
    resetFilters: (state) => {
      state.filters = {};
    },

    // === MODAL MANAGEMENT ACTIONS ===
    
    // Action: Open Add Song modal
    openAddSongModal: (state) => {
      state.modals.addSong = true;
      state.modals.editSong = false;
      state.modals.deleteSong = false;
      state.modals.selectedSong = null;
    },
    
    // Action: Open Edit Song modal with selected song
    openEditSongModal: (state, action: PayloadAction<Song>) => {
      state.modals.editSong = true;
      state.modals.addSong = false;
      state.modals.deleteSong = false;
      state.modals.selectedSong = action.payload;
    },
    
    // Action: Open Delete Confirmation modal
    openDeleteSongModal: (state, action: PayloadAction<Song>) => {
      state.modals.deleteSong = true;
      state.modals.addSong = false;
      state.modals.editSong = false;
      state.modals.selectedSong = action.payload;
    },
    
    // Action: Close all modals
    closeModals: (state) => {
      state.modals = {
        addSong: false,
        editSong: false,
        deleteSong: false,
        selectedSong: null
      };
    }
  },
});

export const { actions } = songSlice;
export default songSlice.reducer;