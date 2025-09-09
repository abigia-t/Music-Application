import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import songReducer from './slices/songSlice';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    songs: songReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// Export the store itself
export default store;

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the custom hooks
export { useAppDispatch, useAppSelector } from './hooks';