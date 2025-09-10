// Import Redux-Saga effects
import { call, put, takeEvery, all } from 'redux-saga/effects';

// Import our API service functions
import * as api from '../../services/api';

// Import song actions from the slice
import { actions } from '../slices/songSlice';

// Import types for TypeScript
import { Song, FilterOptions } from '../../types';

// Saga worker: Fetch songs from API
function* fetchSongsSaga(action: ReturnType<typeof actions.fetchSongsStart>): Generator<any, any, any> {
  try {
    console.log('SAGA: Fetching songs with filters:', action.payload);
    const response = yield call(api.fetchSongs, action.payload);
    
    // Handle API response structure: { songs: Song[] }
    if (response && typeof response === 'object' && Array.isArray(response.songs)) {
      console.log('SAGA: Fetched', response.songs.length, 'songs');
      yield put(actions.fetchSongsSuccess(response.songs));
    } else {
      throw new Error('Invalid API response format');
    }
  } catch (error: any) {
    console.error('SAGA: Fetch songs error:', error);
    yield put(actions.fetchSongsFailure(error.message));
  }
}

// Saga worker: Fetch statistics from API
function* fetchStatisticsSaga(): Generator<any, any, any> {
  try {
    console.log('SAGA: Fetching statistics from API');
    const statistics = yield call(api.fetchStatistics);
    console.log('SAGA: Statistics fetched successfully:', statistics);
    yield put(actions.fetchStatisticsSuccess(statistics));
  } catch (error: any) {
    console.error('SAGA: Fetch statistics error:', error);
    yield put(actions.fetchStatisticsFailure(error.message));
  }
}

// Saga worker: Add a new song
function* addSongSaga(action: ReturnType<typeof actions.addSongStart>): Generator<any, any, any> {
  try {
    console.log('SAGA: Adding new song:', action.payload);
    const newSong = yield call(api.createSong, action.payload);
    console.log('SAGA: Song added successfully:', newSong);
    yield put(actions.addSongSuccess(newSong));
    yield put(actions.closeModals());
    yield put(actions.fetchStatisticsStart()); // Refresh stats
  } catch (error: any) {
    console.error('SAGA: Add song error:', error);
    yield put(actions.requestFailure(error.message));
  }
}

// Saga worker: Update a song - FIXED
function* updateSongSaga(action: ReturnType<typeof actions.updateSongStart>): Generator<any, any, any> {
  try {
    console.log('SAGA: Updating song with payload:', action.payload);
    
    // Extract the ID and create updates object without _id
    const { _id, ...updates } = action.payload;
    
    if (!_id) {
      throw new Error('Song ID is required for update');
    }
    
    console.log('SAGA: Calling api.updateSong with id:', _id, 'and updates:', updates);
    
    // Call the API with correct signature: id string + Partial<Song> updates
    const updatedSong = yield call(api.updateSong, _id, updates);
    
    console.log('SAGA: Song updated successfully:', updatedSong);
    yield put(actions.updateSongSuccess(updatedSong));
    yield put(actions.closeModals());
    yield put(actions.fetchStatisticsStart());
    
  } catch (error: any) {
    console.error('SAGA: Update song error:', error);
    yield put(actions.requestFailure(error.message));
  }
}

// Saga worker: Delete a song
function* deleteSongSaga(action: ReturnType<typeof actions.deleteSongStart>): Generator<any, any, any> {
  try {
    console.log('SAGA: Deleting song with ID:', action.payload);
    
    // Use the same pattern as updateSong
    yield call(api.deleteSong, action.payload);
    
    console.log('SAGA: Song deleted successfully from API');
    yield put(actions.deleteSongSuccess(action.payload));
    yield put(actions.closeModals());
    yield put(actions.fetchStatisticsStart()); // Refresh stats
    
  } catch (error: any) {
    console.error('SAGA: Delete song error:', error);
    yield put(actions.requestFailure(error.message));
  }
}

// Saga watchers: Listen for specific actions and run the corresponding saga
export function* watchFetchSongs() {
  yield takeEvery(actions.fetchSongsStart.type, fetchSongsSaga);
}

export function* watchFetchStatistics() {
  yield takeEvery(actions.fetchStatisticsStart.type, fetchStatisticsSaga);
}

export function* watchAddSong() {
  yield takeEvery(actions.addSongStart.type, addSongSaga);
}

export function* watchUpdateSong() {
  yield takeEvery(actions.updateSongStart.type, updateSongSaga);
}

export function* watchDeleteSong() {
  yield takeEvery(actions.deleteSongStart.type, deleteSongSaga);
}

// Root saga
export default function* songSaga() {
  yield all([
    watchFetchSongs(),
    watchFetchStatistics(),
    watchAddSong(),
    watchUpdateSong(),
    watchDeleteSong(),
  ]);
}