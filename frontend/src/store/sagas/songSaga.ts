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
    console.log('SAGA: Fetching statistics');
    const statistics = yield call(api.fetchStatistics);
    console.log('SAGA: Statistics fetched successfully');
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
    yield put(actions.requestFailure(error.message)); // Use requestFailure
  }
}

// Saga worker: Update a song
function* updateSongSaga(action: ReturnType<typeof actions.updateSongStart>): Generator<any, any, any> {
  try {
    console.log('SAGA: Updating song:', action.payload._id, 'with data:', action.payload);
    const updatedSong = yield call(api.updateSong, action.payload._id!, action.payload);
    console.log('SAGA: Song updated successfully:', updatedSong);
    yield put(actions.updateSongSuccess(updatedSong));
    yield put(actions.closeModals());
    yield put(actions.fetchStatisticsStart()); // Refresh stats
  } catch (error: any) {
    console.error('SAGA: Update song error:', error);
    yield put(actions.requestFailure(error.message)); // Use requestFailure
  }
}

// Saga worker: Delete a song
function* deleteSongSaga(action: ReturnType<typeof actions.deleteSongStart>): Generator<any, any, any> {
  try {
    console.log('SAGA: TEST MODE - Simulating delete for ID:', action.payload);
    
    // Simulate API delay
    yield new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate success without API call
    console.log('SAGA: Simulating successful deletion');
    yield put(actions.deleteSongSuccess(action.payload));
    yield put(actions.closeModals());
    yield put(actions.fetchStatisticsStart());
    
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