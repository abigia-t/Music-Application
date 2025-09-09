// Import Redux-Saga effects
import { all } from 'redux-saga/effects';

// Import our saga watchers
import { watchFetchSongs, watchFetchStatistics, watchAddSong } from './songSaga';

// Root saga: Combine all individual sagas
export default function* rootSaga() {
  // Run all sagas in parallel
  yield all([
    watchFetchSongs(),
    watchFetchStatistics(),
    watchAddSong(),
  ]);
}