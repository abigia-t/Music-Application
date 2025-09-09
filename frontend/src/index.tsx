import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';  // Import your store
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* Wrap your App with Redux Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);